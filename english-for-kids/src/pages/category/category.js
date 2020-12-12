require('./category.css');
const template = require('./category.html');
const item = require('./item.html');
const { states, functions, audios, statistics } = require('../../services/globalProps');

const OnInit = () => {
    document.getElementById('play-start').innerHTML = 'play_circle_outline';
    states.startedPlay = false;
    states.answersList = [];
    states.resultsQuestion = [];
    const changeMode = () => {
        console.log('MODE CHANGED');
    }

    functions.changeMode = changeMode;

    const endofgame = document.getElementById('end-of-game');
    const smile = document.getElementById('stats-smile');

    const endTest = () => {
        states.startedPlay = false;
        document.getElementById('play-start').innerHTML = 'play_circle_outline';
        states.answersList = [];
        states.resultsQuestion = [];
    }

    endofgame.removeEventListener('click', endTest);
    endofgame.addEventListener('click', endTest);

    if (states.currentCategory) {
        console.log('go to:', states.currentCategory)
        let catList = require('../../services/db')[states.currentCategory];
        const grid = document.getElementById('category-grid');
        catList.forEach(el => {
            let div = document.createElement('div');
            div.classList.add('category-item');
            div.innerHTML = item;
            div.id = el.word;
            div.getElementsByClassName('item-face')[0].addEventListener('click', (e) => {
                if (e.target.classList[0] != 'material-icons' && !states.playMode) {
                    el.audioSrc.currentTime = 0;
                    el.audioSrc.play();
                }
                if (states.playMode && states.startedPlay && !states.answersList.includes(el.word)) {
                    states.answersList.push(states.currentQuestion.answer);
                    console.log(el.word);
                    console.log(states.currentQuestion);
                    let questTarget = document.getElementById(states.currentQuestion.answer).getElementsByClassName('item-outer')[0];
                    statistics[states.currentQuestion.answer].trained++;
                    if (el.word == states.currentQuestion.answer) {
                        console.log('правильно!');
                        statistics[states.currentQuestion.answer].correct++;
                        states.resultsQuestion.push(true);
                        audios.right.currentTime = 0;
                        audios.right.play();
                        questTarget.classList.add('right-a');
                        document.getElementById(`star-${states.currentQuestion.id}`).style.color = '#00bf00';
                    } else {
                        console.log('не правильно!');
                        statistics[states.currentQuestion.answer].incorrect++;
                        states.resultsQuestion.push(false);
                        audios.wrong.currentTime = 0;
                        audios.wrong.play();
                        questTarget.classList.add('wrong-a');
                        document.getElementById(`star-${states.currentQuestion.id}`).style.color = 'red';
                    }
                    statistics[states.currentQuestion.answer].percent = Math.round(statistics[states.currentQuestion.answer].correct / statistics[states.currentQuestion.answer].trained * 100);
                    localStorage.setItem('statistics', JSON.stringify(statistics));
                    console.log('результаты:', states.resultsQuestion);
                    console.log('лист ответов:', states.answersList);
                    states.currentQuestion.id++;
                    if (states.currentQuestion.id < catList.length) {
                        states.currentQuestion.answer = states.copyList[states.currentQuestion.id].word;
                        states.currentQuestion.audio = states.copyList[states.currentQuestion.id].audioSrc;
                        setTimeout(() => {
                            states.currentQuestion.audio.play();
                        }, 500);
                    } else {
                        // alert('end of test');
                        endofgame.style.display = 'flex';
                        grid.style.display = 'none';
                        let mistakeStat = states.resultsQuestion.reduce(function(sum, current) {
                            return sum += current ? 0 : 1;
                        }, 0);
                        document.getElementById('stats-mistakes').innerHTML = 'Ошибок: ' + mistakeStat;
                        smile.innerHTML = mistakeStat > 0 ? 'mood_bad' : 'mood';
                        smile.style.color = mistakeStat > 0 ? 'red' : 'green';
                        document.getElementById('play-panel').style.transform = 'translateX(110%)';
                        document.getElementById('stars-panel').style.transform = 'translateY(110%)';
                        if (mistakeStat == 0) audios.win.play();
                        else audios.fall.play();
                    }
                }
            })
            div.getElementsByClassName('revert-card')[0].addEventListener('click', () => {
                div.getElementsByClassName('item-outer')[0].style.transform = 'rotateY(180deg)';
                setTimeout(() => {
                    div.getElementsByClassName('item-face')[0].style.display = 'none';
                }, 70);
            });
            div.addEventListener('mouseleave', () => {
                div.getElementsByClassName('item-outer')[0].style.transform = 'rotateY(0deg)';
                setTimeout(() => {
                    div.getElementsByClassName('item-face')[0].style.display = 'flex';
                }, 70);
            })
            let namediv = div.getElementsByClassName('item-name');
            namediv[0].innerHTML = el.word;
            namediv[1].innerHTML = el.translation;
            let imgdiv = div.getElementsByClassName('item-img')
            if (el.imgSrc) {
                imgdiv[0].style.backgroundImage = `url('/assets/cards/${el.imgSrc}')`;
                imgdiv[1].style.backgroundImage = `url('/assets/cards/${el.imgSrc}')`;
            }
            if (el.size) {
                imgdiv[0].style.transform = `scale(${el.size})`;
                imgdiv[1].style.transform = `scale(${el.size})`;
            }
            grid.appendChild(div);
        })
    }
}

module.exports = {
    template: template,
    oninit: OnInit
}