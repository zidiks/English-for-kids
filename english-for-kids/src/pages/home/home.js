require('./home.css');
const template = require('./home.html');
const { categories } = require('../../services/db');
const item = require('./item.html');

const OnInit = () => {
    const grid = document.getElementById('home-grid');
    categories.forEach(el => {
        let div = document.createElement('z-link');
        div.setAttribute('to', 'category');
        div.classList.add('home-item');
        div.style.backgroundColor = el.color;
        div.innerHTML = item;
        div.setAttribute('category', el.name);
        div.getElementsByClassName('item-name')[0].innerHTML = el.name;
        if (el.imgSrc) div.getElementsByClassName('item-img')[0].style.backgroundImage = `url('/assets/cats/${el.imgSrc}')`;
        if (el.size) div.getElementsByClassName('item-img')[0].style.transform = `scale(${el.size})`;
        grid.appendChild(div);
    })
}

module.exports = {
    template: template,
    oninit: OnInit
}