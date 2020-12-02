require('./stats.css');
const template = require('./stats.html');

const OnInit = () => {
    console.log('stats ready')
}

module.exports = {
    template: template,
    oninit: OnInit
}