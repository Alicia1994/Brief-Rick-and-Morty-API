window.onload = LoadEpisode();

function LoadEpisode() {

    const container_episode = document.querySelector("#container_episode");

    let urls = ['https://rickandmortyapi.com/api/episode?page=1', 'https://rickandmortyapi.com/api/episode?page=2', 'https://rickandmortyapi.com/api/episode?page=3']
    for (let index = 0; index < urls.length; index++) {
        const url = urls[index];
    }
    Promise.all(urls.map(url => fetch(url)))
        .then(resp => Promise.all(resp.map(r => r.json())))

    .then(function(data) {

        let tabData = data[0].results.concat(data[1].results, data[2].results);

        tabData.forEach(episode => {
            container_episode.innerHTML += `
            <div class="episode-name" data-url="${episode.url}" id="episode-${episode.id}">${episode.episode} - ${episode.name}</div>
            <div id="character_details">
            </div>
            `

            let divEpisode = document.querySelectorAll(".episode-name");
            divEpisode.forEach(episodeName => {

                episodeName.addEventListener("click", (event) => {

                    fetch(event.target.dataset.url).then((resp) => {

                        return resp.json()
                    }).then((episode) => {
                        getCharacterDetails(episode.characters, event.target);


                        let clickScroll_character = event.target.nextElementSibling;
                        toggleClass(clickScroll_character, "character_details");
                    })
                })
            });
        });

        let typesRadio = document.querySelectorAll("input[type=radio]");

        for (let ind = 0; ind < typesRadio.length; ind++) {

            typesRadio[ind].addEventListener("change", (event) => {
                let newTabData;
                if (event.target.value != "all") {
                    newTabData = tabData.filter(data => data.episode.substr(0, 3) == `${event.target.id}`);
                } else {
                    newTabData = tabData;
                }

                container_episode.innerHTML = "";
                newTabData.forEach(episode => {

                    container_episode.innerHTML += `
                            <div class="episode-name" data-url="${episode.url}" id="episode-${episode.id}">${episode.episode} - ${episode.name}</div>
                            <div id="character_details"></div>
                            `

                    document.querySelectorAll(".episode-name").forEach((title, index) => {

                        title.addEventListener("click", (event) => {

                            let listUriCharacter = newTabData[index].characters;

                            getCharacterDetails(listUriCharacter, event.target);

                            let clickScroll_character = event.target.nextElementSibling;

                            toggleClass(clickScroll_character, "character_details");

                        })
                    });
                });
            })
        }

        function getCharacterDetails(listUriCharacter, divEp) {
            let reponse = [];
            divEp.nextElementSibling.innerHTML = "";
            for (const uri of listUriCharacter) {
                fetch(uri).then((resp) => {
                    return resp.json()
                }).then((resp2) => {
                    reponse.push(resp2);
                    divEp.nextElementSibling.innerHTML +=
                        `<div class="characters_card">
                            <img src="${resp2.image}" alt="${resp2.name}">
                            <div class="characters_card-content">
                                <h2>${resp2.name}</h2>
                                <div class="details">${resp2.gender}</div>
                                <div class="details">${resp2.species}</div>
                                <div class="details">${resp2.type}</div>
                            <div/> 
                         </div>
                        `
                })
            }
        }

        function toggleClass(elem, className) {
            elem.classList.toggle(className);
        }
    })

    .catch(function(error) {
        console.error(error);
    })
}