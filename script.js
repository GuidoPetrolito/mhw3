// /* TODO: inserite il codice JavaScript necessario a completare il MHW! */
const boxes = document.querySelectorAll('.choice-grid div');
const BoxesMap = {};
const BoxesArray = [];

let bool = 0;
let memory;
let type;
let boolean = 0;

const result = document.querySelector('#res');

const title = document.createElement('h1');
const contenent = document.createElement('p');

for (const box of boxes) {
    box.addEventListener('click', selezione);
    BoxesArray.push(box);
}

const clickButton = document.querySelector('#bottone');
clickButton.addEventListener('click', clickR);

function clickR(event) {
    const container = event.currentTarget;
    console.log("Cliccato Bottone!");

    const div = document.querySelectorAll('div');
    for(let box of BoxesArray) {
        box.classList.remove('DSec');
        box.classList.remove('Sec');


        console.log('Box: ' + box);
        const click = box.querySelector('.checkbox');
        click.src = "images/unchecked.png";
    }

    delete BoxesMap.one;
    delete BoxesMap.two;
    delete BoxesMap.three;

    boolean = 0;
    
    console.log("MAPPA RESET: " + BoxesMap);

    for (const box of boxes) {
        box.addEventListener('click', selezione);
        BoxesArray.push(box);
    }


    const clickRemoveText = document.querySelector('#risposta');
    clickRemoveText.classList.add('hidden');


    result.removeChild(title);
    result.removeChild(contenent);

    for(box of boxes) {
        let image = box.querySelector('img');
        console.log(image);
        image.src="images/def.jpg";
    }
}

function selezione(event) {
     const container = event.currentTarget;

     const preceClick = container.querySelector('.checkbox');
     preceClick.src = "images/checked.png";
     container.classList.remove('DSec');
     container.classList.add('Sec');
     const other_answers = container.parentNode.querySelectorAll('div');

     BoxesMap[container.dataset.questionId] = container.dataset.choiceId;

     for (let ans of other_answers) {
         if(ans.dataset.choiceId != container.dataset.choiceId) {
            ans.classList.add('DSec');
            ans.classList.remove('Sec');
            const preceClick = ans.querySelector('.checkbox');
            preceClick.src = "images/unchecked.png";
         }   
     }

    if(boolean === 0 || type === container.dataset.questionId) {
        type = container.dataset.questionId;
        memory = container.dataset.choiceId;
        boolean = 1;
    }



    if(BoxesMap.one != undefined && BoxesMap.two != undefined && BoxesMap.three != undefined ) {
        const doc = document.querySelectorAll('#search_content');
        for(let box of BoxesArray) {
            box.removeEventListener('click', selezione);
        }

        console.log(doc);
        for(docs of doc) {
            docs.removeEventListener('submit', search);
        }

        const bottom = document.querySelector('#risposta');

        if(BoxesMap.one === BoxesMap.two && BoxesMap.two === BoxesMap.three) {
            console.log(RESULTS_MAP[BoxesMap.one]);
            
            title.textContent = RESULTS_MAP[BoxesMap.one].title;
            contenent.textContent = RESULTS_MAP[BoxesMap.one].contents;

            result.appendChild(title);
            result.appendChild(contenent);
        }
        else if(BoxesMap.one === BoxesMap.two && BoxesMap.two != BoxesMap.three) {
            title.textContent = RESULTS_MAP[BoxesMap.one].title;
            contenent.textContent = RESULTS_MAP[BoxesMap.one].contents;

            result.appendChild(title);
            result.appendChild(contenent);
        }

        else if(BoxesMap.one != BoxesMap.two && BoxesMap.two === BoxesMap.three) {
            title.textContent = RESULTS_MAP[BoxesMap.two].title;
            contenent.textContent = RESULTS_MAP[BoxesMap.two].contents;

            result.appendChild(title);
            result.appendChild(contenent);
        }

        else if(BoxesMap.three === BoxesMap.one && BoxesMap.three != BoxesMap.two) {
            title.textContent = RESULTS_MAP[BoxesMap.three].title;
            contenent.textContent = RESULTS_MAP[BoxesMap.three].contents;

            result.appendChild(title);
            result.appendChild(contenent);
        }

        else {
            title.textContent = RESULTS_MAP[memory].title;
            contenent.textContent = RESULTS_MAP[memory].contents;

            result.appendChild(title);
            result.appendChild(contenent);
        }

        bottom.classList.remove('hidden');

        console.log(RESULTS_MAP);
    }

    console.log(BoxesMap);
}
