fetch('https://rickandmortyapi.com/api/location')
.then(function(res) {
  return res.json();
})
.then(function(data) {
    let tableauLocation = data.results;
    console.log(tableauLocation);

    for (let index = 0; index < tableauLocation.length; index++) {
       let location = tableauLocation[index];
         console.log(location);

        const container_lieux = document.querySelector("#container_lieux");
        console.log(container_lieux);
        container_lieux.innerHTML += 
        `<div class="container_lieux">
         <div class="card">
         <div class="card__text-container">
         <span>${location.name}</span>
         <span>${location.dimension}</span>
         <span>${location.type}</span>
         </div>
         </div>
         </div>`
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


