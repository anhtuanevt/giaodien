
const articleService = require('../services/article_service');

module.exports = {
    getArticle : async(req, res, next) => {
        const articles = await articleService.getArticleList();
        res.render('backend/page/article/list', {articles})
    },

    getArticleById : async (req , res , next) => {
        try {
            const articleId = req.params.id;
            let article = {
                status: "novalue"
            }
            const categories = res.locals.categories
            if (articleId) article = await articleService.getArticleById(articleId);
            res.render('backend/page/article/form', {article, categories}); 
        } catch (error) {
            return error
        }
        
    },

    addArticle : async (req , res , next) => {
        const data = req.body;
        const thumbnail = req.file.path
    try {   
            const result = await articleService.addArticle(data, thumbnail);
            if(result._id){
                req.flash('success', 'Article updated successfully!',false);
                res.redirect('/admin/article');
            }
        } catch (error) {
            console.log('error', error)
            res.send(error)
        }
    },

    updateArticleById : async (req , res , next) => {
        const articleId = req.params.id;
        const data = req.body
        const thumbnail = req.file
        try {
            const currentArticle = await articleService.getArticleById(articleId)
            if (currentArticle.category_id !== data.category_id) {
                await categoryModel.findByIdAndUpdate(data.category_id, {
                    $set: { articles_id: articleId }
                });
            }
            const result = await articleService.updateArticleById(articleId, data, thumbnail, currentArticle.thumbnail);
            if(result) res.redirect('/admin/article')
        } catch (error) {
            console.log('error', error) 
            res.send(error)
        }
    },

    deleteArticleById : async (req , res , next) => {
        const articleId = req.params.id;
        try {
         const result = await articleService.deleteArticleById(articleId);
         const currentArticle = await articleService.getArticleById(articleId)
         await categoryModel.findByIdAndUpdate(currentArticle.categoty_id, {
            $pull: { articles_id: articleId }
            })
         res.send({
             result
         })
        } catch (error) {
            res.send(error)
        }
    },

    updateStatus : async (req , res , next) => {
        const status = req.params.status;
        const Ids= req.body.ids
        try {
         const result = await articleService.updateStatus(Ids, status);
         res.send({
             result
         })
        } catch (error) {
            res.send(error)
        }
    },

    uploadPhotos : async (req , res , next) => {
        try {
            console.log(req.file.path)
            return req.file.path;
            if (req.file) {
                res.status(200).json({
                    key: req.file.filename,
                    photo_url: req.file.path,
                });
                console.log(photo_url)
            } else {
                res.status(500).json({ error: 'Failed to upload file' });
            }
        } catch (error) {
            res.send(error)
        }
    },

    deleteArticle : async (req , res , next) => {
        const Ids= req.body.ids
        try {
            const articles = await articleService.find(
                {'_id': { $in: Ids }}
            )

            for (const article of articles) {
                if (article.category_id) {
                    await categoryModel.findByIdAndUpdate(article.category_id, {
                        $pull: { articles_id: article._id }
                    });
                }
            }
            const result = await articleService.deleteArticle(Ids);
         res.send({
             result
         })
        } catch (error) {
            res.send(error)
        }
    },
}
