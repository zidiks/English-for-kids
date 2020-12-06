require('./index.css');
const template = require('./index.html');
const { categories } = require('../../services/db');
const OnInit = () => {

}

module.exports = {
    template: template,
    oninit: OnInit
}