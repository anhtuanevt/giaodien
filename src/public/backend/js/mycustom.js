const categoryUrl = '/admin/category'
const articleUrl = '/admin/article'

const changeStatus = (url, id, status) => {
    let update_data = { id, status };
    $.post(url, update_data,
        function (data, textStatus, jqXHR) {
            let { status} = data.result
            if(data.success){
                let parent = `#status-${id}`
                let classColor = "danger"
                let iconColor = "ban"

                if(status == 'active'){
                    classColor = "success"
                    iconColor = "check"
                }
                let xhtmlStatus = `<a href="javascript:changeStatus('${url}', '${id}', '${status}')" class="rounded-circle btn btn-sm btn-${classColor}"> <i class="fas fa-${iconColor}"></i></a>`
                $(parent).html(xhtmlStatus);
                alertify.success('Change status success');
            }
        },
        "json"
    );
}


 const activeMenuOnClick = (menu, pathUrl) => {
     let currentURL = window.location.pathname;
    if (currentURL.includes(pathUrl)) {
        $(menu).addClass('bg-primary');
    }
 }
 
const previewFile = () =>{
    const preview = document.querySelector('#preview');
    const file = document.querySelector('#thumbnail-input-form').files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
        preview.src = reader.result;
    }, false);
    if (file) {
        reader.readAsDataURL(file);
    }
}

// const deleteItem = (id) => {
//     const data = { ids: [id] };
//     $.ajax({
//         type: "DELETE",
//         url: "/admin/category",
//         data: JSON.stringify(data),
//         dataType: "json",
//         success: function (response) {
//             if(response.success){
//                 console.log(response,data)
//             }
//         },
//     });
// } 

// const form = document.getElementById('submit-data-form');
// if(form){
//     form.addEventListener('submit', async function(e) {
//         e.preventDefault();
//         let form = $(e.target);
//         let url = form.attr('action');
//         let method = form.attr('method');
//         let id = form.attr('data-id');
//         let data = new FormData(form[0]); 
//         let obj_data = {}
//         console.log(data.getElementById )
        
//         for (let [key, value] of data.entries()) {
//             obj_data[key] = value
//         }
//         console.log('obj_data', obj_data.thumbnail)
   
//         const response = await fetch(`${url}/form/${id}`, {
//             method: method,
//             body: form
//         })
//         const response_Data = await response.json();
//         console.log(response_Data)
// })
// }

// const submitForm = (event, url, id) => {
//     event.preventDefault();
//     let method = id ? 'PUT' : 'POST'
//     const formData = new FormData(document.querySelector('#submit-data-form'));
//     let  data = Object.fromEntries(formData.entries());

//     if(data.thumbnail){
//         data = formData
//     }

//     console.log('data', data)
//     console.log('method', method)
//     console.log('url', url)
//     console.log('id', id)

//    $.ajax({
//     type: method,
//     url: `${url}/form/${id}`,
//     data: data,
//     contentType: false,
//     processData: false,
//     dataType: "json",
//     success: function (response) {
//         if(response.success){
//             window.location.href = url
//             setTimeout(function(){
//                 alertify.success('Update success')
//             }, 1000);
//         }else{
//             alertify.error('Update failed, invalid form')
//         }
//     }
//    });
// }

const submitCategoryForm = (event, url, id) =>{
    event.preventDefault();
    let method = id ? 'PUT' : 'POST'
    const data = $('#submit-data-form').serialize();

    $.ajax({
        type: method,
        url: `${url}/form/${id}`,
        data: data,
        dataType: "json",
        success: function (response) {
            if(response.success){
                window.location.href = url
                setTimeout(function(){
                    alertify.success('Update success')
                }, 1000);
            }else{
                alertify.error('Update failed, invalid form')
            }
        }
    });
}

const submitArticleForm = (event, url, id) =>{
    event.preventDefault();
    let method = id ? 'PUT' : 'POST'
    const formData = new FormData(document.querySelector('#submit-data-form'));

    $.ajax({
        type: method,
        url: `${url}/form/${id}`,
        data: formData,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (response) {
            if(response.success){
                window.location.href = url
                setTimeout(function(){
                    alertify.success('Update success')
                }, 1000);
            }else{
                alertify.error('Update failed, invalid form')
            }
        }
    });
}

$(document).ready(function () { 
    // active menu
    activeMenuOnClick('#category', categoryUrl);
    activeMenuOnClick('#article', articleUrl);
    if ($('#description').length) {
        CKEDITOR.replace('description');
    }

    $(document).on('change', '.ordering', function() {
        var newOrdering = $(this).val();
        var id = $(this).closest('td').find('input[name="category-id"]').val();

        let postData = {
            id,
            newOrdering
        }
       $.post(`${categoryUrl}/update-ordering`, postData,
        function (data, textStatus, jqXHR) {
            if(data.success) {
                alertify.success('Update ordering success')
            }
        },
        "json"
       );
    })

    
})
