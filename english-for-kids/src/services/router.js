const pages = require('../modules').pages;
const index = document.createElement('app');
const { states, statistics } = require('./globalProps');
index.innerHTML = pages.index.template;
document.body.appendChild(index);
const app = document.getElementsByTagName('routeroutlet')[0];
const menu = document.getElementById('menu');
const toggleMenu = document.getElementById('menu_checkbox');
const menuShadow = document.getElementById('menu-shadow');
const playBtn = document.getElementById('play-start');
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
    if (Array.from(event.currentTarget.classList).includes('menu-cat-link')) {
        Array.from(document.getElementsByClassName('menu-cat-link')).forEach(el => {
            el.classList.remove('active-cat-link');
        });
        event.currentTarget.classList.add('active-cat-link');
    }
    if (event.currentTarget.getAttribute('category')) {
        const repeatWords = [];
        const db = require('./db');
        Object.keys(statistics).forEach(el => {
            if (statistics[el].percent < 40 && statistics[el].trained > 0) repeatWords.push(db[statistics[el].category].find(item => item.word == el))
        });
        db.repeat = repeatWords.sort(() => Math.random() - 0.5).slice(0, 9);
        states.currentCategory = event.currentTarget.getAttribute('category');
    }
    routeTo(event.currentTarget.getAttribute('to'), event.currentTarget);
}
const initRoutes = () => {
    Array.from(document.querySelectorAll('z-link')).forEach(element => {
        element.removeEventListener('click', addRouteListener);
        element.addEventListener('click', addRouteListener);
    });
}

const routeTo = (route) => {
    states.currPage = route;
    app.style.opacity = 0;
    toggleMenu.checked = false;
    menu.style.transform = 'translateX(-26rem)';
    menuShadow.style.display = 'none';
    setTimeout(() => {
        if (pages[route] != undefined) swapHTML(pages[route]);
        else throw `Page "${route}" is not found!`;
        changeMode();
        setTimeout(() => {
            app.style.opacity = 1;
        }, 250);
    }, 200);
}

playBtn.addEventListener('click', () => {
    if (states.playMode) {
        if (!states.startedPlay) {
            states.startedPlay = true;
            playBtn.innerHTML = 'replay';
            let cardsList = require('./db')[states.currentCategory];
            states.copyList = cardsList.slice();
            states.copyList.sort(() => Math.random() - 0.5);
            console.log(states.copyList);
            states.currentQuestion = {
                id: 0,
                answer: states.copyList[0].word,
                audio: states.copyList[0].audioSrc
            };
            setTimeout(() => {
                states.currentQuestion.audio.play();
            }, 500);
        } else {
            states.currentQuestion.audio.currentTime = 0;
            states.currentQuestion.audio.play();
        }
    }
})

const changeMode = () => {
    if (states.currPage == 'category') {
        if (states.playMode) {
            document.getElementById('play-panel').style.transform = 'translateX(0)';
            setTimeout(() => {
                document.getElementById('stars-panel').style.transform = 'translateY(0)';
            }, 300);
            Array.from(document.getElementsByClassName('revert-card')).concat(Array.from(document.getElementsByClassName('item-name'))).forEach(el => {
                el.style.display = 'none';
            });
            Array.from(document.getElementsByClassName('item-img')).forEach(el => {
                el.style.marginBottom = '0';
            });
        } else {
            document.getElementById('play-panel').style.transform = 'translateX(110%)';
            document.getElementById('stars-panel').style.transform = 'translateY(110%)';
            Array.from(document.getElementsByClassName('panel-star')).forEach(el => {
                el.style.color = '#222b56';
            });
            Array.from(document.getElementsByClassName('item-outer')).forEach(el => {
                el.classList.remove('wrong-a');
                el.classList.remove('right-a');
            })
            Array.from(document.getElementsByClassName('revert-card')).concat(Array.from(document.getElementsByClassName('item-name'))).forEach(el => {
                el.style.display = 'block';
            });
            Array.from(document.getElementsByClassName('item-img')).forEach(el => {
                el.style.marginBottom = '10%';
            });
        }
    } else {
        document.getElementById('play-panel').style.transform = 'translateX(110%)';
    }
}

const toggleAnimation = () => {
    if (toggle.check.checked) {
        states.playMode = true;
        toggle.point.style.transform = 'translateX(55px)';
        toggle.label.style.backgroundColor = "#23d5ab";
        toggle.play.style.opacity = 1;
        toggle.train.style.opacity = 0;
    } else {
        states.playMode = false;
        document.getElementById('play-start').innerHTML = 'play_circle_outline';
        states.startedPlay = false;
        states.answersList = [];
        states.resultsQuestion = [];
        toggle.point.style.transform = 'translateX(0px)';
        toggle.label.style.backgroundColor = "#FFBC29";
        toggle.play.style.opacity = 0;
        toggle.train.style.opacity = 1;
    }
    changeMode();
    console.log(states.playMode);
}

const swapHTML = (tmpl) => {
    app.innerHTML = tmpl.template;
    tmpl.oninit();
    initRoutes();
}

routeTo('home');