require('./index.css');
const template = require('./index.html');

const OnInit = () => {
    console.log('index ready')
}

module.exports = {
    template: template,
    oninit: OnInit
}