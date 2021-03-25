fetch('https://rickandmortyapi.com/api/location')
.then(function(res) {
  return res.json();
})
.then(function(data) {
    let tableauLocation = data.results;

    for (let index = 0; index < tableauLocation.length; index++) {
       let location = tableauLocation[index];

        const container_lieux = document.querySelector("#container_lieux");
        container_lieux.innerHTML += 
        `<div class="card">
            <div class="card__text-container">
                <div class="card__text-name">
                    <span>${location.name}</span>
                </div>
                <div class="card__text-others">
                    <ul>
                    <li><span>${location.dimension}</span></li>
                    <li><span>${location.type}</span></li>
                    //<li><span>${location.residents.join('\r')}</span></li>
                    <ul>
                </div>
            </div>
         </div>`
        }
        
        let cardName = document.querySelectorAll(".card__text-name");

        for (let i = 0; i < cardName.length; i++) {   
            cardName[i].addEventListener("click", function () {
                let deroulant = this.nextElementSibling;
                if (deroulant.style.display === "block") {
                    deroulant.style.display = "none";
                } else {
                    deroulant.style.display="block";
                }
            })
        }
      
})
.catch(function(error) {
  console.error(error);
})





   // let output = ’’;
    // res.results.forEach(function(post){
    //     output += ’’;

    // });
    // document.querySelector("#container_lieux").innerHTML = output



    // JS POUR DEROULER LES DETAILS

    

    // cardName.addEventListener("click", event => {
    //     console.log(event);
    // })


