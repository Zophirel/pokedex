var add_to_pokedex_elem = document.getElementById("add_to_pokedex");
var pokedex_elem = document.getElementById("pokedex");
var pokemon_in_pokedex = [];

remove_from_pokedex = (pokemon_name) => {
    pokemon_to_remove = pokemon_in_pokedex.find((elem) => elem.name == pokemon_name.toLowerCase());
    if(pokemon_to_remove != undefined){  
        for(i = 0; i < pokedex_elem.children.length; i++){
            if(pokedex_elem.children[i].id.toLowerCase() == pokemon_to_remove.name){
                console.log("removing child");
                console.log(pokedex_elem);
                pokedex_elem.removeChild(pokedex_elem.children[i]);
            }
        } 
    }
}

add_to_pokedex = (pokemon) => {
    
    console.log("adding to pokedex");
    console.log(pokemon);
    
    let isPokemonInPokedex = pokemon_in_pokedex.find((element) => element.name ==  pokemon.name) != undefined;
    
    console.log(isPokemonInPokedex);
    if(!isPokemonInPokedex){
        let name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

        pokemon_name_text = document.createElement("h3");
        pokemon_name_text.innerHTML = name;
        
        let img = document.createElement("img");
        img.src = document.getElementById("imgctn").firstChild.src;
        img.id = "pokedex_pokemon_img";
        
        let show_btn = document.createElement("button");
        
        show_btn.innerHTML = "mostra";
        show_btn.addEventListener("click", () => {
            console.log("remove1");
            fill_layout(pokemon);
        });

        let remove_btn = document.createElement("button");

        remove_btn.addEventListener("click", () => {
            remove_from_pokedex(name);
            pokemon_in_pokedex = pokemon_in_pokedex.filter((element) => element.name != pokemon.name)
        });
        
        remove_btn.innerHTML = "elimina";
        remove_btn.className = "button-outline";

        let column = document.createElement("div");
        column.className = "column";

        let container = document.createElement("div");
        container.id = name;
        container.className = "pokedex_pokemon";
        container.appendChild(pokemon_name_text);
        container.appendChild(img);
        container.appendChild(show_btn);
        container.appendChild(remove_btn);

        pokedex_elem.appendChild(container);
        pokemon_in_pokedex.push({name : pokemon.name, data : pokemon, elem: container});
        
        console.log(pokedex_elem);
    }
}



