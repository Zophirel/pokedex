let search_bar = document.getElementById("search_bar");
let result_box = document.getElementById("result_box")
let selected_pokemon_url = null;
let is_add_to_pokedex_set = false;
//initialize the app retreiving the name of all the pokemons
const init_data = (async ()  => {
    if(localStorage.getItem("pokemon_names") == null){
        const options = {
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        }
        response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025", options);
        let jsonResponse = await response.json();
        console.log(jsonResponse);
        let pokemon_names = jsonResponse.results;
        pokemon_names.sort((a,b) => a.name.localeCompare(b.name));
        console.log(pokemon_names);
        localStorage.setItem("pokemon_names", JSON.stringify(pokemon_names));
        console.log("Data Stored!");
    }
})();

//search functionality
search_bar.addEventListener("input", () => {
    //check if input is empty
    if(search_bar.value == null || search_bar.value == ""){
        result_box.style.display = "none";
    }else{
        //get the list of pokemon names obtained from the initialization
        let pokemon = JSON.parse(localStorage.getItem("pokemon_names"));
        
        //avoid mismatch with capital letters
        let filter = search_bar.value.toLowerCase();
        
        //ul to show results 
        let ul = document.getElementById("results");
        //reset it everytime the user input a new character
        ul.innerHTML = "";
        
        //check matches for each element inside the pokemon list
        for (i = 0; i < pokemon.length; i++) {
            textValue = pokemon[i].name;
            if (textValue.toLowerCase().indexOf(filter) > -1) {
                
                //show only the first 10 results avoiding too much different results
                if(ul.childNodes.length < 10){
                    let li = document.createElement("li");
                    let url = pokemon[i].url;
                    li.textContent = pokemon[i].name;
                    
                    li.addEventListener("click", () => {
                            //complete the pokemon name by clicking on the correct tile
                            search_bar.value = li.textContent;
                            result_box.style.display = "none";
                            selected_pokemon_url = url;
                        }
                    );
                    ul.appendChild(li);
                }
            }
        }
        result_box.style.display = ul.childNodes.length > 0 ? "unset" : "";
    }
});

document.getElementById("search_btn").addEventListener("click", async () => {
    if(selected_pokemon_url != null){
        const options = {
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        }

        response = await fetch(selected_pokemon_url, options);
        jsonResponse = await response.json();
        console.log(jsonResponse);
        fill_layout(jsonResponse);
        let main = document.getElementsByTagName("main");
        let footer = document.getElementsByTagName("footer");
        console.log(main);
        main[0].style.display = "unset";
        footer[0].style.display = "block";
        if(is_add_to_pokedex_set == false){
            add_to_pokedex_elem.addEventListener("click", () => {add_to_pokedex(jsonResponse);});
            is_add_to_pokedex_set = true;
        }else{
            add_to_pokedex_elem.removeEventListener("click", () => {add_to_pokedex(jsonResponse);});
        }
    }
});