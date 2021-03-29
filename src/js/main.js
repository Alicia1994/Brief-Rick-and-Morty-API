window.onload = LoadEpisode;

const divListEpisode = document.querySelector('#list-episodes');

function LoadEpisode() {

    let urls = ['https://rickandmortyapi.com/api/episode?page=1', 'https://rickandmortyapi.com/api/episode?page=2', 'https://rickandmortyapi.com/api/episode?page=3']
    for (let index = 0; index < urls.length; index++) {
        const url = urls[index];
    }
    Promise.all(urls.map(url => fetch(url)))
        .then(resp => Promise.all(resp.map(r => r.json())))
        .then(function(data) {

            let tabData = data[0].results.concat(data[1].results, data[2].results);

            for (const episode of tabData) {

                divListEpisode.innerHTML += `
                    <div class="episode-name" id="episode-${episode.id}">${episode.episode} - ${episode.name}</div>
                    <div id="characters"></div>
                `
            }

            let typesRadio = document.querySelectorAll("input[type=radio]");
            for (let j = 0; j < typesRadio.length; j++) {

                typesRadio[j].addEventListener("change", (e) => {
                    let newTabData;
                    if (e.target.value != "all") {
                        newTabData = tabData.filter(data => data.num == `${e.target.id}`);
                        console.log(tabData[k].episode);
                    } else {
                        newTabData = tabData;
                    }

                })
            }

            let divEpisode = document.querySelectorAll('.episode-name');

            for (let i = 0; i < divEpisode.length; i++) {

                divEpisode[i].addEventListener("click", () => {

                    let listUriCharacter = tabData[i].characters;
                    getCharacterDetails(listUriCharacter, divEpisode[i]);

                    let clickScroll = divEpisode[i].nextElementSibling;
                    toggleClass(clickScroll, "display-none");
                })
            }
        })
        .catch(function(error) {
            console.error(error);
        })
}

function getCharacterDetails(listUriCharacter, divEpisode) {

    let reponse = [];
    divEpisode.nextElementSibling.innerHTML = "";

    for (const uri of listUriCharacter) {
        fetch(uri).then((resp) => {
            return resp.json()
        }).then((resp2) => {
            reponse.push(resp2);
            divEpisode.nextElementSibling.innerHTML += `
            <div class="characters_card">
            <img src="${resp2.image}" alt="${resp2.name}">
                
                <div class="characters_card-content">
                    <h2>${resp2.name}</h2>
                    <div class="details">${resp2.gender}</div>
                    <div class="details">${resp2.species}</div>
                    <div class="details">${resp2.type}</div>
                </div>
            </div>
            `
        })
    }
}

function toggleClass(elem, className) {
    elem.classList.toggle(className);
}