
const validateForm = () => {
    $('.footer__form').validate({
        rules: {
            name: {
                required: true,
                minlength: 3,
                maxlength: 12,
            },
            email: {
                required: true,
                email: true
            },
            text: {
                required: true,
                minlength: 5,
            }
        }
    });
}

export default validateForm;
