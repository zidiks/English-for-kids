module.exports = {
    states: {
        currentCategory: undefined,
        playMode: false,
        startedPlay: false,
        dict: undefined,
        currentQuestion: undefined,
        resultsQuestion: undefined,
        answersList: undefined,
        copyList: undefined,
        currPage: undefined
    },
    functions: {},
    audios: {
        wrong: new Audio('/assets/audio/wrong.mp3'),
        right: new Audio('/assets/audio/right.mp3'),
        win: new Audio('/assets/audio/win.mp3'),
        fall: new Audio('/assets/audio/fall.mp3'),
    },
    statistics: localStorage.getItem('statistics') ? JSON.parse(localStorage.getItem('statistics')) : makestats()
}

function makestats() {
    const statistics = {};
    const db = require('./db');
    db.categories.forEach(cat => {
        db[cat.name].forEach(el => {
            statistics[el.word] = {
                category: cat.name,
                translation: el.translation,
                trained: 0,
                correct: 0,
                incorrect: 0,
                percent: 0
            }
        })
    })
    localStorage.setItem('statistics', JSON.stringify(statistics));
    return statistics;
}