window.onload = loadEpisodes;

function loadEpisodes() {
    Promise.all([
        fetch('https://rickandmortyapi.com/api/episode?page=1'),
        fetch('https://rickandmortyapi.com/api/episode?page=2'),
        fetch('https://rickandmortyapi.com/api/episode?page=3'),
        fetch('https://rickandmortyapi.com/api/character')
    ]).then(function(responses) {
        return Promise.all(responses.map(function(response) {
            return response.json();
        }));
    }).then(function(data) {
        let output = ``;
        data[0].results.forEach(function(post) {
            output += `
                    <div class="container_saison" id="saison_01">
                        <div class="saison_details" id="saison_01-episodes">
                            <span>${post.episode} -` + ` ${post.name}</span>
                        </div>
                        <div id="container_episodes-details"></div>
                    </div>
                    `;
        });
        data[1].results.forEach(function(post) {
            output += `
                    <div class="container_saison" id="saison_02">
                        <div class="saison_details" id="saison_02-episodes">
                            <span>${post.episode} -` + ` ${post.name}</span>
                        </div>
                        <div id="container_episodes-details"></div>
                    </div>
                    `;
        });
        data[2].results.forEach(function(post) {
            output += `
                    <div class="container_saison" id="saison_03">
                        <div class="saison_details" id="saison_03-episodes">
                            <span>${post.episode} -` + ` ${post.name}</span>
                        </div>
                        <div id="container_episodes-details"></div>
                    </div>
                    `;
        });
        data[3].results.forEach(function(post) {
            console.log(post.count);
            output += `
                    <div class="saison_details-characters">
                        <ul>
                            <li>photo</li>
                            <li>nom</li>
                            <li>genre</li>
                            <li>espèce</li>
                            <li>type</li>
                        <ul>
                    </div>
                    `;
        });

        document.querySelector('#container_episodes').innerHTML = output;
        let saisonDetails = document.querySelectorAll(".saison_details");

        for (let i = 0; i < saisonDetails.length; i++) {
            saisonDetails[i].addEventListener("click", function(event) {
                let divChars = event.target.querySelector('#container-character');
                for (let j = 0; j < array.length; j++) {
                    const element = array[j];

                }
                //boucle for avec tes fetch en série
                // let tableau = [] contient URI personnages
                //fetch(tableau[i]).then() 

                let scroll_action = this.nextElementSibling;
                if (scroll_action.style.display === "block") {
                    scroll_action.style.display = "none";
                } else {
                    scroll_action.style.display = "block";
                }
            })
        }
        let arrayChars = ["https://rickandmortyapi.com/api/character/?page=2", "https://rickandmortyapi.com/api/character/?page=2", "https://rickandmortyapi.com/api/character/?page=3", "https://rickandmortyapi.com/api/character/?page=4", "https://rickandmortyapi.com/api/character/?page=5", "https://rickandmortyapi.com/api/character/?page=6", "https://rickandmortyapi.com/api/character/?page=7"]
        console.log(arrayChars);
        console.log(data);
    }).catch(function(error) {
        console.log(error);
    });
}

// <div>${post.characters.join('\r')}</div>
// <div>${post.air_date}</div>
{
    /* <div class="saison_details-characters">
    <ul>
        <li>photo</li>
        <li>nom</li>
        <li>genre</li>
        <li>espèce</li>
        <li>type</li>
    <ul>
    </div> */
}