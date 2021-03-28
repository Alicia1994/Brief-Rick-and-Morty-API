// let urls = ["https://rickandmortyapi.com/api/character", "https://rickandmortyapi.com/api/character/?page=2", "https://rickandmortyapi.com/api/character/?page=3"];
// for (let index = 0; index < urls.length; index++) {
//     const url = urls[index];
// }
// Promise.all(urls.map(url => fetch(url)))
//     .then(resp => Promise.all(resp.map(r => r.json())))

window.onload = LoadLocation;

const container_lieux = document.querySelector("#container_lieux");

function LoadLocation() {

    let urls = ['https://rickandmortyapi.com/api/location?page=1', 'https://rickandmortyapi.com/api/location?page=2', 'https://rickandmortyapi.com/api/location?page=3', 'https://rickandmortyapi.com/api/location?page=4', 'https://rickandmortyapi.com/api/location?page=5', 'https://rickandmortyapi.com/api/location?page=6']
    for (let index = 0; index < urls.length; index++) {
        const url = urls[index];
    }
    Promise.all(urls.map(url => fetch(url)))
        .then(resp => Promise.all(resp.map(r => r.json())))

        .then(function (data) {

            let tabData = data[0].results.concat(data[1].results, data[2].results, data[3].results, data[4].results, data[5].results);

            tabData.forEach(location => {
                container_lieux.innerHTML +=
                `<div class="card">
                <div class="card__text-container">
                    <div class="location-name" data-url="${location.url}"  id="location-${location.id}">
                        Name : ${location.name}
                        <ul class="location_details">
                            <li>Dimension : ${location.dimension}</li>
                            <li>Type : ${location.type}</li>              
                        </ul>
                    </div>
                    
                    <div class="character_details">   
                </div>   
                </div>`

                    let divLocation = document.querySelectorAll(".location-name");
                    divLocation.forEach(locationName => {
                       
                        locationName.addEventListener("click", (event) => {
                            fetch(event.target.dataset.url).then((resp) => {
                              
                                return resp.json()
                            }).then((location) => {
                           
                                getCharacterDetails(location.residents, event.target);
                            })

                            let clickScroll_details = event.target.querySelector(".location_details");

                            let clickScroll_character = event.target.nextElementSibling;
                            //let clickScroll_details = event.target.childNodes;

                            toggleClass(clickScroll_character, "character_details");
                            toggleClass(clickScroll_details, "location_details");
                        })
                    });
            });


            let typesRadio = document.querySelectorAll("input[type=radio]");

            for (let ind = 0; ind < typesRadio.length; ind++) {
                   
                typesRadio[ind].addEventListener("change", (event) => {
                    //console.log(tabData);

                        let newTabData;
                     if(event.target.value != "all"){
                        newTabData = tabData.filter(data => data.type == `${event.target.id}`);
                                            
                        } else {
                           newTabData = tabData;
                     }
        
                    //console.log(newTabData);

                    container_lieux.innerHTML = "";
                    newTabData.forEach(location => {
                        
                        container_lieux.innerHTML +=
                            `<div class="card">
                            <div class="card__text-container">
                                <div class="location-name" data-url="${location.url}"  id="location-${location.id}">
                                    Name : ${location.name}
                                    <ul class="location_details">
                                        <li>Dimension : ${location.dimension}</li>
                                        <li>Type : ${location.type}</li>              
                                    </ul>
                                </div>
                                
                                <div class="character_details">   
                            </div>   
                            </div>`

                            document.querySelectorAll(".location-name").forEach((title, index) => {
                                
                                title.addEventListener("click", (event)=> {
                                    //console.log(event);
    
                                        let listUriCharacter = newTabData[index].residents;
                                        console.log(listUriCharacter);
                                        
                                        fetch(event.target.dataset.url).then((resp) => {
                                            //console.log(uri)
                                            return resp.json()
                                        }).then((location) => {
                                           // console.log(location);
                                           
                                            //getCharacterDetails(location.residents, event.target);
                                        })
                                    
                                        let clickScroll_details = event.target.querySelector(".location_details");
                                        
                                        //console.log(event);
    
                                        let clickScroll_character = event.target.parentNode.querySelector(".character_details");
                                        
            

                                        console.log(clickScroll_character, clickScroll_details)
                                        toggleClass(clickScroll_character, "character_details");
                                        toggleClass(clickScroll_details, "location_details");
    
                                        getCharacterDetails(listUriCharacter, event.target);
                                  
                                    //console.log(event)
                                })

                            });                            

                    });
                })
            }
        })

        .catch(function (error) {
            console.error(error);
        })
}

function getCharacterDetails(listUriCharacter, divEp) {
    let reponse = [];
    divEp.nextElementSibling.innerHTML = "";
    //console.log(divEp);
    for (const uri of listUriCharacter) {
        fetch(uri).then((resp) => {
            //console.log(uri)
            return resp.json()
        }).then((resp2) => {
            //console.log(resp2.id)
            reponse.push(resp2);
            divEp.nextElementSibling.innerHTML += `<span> ${resp2.name} </span>`
        })
    }
}


function toggleClass(elem, className) {
    elem.classList.toggle(className);
}








