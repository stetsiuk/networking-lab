function modal() {
    const promoBtn = document.querySelector('.promo__btn');
    const trialBtn = document.querySelector('.trial__btn');

    const overlay = document.querySelector('.overlay');
    const contactModal = document.querySelector('#contact');
    const close = document.querySelector('.modal__close')


    const activeModal = (button) => {
        button.addEventListener('click', () => {
            overlay.style.display = 'block';
            contactModal.style.display = 'block';
        })
    } 
    activeModal(promoBtn);
    activeModal(trialBtn);

    close.addEventListener('click', () => {
            overlay.style.display = 'none';
            contactModal.style.display = 'none';
    })
}


export default modal;