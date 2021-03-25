window.onload = loadPosts;

function loadPosts() {
    let xhr = new XMLHttpRequest();
    let method = "GET";
    let url = `https://rickandmortyapi.com/api/episode`;
    let url2 = `"https://rickandmortyapi.com/api/episode?page=2"`
    xhr.open(method, url);
    xhr.onload = function(event) {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                const response = JSON.parse(this.responseText);
                console.log(response);
                let output = ``;
                response.results.forEach(function(post) {
                    output += `
                        <div>${post.id}</div>
                        <div>${post.name}</div>
                        <div>${post.air_date}</div>
                        <div>${post.episode}</div>
                        <div>${post.characters.join('\r')}</div>
                        <div>${post.url}</div>
                        <div>${post.created}</div>
                    `;
                });
                response.results.forEach(function(post) {
                    output += `
                        <div>${post.id}</div>
                        <div>${post.name}</div>
                        <div>${post.air_date}</div>
                        <div>${post.episode}</div>
                        <div>${post.characters.join('\r')}</div>
                        <div>${post.url}</div>
                        <div>${post.created}</div>
                    `;
                });
                document.querySelector('#container_episodes').innerHTML = output;
            } else {
                console.log(this.status);
                alert('Erreur')
            }
        }
    }
    xhr.send();
}