require('./stats.css');
const template = require('./stats.html');
const { statistics } = require('../../services/globalProps');
const db = require('../../services/db');

const OnInit = () => {
    const statsArr = Object.keys(statistics);

    // document.getElementById('repeat-dw').addEventListener('click', getRepeatWords);

    // function getRepeatWords() {
    //     const repeatWords = [];
    //     statsArr.forEach(el => {
    //         if (statistics[el].percent < 40 && statistics[el].trained > 0) repeatWords.push(db[statistics[el].category].find(item => item.word == el))
    //     });
    //     db.repeat = repeatWords.sort(() => Math.random() - 0.5).slice(0, 9);
    // }

    document.getElementById('reset-stats').addEventListener('click', () => {
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
        });
        localStorage.setItem('statistics', JSON.stringify(statistics));
        RenderStats(statsArr);
        console.log(statistics);
    });

    const SortStates = {
        category: false,
        words: false,
        translation: false,
        trained: false,
        correct: false,
        incorrect: false,
        precent: false,
        last: undefined
    }

    function RenderStats(statsArr) {
        const table = document.getElementById('stats-table');
        table.innerHTML = `<tr class="start-line"><td id="sort-cat">Categories</td><td id="sort-words">Words</td><td id="sort-translat">Translations</td><td id="sort-attempts">Attempts</td><td id="sort-correct">Correct</td><td id="sort-incorrect">Incorrect</td><td id="sort-percent">Correct, %</td></tr>`;
        statsArr.forEach(el => {
            let obj = statistics[el];
            let tr = document.createElement('tr');
            tr.innerHTML = `<td>${obj.category}</td><td>${el}</td><td>${obj.translation}</td><td>${obj.trained}</td><td>${obj.correct}</td><td>${obj.incorrect}</td><td>${obj.percent}</td>`;
            table.appendChild(tr);
        });
        document.getElementById('sort-cat').addEventListener('click', () => {
            SortTable('category');
        }, false);
        document.getElementById('sort-words').addEventListener('click', () => {
            SortTable('words');
        }, false);
        document.getElementById('sort-translat').addEventListener('click', () => {
            SortTable('translation');
        }, false);
        document.getElementById('sort-attempts').addEventListener('click', () => {
            SortTable('trained');
        }, false);
        document.getElementById('sort-correct').addEventListener('click', () => {
            SortTable('correct');
        }, false);
        document.getElementById('sort-incorrect').addEventListener('click', () => {
            SortTable('incorrect');
        }, false);
        document.getElementById('sort-percent').addEventListener('click', () => {
            SortTable('percent');
        }, false);
    }

    function SortTable(arg) {
        //console.log(SortStates[arg]);
        if (SortStates[arg] && SortStates.last == arg) {
            statsArr.reverse();
        } else {
            if (arg == 'words') {
                statsArr.sort();
            } else {
                statsArr.sort((a, b) => {
                    if (statistics[a][arg] < statistics[b][arg]) { return -1; }
                    if (statistics[a][arg] > statistics[b][arg]) { return 1; }
                    return 0;
                })
            }
            SortStates[arg] = true;
        }
        SortStates.last = arg;
        RenderStats(statsArr);
    }

    RenderStats(statsArr);
}

module.exports = {
    template: template,
    oninit: OnInit
}