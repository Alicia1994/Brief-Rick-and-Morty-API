window.onload = loadPosts;

function loadPosts() {
    Promise.all([
        fetch('https://rickandmortyapi.com/api/episode?page=1'),
        fetch('https://rickandmortyapi.com/api/episode?page=2'),
        fetch('https://rickandmortyapi.com/api/episode?page=3')
    ]).then(function(responses) {
        return Promise.all(responses.map(function(response) {
            return response.json();
        }));
    }).then(function(data) {
        let output = ``;
        data.[0].results.forEach(function(post) {
            output += `
                    <div class="saison" id="saison_01">
                        <div class="saison-details" id="saison_01-episodes">${post.episode} -` + ` ${post.name}</div>
                        <div class="saison-characters">photo, nom, genre, espèce, type</div>
                    </div>
                    `;
        });
        data.[1].results.forEach(function(post) {
            output += `
                    <div class="saison" id="saison_02">
                        <div class="saison-details" id="saison_02-episodes">${post.episode} -` + ` ${post.name}</div>
                    </div>
                    `;
        });
        data.[2].results.forEach(function(post) {
            output += `
                    <div class="saison" id="saison_03">
                        <div class="saison-details" id="saison_03-episodes">${post.episode} -` + ` ${post.name}</div>
                    </div>
                    `;
        });
        document.querySelector('#container_episodes').innerHTML = output;
        console.log(data);
    }).catch(function(error) {
        console.log(error);
    });
}

// <div>${post.characters.join('\r')}</div>
// <div>${post.air_date}</div>