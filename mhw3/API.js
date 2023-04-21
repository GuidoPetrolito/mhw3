/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

/* ------------------- DICHIARAZIONI E GESTIONE ------------------------ */
const HarryPotter_api_endpoint = 'https://hp-api.onrender.com/api/characters';
const GameOfThrones_api_endpoint = 'https://thronesapi.com/api/v2/Characters';
const Selection = document.querySelectorAll('#search_content');
let click = '';

const key_marvel = 'e9ffcb7d515184b346d9e0cab9948ef1';
const hash_marvel = '72fd1853ec949d52bd327ca41f753dad';

const client_id = '0cc9d0b9736d45d1b59eac540357d6da';
const client_secret = 'd5c648fb11c14a5cbeab3ccbcf0f3b54';
let token;

const film = [HarryPotter_api_endpoint, GameOfThrones_api_endpoint];

for(let form of Selection) {
    form.addEventListener('submit', search);
    console.log('Submit Aggiunto!');
}

function search(event) {
    //Impedisco il submit del form
    event.preventDefault();
    click = event.currentTarget;

    // console.log(click);
    console.log('Avvio Fuznione Search...');
    console.log(click.dataset.questionId);

    //Leggo il valore della selezione
    const type = document.querySelector('#' + click.dataset.questionId).value;
    console.log("Scelta: " + type);
    console.log("Tipo Selezionato: " + type);

    //Gestisco i diversi tipi disponibili
    if(type === "Film") {
        console.log('Collegamento a Film...');
        random = Math.floor(Math.random()) * 2;
        fetch(film[random]).then(onResponse).then(onJsonHarryPotter);
    } else if (type === "Musica") {
        console.log(client_id);
        console.log(client_secret);
        fetch("https://accounts.spotify.com/api/token", {
        method: "post",
        body: 'grant_type=client_credentials',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
            }
        }
        ).then(onTokenResponse).then(onTokenJson);
    } else if (type === "Fumetti") {
        console.log('Collegamento a Fumetti...');
        fetch('https://gateway.marvel.com:443/v1/public/events?' + 'limit=100&ts=1&apikey=' + key_marvel + '&hash=' + hash_marvel).then(onResponse).then(onJsonMarvel);
    } else {

    }

    click.removeEventListener('submit', search);
}

function onResponse(response) {
    console.log('Risposta Ricevuta!');
    return response.json();
}

/* ------------------- FILM ------------------------ */
function onJsonGameOfThones(json) {
    console.log('Json File Ricevuto!');
    console.log('Collegamento a GameOfThrones Riuscito!');
    // console.log(json);
    // console.log(click);

    const div = click.parentNode.querySelectorAll('div');
    // console.log(div);

    let j = 0;

    //Estraggo le immagini di mio interesse dall'array restituito
    for(i = 0; i < 9; i++) {
        res[i] = json[i].imageUrl;
        // console.log(res[i]);
    }

    for(let sDiv of div) {
        // console.log(div);
        const image = sDiv.querySelector('.profile');
        // console.log(image); 
        image.src = res[j];
        j++;
    }
}

function onJsonHarryPotter(json) {
    console.log('Json File Ricevuto!');
    console.log('Collegamento a HarryPotter Riuscito!');
    // console.log(json);
    // console.log(click);

    const div = click.parentNode.querySelectorAll('div');
    console.log(div);

    let j = 0;

    //Estraggo le immagini di mio interesse dall'array restituito
    for(i = 0; i < 9; i++) {
        res[i] = json[i].image;
    }

    for(let sDiv of div) {
        // console.log(div);
        const image = sDiv.querySelector('.profile');
        // console.log(image); 
        image.src = res[j];
        j++;
    }
}


/* ------------------- FUMETTI ------------------------ */
function onJsonMarvel(json) {
    console.log('JSON ricevuto');
    console.log(json);

    const div = click.parentNode.querySelectorAll('div');
    console.log(div);

    const res = json.data.results;
    console.log(res);

    let resEstr = [];
    let path;
    let extension;

    let random = 0;

    //Estraggo le immagini di mio interesse dall'array restituito
    for(i = 0; i < 9; i++) {
        random = Math.random() * 74;
        random = Math.floor(random);
        console.log(random);
        resEstr[i] = res[random].thumbnail;
        console.log(resEstr[i]);
    }

    i = 0;

    for(let sDiv of div) {
        if(i < 9) {
        path = resEstr[i].path;
        extension = resEstr[i].extension;

        // console.log(div);
        const image = sDiv.querySelector('.profile');
        // console.log(image); 
        image.src = path + '/standard_amazing.' + extension;

        i++;
        path = '';
        extension = '';
        }
        else 
            return;
    }
}

// OAuth
function onTokenJson(json) {
  token = json.access_token;
  console.log(token);
  connect();
}

function onTokenResponse(response) {
  return response.json();
}

function connect() {
    fetch("https://api.spotify.com/v1/browse/new-releases", {
    headers:{
    'Authorization': 'Bearer ' + token
    }
}
).then(onResponse).then(onJsonMusic);
}

function onJsonMusic(json){
    const div = click.parentNode.querySelectorAll('div');
    console.log(json);

    const results = json.albums.items;
    let num_results = results.length;
    let selected_image = [];

    for(let i=0; i<num_results; i++) {
    const album_data = results[i]
    selected_image[i] = album_data.images[0].url;
    }
    
    let i = 0;
    for(let sDiv of div) {
        // console.log(div);
        const image = sDiv.querySelector('.profile');
        // console.log(image); 
        image.src = selected_image[i];
        i++;
    }
}