require('./home.css');
const template = require('./home.html');

const OnInit = () => {
    console.log('home ready')
}

module.exports = {
    template: template,
    oninit: OnInit
}