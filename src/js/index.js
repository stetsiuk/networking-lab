import actionToggle from './modules/actionToggle';
import modal from './modules/modal';
import validateForm from './modules/validateForm';

document.addEventListener('DOMContentLoaded', () => {
    actionToggle();
    modal();
    validateForm();
    new TypeIt('.promo__title', {
        startDelay: 250,
        speed: 100,
        cursor: false,
    }).go();
});