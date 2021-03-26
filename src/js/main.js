window.onload = LoadLocation;

function LoadLocation () {

    Promise.all([

fetch('https://rickandmortyapi.com/api/location?page=1'),
fetch('https://rickandmortyapi.com/api/location?page=2'),
fetch('https://rickandmortyapi.com/api/location?page=3'),
fetch('https://rickandmortyapi.com/api/location?page=4'),
fetch('https://rickandmortyapi.com/api/location?page=5'),
fetch('https://rickandmortyapi.com/api/location?page=6'),

// tout stocker dans le local storage puis manipulation de l'objet

])

.then(function(res) {
    return Promise.all(res.map(function(res) {
  return res.json();
    }))
})
.then(function(data) {

    for (let i = 0 ; i < data.length ; i++) {
        // tableauLocation = tableau d'objets avec toutes mes data
        let tableauLocation = data[i].results;
        
        // FAIRE DES BOUTONS RADIO POUR INSERER DANS PLANET


        
        
            // je déclare un  tableau pour y insérer mes données filtrés par type
            let arrayResult = tableauLocation.filter(function(typeData){  
            // METTRE UNE CONDITION ??
                    return typeData.type == "Cluster";
                }
            )

                // let radioGroup = document.getElementsByName("type_planete");
                // let cluster = docum'#cluster');ent.querySelector(
                
                // if (radioGroup[1].checked) {
                // // ajouter une condition pour le type

                // return typeData.type == "Cluster";
                
                // } else if (document.querySelector('#planet').checked){
                //     return typeData.type == "Planet";
                // }
                    

                
                




                // je boucle sur le tableau filtré
        for (let index = 0; index < arrayResult.length; index++) {
            
            
         
            //let location = tableauLocation[index];
            let location = arrayResult[index];
            

            const container_lieux = document.querySelector("#container_lieux");
            container_lieux.innerHTML += 
            `<div class="card">
                <div class="card__text-container">
                    <div class="card__text-name">
                        <span> Name : ${location.name}</span>
                    </div>
                    <div class="card__text-others">
                        <ul>
                        <li><span>Dimension : ${location.dimension}</span></li>
                        <li><span>Type : ${location.type}</span></li>
                        <li><span>Residents : ${location.residents.join('\r')}</span></li>
                        <ul>
                    </div>
                    <div id="container_residents> </div>
                </div>
             </div>`
            }
            // attraper les character
            // ${location.residents.join('\r')}

// tableau.location = un URI par résident 
// boucler sur ce tableau
// let arrayResidents = location.residents
// for (let ind = 0; ind < arrayResidents.length ; ind ++) {
// 
//}
//
}

// BOUCLE POUR DEROULER 

    let cardName = document.querySelectorAll(".card__text-name");
    for (let i = 0; i < cardName.length; i++) {   

// mettre une autre boucle for où on a va boucler sur le fetch pour le tableau character

        cardName[i].addEventListener("click", function (event) {

            // boucle pour mettre dans un tableau tout mes URI de character

            // let arrayData = new Array();
            // for (let n = 1; n <= 671 ; n++){
            // let characterData =  `fetch("https://rickandmortyapi.com/api/character/${n}"`;
            // arrayData.push(characterData);
            // return arrayData;
            // }

            //fetch(tableau[i]).then() 

            // arrayData[i]
            
            let clickScroll = this.nextElementSibling;
            if (clickScroll.style.display === "block") {
                clickScroll.style.display = "none";
            } else {
                clickScroll.style.display="block";
            }
        })
    }
})

.catch(function(error) {
  console.error(error);
})
}


  
    // ])
    
    // .then(function(res) {
    //     return Promise.all(res.map(function(res) {
    //   return res.json();
    //     }))
    // })
    // .then(function(data) {
    
    // }    
    // .catch(function(error) {
    //   console.error(error);
    // })
    // }







