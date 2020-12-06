require('./category.css');
const template = require('./category.html');
const item = require('./item.html');
const { states } = require('../../services/globalProps');

const OnInit = () => {
    if (states.currentCategory) {
        console.log('go to:', states.currentCategory)
        let catList = require('../../services/db')[states.currentCategory];
        const grid = document.getElementById('category-grid');
        catList.forEach(el => {
            let div = document.createElement('div');
            div.classList.add('category-item');
            div.style.backgroundColor = 'white';
            div.innerHTML = item;
            div.getElementsByClassName('item-name')[0].innerHTML = el.word;
            if (el.imgSrc) div.getElementsByClassName('item-img')[0].style.backgroundImage = `url('/assets/cards/${el.imgSrc}')`;
            if (el.size) div.getElementsByClassName('item-img')[0].style.transform = `scale(${el.size})`;
            grid.appendChild(div);
        })
    }
}

module.exports = {
    template: template,
    oninit: OnInit
}