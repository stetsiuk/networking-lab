const toggles = document.querySelectorAll('.action__toggle');

const backofficeBoard = document.querySelector('.action__backoffice-bord')
const frontofficeBoard = document.querySelector('.action__frontoffice-bord')

const backofficeTabs = backofficeBoard.querySelectorAll('.tab');
const frontofficeTabs = frontofficeBoard.querySelectorAll('.tab');

const backofficeInfo = backofficeBoard.querySelectorAll('.action__info');
const frontofficeInfo = frontofficeBoard.querySelectorAll('.action__info');

const actionToggle = () => {
    toggles.forEach((toggle, num) => {
        toggle.addEventListener('click', () => {

            toggles.forEach(toggle => {
                toggle.classList.remove('active')
            })
            toggle.classList.add('active')

            if (num === 0) {
                frontofficeBoard.style.display = 'none';
                backofficeBoard.style.display = 'block'
            } else if (num === 1) {
                backofficeBoard.style.display = 'none'
                frontofficeBoard.style.display = 'block';
                
            }
        })
    })

    backofficeTabs.forEach((tab, num) => {
        tab.addEventListener('click', () => {
            backofficeTabs.forEach(tab => {
                tab.classList.remove('active')
            })
            tab.classList.add('active')

            backofficeInfo.forEach(info => {
                info.style.display = 'none'
            })
            backofficeInfo[num].style.display = 'block'
        })
    })

    frontofficeTabs.forEach((tab, num) => {
        tab.addEventListener('click', () => {
            frontofficeTabs.forEach(tab => {
                tab.classList.remove('active')
            })
            tab.classList.add('active')

            frontofficeInfo.forEach(info => {
                info.style.display = 'none'
            })
            frontofficeInfo[num].style.display = 'block'
        })
    })
}   


export default actionToggle;

