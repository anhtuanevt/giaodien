const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './photos/')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     const fileExt = file.originalname.split('.').pop();
//     cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExt)
//   },
// })
cloudinary.config({ 
  cloud_name: 'dzi76lgy2', 
  api_key: '861683568625511', 
  api_secret: 'Ec_HHhxYWCDFo6Ob7YFwPb-1cJk' 
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'thumbnail', 
    allowed_formats: ['jpeg', 'png', 'jpg']
  }
});


const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG and PNG files are allowed.'));
  }
}

const upload = multer({ 
  storage:  storage,
  fileFilter: fileFilter, 
  limits: {fileSize: 500 * 1024} 
})

module.exports = {upload}

