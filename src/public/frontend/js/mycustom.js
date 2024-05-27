const handleFormSubmit = (event) => {
    event.preventDefault()
    const data = $('#contactForm').serialize();
    $.post("admin/contact/form", data,
        function (data, textStatus, jqXHR) {
            if(data.success){
                window.location.href = '/';
            }
      },
        "json"
    );
}