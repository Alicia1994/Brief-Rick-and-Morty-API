window.onload = LoadLocation();

function LoadLocation() {

    // création d'une constante pour stocker la div principale container_lieux qui va contenir toutes nos datas
    const container_lieux = document.querySelector("#container_lieux");

    //******** Injection du HTML pour boucler sur tous les filtres (button radio) contenus sur un tableau */
    let divType = document.querySelector("#radioButtonType");

    let arrayType = ["All", "Planet", "Cluster", "Space station", "Microverse", "TV", "Resort", "Fantasy town", "Dream", "Dimension", "unknown", "Menagerie", "Game", "Customs", "Daycare", "Dwarf planet (Celestial Dwarf)", "Miniverse", "Teenyverse", "Box", "Spacecraft", "Artificially generated world", "Machine", "Arcade", "Spa", "Quadrant", "Quasar", "Mount", "Liquid", "Convention", "Woods", "Diegesis", "Non-Diegetic Alternative Reality", "Nightmare", "Asteroid", "Acid Plant", "Reality", "Death Star", "Base"];
    console.log(divType);
    for (let index = 0; index < arrayType.length; index++) {

        divType.innerHTML += `<input type="radio" id="${arrayType[index]}" name="type_planete" value="${arrayType[index]}"> <label for="${arrayType[index]}"> ${arrayType[index]} </label>`

    }
    //***** FIN DE LA BOUCLE POUR BUTTON RADIO */

    // création d'une variable pour stocker toutes les pages de résultats 
    let urls = ['https://rickandmortyapi.com/api/location?page=1', 'https://rickandmortyapi.com/api/location?page=2', 'https://rickandmortyapi.com/api/location?page=3', 'https://rickandmortyapi.com/api/location?page=4', 'https://rickandmortyapi.com/api/location?page=5', 'https://rickandmortyapi.com/api/location?page=6']

    // boucle pour parcourir le tableau d'URL
    for (let index = 0; index < urls.length; index++) {
        const url = urls[index];
    }

    Promise.all(urls.map(url => fetch(url)))
        .then(resp => Promise.all(resp.map(r => r.json())))

    .then(function(data) {

        // concat obligatoire sinon prise en compte que de la dernière page après fetch
        let tabData = data[0].results.concat(data[1].results, data[2].results, data[3].results, data[4].results, data[5].results);


        //*****CODE POUR AFFICHER LES RESULTATS DES QU'ON ARRIVE SUR LA PAGE *********//

        // tabData -> tableau avec tous les résultats de l'API location
        // boucle parcourt le tableau pour injeter du HTML dans la div principal container_lieux et afficher l'ensemble de nos data 
        tabData.forEach(location => {
            container_lieux.innerHTML +=
                `<div class="card__text-container scroller">
                        <div class="location-name" data-url="${location.url}"  id="location-${location.id}">
                        <i class="fas fa-space-shuttle"></i> ${location.name} 
                            <ul class="location_details">
                                <li>Dimension : ${location.dimension}</li>
                                <li>Type : ${location.type}</li>              
                            </ul>
                        </div>                        
                        <div class="character_details"> </div>   
                    </div>
                `

            // on attrape la div location-name
            let divLocation = document.querySelectorAll(".location-name");

            // on boucle sur toutes nos div location-name
            divLocation.forEach(locationName => {

                // On ajoute un évènement lorsque l'on clique sur le nom de la planète
                locationName.addEventListener("click", (event) => {
                    // fetch des URI correspondant aux location.url
                    fetch(event.target.dataset.url).then((resp) => {

                        return resp.json()
                    }).then((location) => {
                        // refetch des URI par residents                 
                        getCharacterDetails(location.residents, event.target);

                        // Functions pour afficher/retirer les div location_details & character_details dès qu'on clique sur le nom de la planète
                        let clickScroll_details = event.target.childNodes[3];
                        let clickScroll_character = event.target.nextElementSibling;
                        toggleClass(clickScroll_character, "character_details");
                        toggleClass(clickScroll_details, "location_details");
                    })
                })
            });
        });

        //*****CODE POUR AFFICHER LES RESULTATS DES QU'ON UTILISE LES BUTTON RADIO *********//
        // identique au précédent mais avec une boucle en plus pour le filtre //

        let typesRadio = document.querySelectorAll("input[type=radio]");

        for (let ind = 0; ind < typesRadio.length; ind++) {

            // FILTRE -> création d'un array newTabData qui prendra la place de tabData si déclenchement d'un filtre autre que all
            typesRadio[ind].addEventListener("change", (event) => {
                let newTabData;
                if (event.target.value != "All") {
                    newTabData = tabData.filter(data => data.type == `${event.target.id}`);
                } else {
                    newTabData = tabData;
                }

                container_lieux.innerHTML = "";
                newTabData.forEach(location => {

                    container_lieux.innerHTML +=
                        `<div class="card__text-container scroller">
                                    <div class="location-name" id="location-${location.id}">
                                    <i class="fas fa-space-shuttle"></i> ${location.name}
                                        <ul class="location_details">
                                            <li>Dimension : ${location.dimension}</li>
                                            <li>Type : ${location.type}</li>              
                                        </ul>
                                    </div>
                                    <div class="character_details"> </div>  
                                </div> `

                    document.querySelectorAll(".location-name").forEach((title, index) => {

                        title.addEventListener("click", (event) => {

                            let listUriCharacter = newTabData[index].residents;
                            getCharacterDetails(listUriCharacter, event.target);

                            let clickScroll_details = event.target.childNodes[3];
                            let clickScroll_character = event.target.nextElementSibling;

                            toggleClass(clickScroll_character, "character_details");
                            toggleClass(clickScroll_details, "location_details");

                        })
                    });
                });
            })
        }




        // fonction pour intégrer les détails des résidents
        function getCharacterDetails(listUriCharacter, divEp) {
            let reponse = [];
            divEp.nextElementSibling.innerHTML = "";
            for (const uri of listUriCharacter) {
                fetch(uri).then((resp) => {
                    return resp.json()
                }).then((resp2) => {
                    reponse.push(resp2);
                    divEp.nextElementSibling.innerHTML +=
                        `<div class="character">
            <img src="${resp2.image}" alt="${resp2.name}">
            <div class="characters_content">
                <h2>${resp2.name}</h2>
                <div class="details">${resp2.gender}</div>
                <div class="details">${resp2.species}</div>
                <div class="details">${resp2.type}</div>
               <div/> 
            </div>  `
                })
            }
        }

        // function toggle pour afficher/retirer 
        function toggleClass(elem, className) {
            elem.classList.toggle(className);
        }



    })

    .catch(function(error) {
        console.error(error);
    })
}