document.body.appendChild(document.createElement('app'));
const app = document.getElementsByTagName('app')[0];
const modules = require('../modules');

const initRoutes = () => {
    Array.from(document.querySelectorAll('z-link')).forEach(element => {
        element.addEventListener('click', () => {
            this.routeTo(element.getAttribute('to'));
        })
    });
}

exports.routeTo = (route) => {
    app.style.opacity = 0;
    setTimeout(() => {
        if (modules[route] != undefined) swapHTML(modules[route]);
        else throw `Page "${route}" is not found!`;
        initRoutes();
        setTimeout(() => {
            app.style.opacity = 1;
        }, 250);
    }, 200);
}

const swapHTML = (tmpl) => {
    app.innerHTML = tmpl.template;
    tmpl.oninit();
}

this.routeTo('index');