require('./home.css');
const template = require('./home.html');
const { categories } = require('../../services/db');

const OnInit = () => {
    categories.forEach(el => {
        console.log(el.name);
    })
}

module.exports = {
    template: template,
    oninit: OnInit
}