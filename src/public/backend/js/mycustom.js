const { json } = require("express")

const categoryUrl = '/admin/category'
const articleUrl = '/admin/article'
const contactUrl = '/admin/contact'


const handleFormSubmit = (event, id) => {
    event.preventDefault()
    const method = id? PUT : POST
    const data = $('#submit-data-form').serialize();
    $.$.ajax({
        type: method,
        url: `/admin/contact/form/${id}`,
        data: data,
        dataType: "json",
        success: function (response) {
            if(response.success){
                window.location.href = "admin/contact"
            }
        }
    });
}

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


$(document).ready(function () { 
    // active menu
    activeMenuOnClick('#category', categoryUrl);
    activeMenuOnClick('#article', articleUrl);
    activeMenuOnClick('#contact', contactUrl);
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

    // Turn input element into a pond
    //  FilePond.registerPlugin(FilePondPluginImagePreview);

    //  const inputElement = document.querySelector('input[name="thumbnail"]');
    //  const pond = FilePond.create(inputElement);
    //  FilePond.setOptions({
    //     server: {
    //         url: '/admin/article/upload-photos',
    //         timeout: 7000,
    //         process: {
    //             url: '/upload', // Specify the backend endpoint to handle file upload
    //             method: 'POST',
    //             withCredentials: false,
    //             onload: (response) => response.key,
    //             onerror: (response) => response.data,
    //             ondata: (formData) => {
    //                 console.log(JSON.stringify(formData));
    //                 return formData;
    //             },
    //         },
    //     },
    // });
    
    // pond.on('processfile', (error, file) => {
    //     if (error) {
    //         console.error('File processing error:', error);
    //     } else {
    //         console.log('File processed:', file);
    //         pond.processFile(file, file.serverId);
    //     }
    // });
    //  pond.addFile('https://res.cloudinary.com/dzi76lgy2/image/upload/v1716543675/thumbnail/sovxgrjveg6f5mhu31ae.jpg'); // Add a file to the FilePond instance

    //  pond.on('addfile', (error, file) => {
    //      if (error) {
    //          console.error('File add error:', error);
    //      } else {
    //          console.log('File added:', file.File);
    //      }
    //  });


    //  FilePond.setOptions({
    //      server: {
    //          url: '/admin/article/upload-photos'
    //  }})
     

    // $('.filepond').filepond({
    //     allowMultiple: true,
    // });
    


    // Set allowMultiple property to true
    // $('.filepond').filepond('allowMultiple', false);

    // $('.filepond')
    // .filepond('addFile', 'http://res.cloudinary.com/dzi76lgy2/image/upload/v1716205523/thumbnail/thumbnail-1716205521015-577735266.jpg.jpg' )
    // .then(function (file) {
    //     console.log('file added', file.file);
    //     //
    // });


})  
