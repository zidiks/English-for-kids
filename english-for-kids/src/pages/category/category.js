require('./category.css');
const template = require('./category.html');

const OnInit = () => {
    console.log('category ready')
}

module.exports = {
    template: template,
    oninit: OnInit
}