const pages = require('../modules').pages;
const index = document.createElement('app');
const { states } = require('./globalProps');
index.innerHTML = pages.index.template;
document.body.appendChild(index);
const app = document.getElementsByTagName('routeroutlet')[0];
const menu = document.getElementById('menu');
const toggleMenu = document.getElementById('menu_checkbox');
const menuShadow = document.getElementById('menu-shadow');
toggleMenu.addEventListener('change', () => {
    if (toggleMenu.checked) {
        menu.style.transform = 'translateX(0rem)';
        menuShadow.style.display = 'block';
    } else {
        menu.style.transform = 'translateX(-26rem)';
        menuShadow.style.display = 'none';
    }
});
menuShadow.addEventListener('click', () => {
    toggleMenu.checked = false;
    menu.style.transform = 'translateX(-26rem)';
    menuShadow.style.display = 'none';
})

const toggle = {
    check: document.getElementById('toggle-button'),
    label: document.getElementById('toggle-label'),
    point: document.getElementById('toggle-point'),
    play: document.getElementById('toggle-play'),
    train: document.getElementById('toggle-train')
}
toggle.check.addEventListener('change', () => {
    toggleAnimation();
});

const addRouteListener = (event) => {
    if (event.currentTarget.getAttribute('category')) states.currentCategory = event.currentTarget.getAttribute('category');
    routeTo(event.currentTarget.getAttribute('to'));
}
const initRoutes = () => {
    Array.from(document.querySelectorAll('z-link')).forEach(element => {
        element.removeEventListener('click', addRouteListener);
        element.addEventListener('click', addRouteListener);
    });
}

const routeTo = (route) => {
    app.style.opacity = 0;
    toggleMenu.checked = false;
    menu.style.transform = 'translateX(-26rem)';
    menuShadow.style.display = 'none';
    setTimeout(() => {
        if (pages[route] != undefined) swapHTML(pages[route]);
        else throw `Page "${route}" is not found!`;
        setTimeout(() => {
            app.style.opacity = 1;
        }, 250);
    }, 200);
}

const toggleAnimation = () => {
    if (toggle.check.checked) {
        toggle.point.style.transform = 'translateX(55px)';
        toggle.label.style.backgroundColor = "#23d5ab";
        toggle.play.style.opacity = 1;
        toggle.train.style.opacity = 0;
    } else {
        toggle.point.style.transform = 'translateX(0px)';
        toggle.label.style.backgroundColor = "#FFBC29";
        toggle.play.style.opacity = 0;
        toggle.train.style.opacity = 1;
    }
}

const swapHTML = (tmpl) => {
    app.innerHTML = tmpl.template;
    tmpl.oninit();
    initRoutes();
}

routeTo('home');