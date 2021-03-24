fetch("https://rickandmortyapi.com/api/character") 
.then(function(charactereAPI) {
    console.log(`Juste après réception de ma réponse : `, charactereAPI);
    // console.log(`Je traduis ma réponse :`, responseAPI.json());
    return charactereAPI.json(); // Ici je retourne l'objet reponse formater en JSON
  })
  .then(function(charactereEnJson) {
    console.log('Reponse en JSON : ', charactereEnJson);
    console.log('Contenu de l\'attribut Data de l\'objet reponseEnJson: ', charactereEnJson.data);
    let personnage=charactereEnJson.data
  
  for (let cpt = 0; cpt < personnage; cpt++) {
    addNewCard(personnage[cpt]);
    console.log(personnage)
  }
  
  
  })
  .catch(function(error) {
    console.error(error);
  })

  function addNewCard(user) {
    const mainContainer = document.querySelector("#container");
    mainContainer.innerHTML += 
    `<div class="personnage">
    <span>user.nom</span>
    <span>user.status espèce</span
    <span>user.type</span>
    <span> user.genre</span>
    <span>user. planète d'origine</span>
    <span> user.dernier lieux de positionnement connu</span>
    <span>  user. les épisodes dans le(s)quel(s) le personnage apparait</span>
    </div>`
  }
  

