let results_header = document.getElementById("results_header");
let info_element = document.getElementById("info");
let sprite_element = document.getElementById("imgctn");
let stats_element = document.getElementById("stats");

set_header = (name) => {
    title = document.createElement("h2");
    name = name.charAt(0).toUpperCase() + name.slice(1);
    title.innerHTML = `Ecco i tuoi risultati per [${name}]`;
    results_header.appendChild(title);
}

set_info = (name, height, weight) => { 
    
    let nameElement = document.createElement("p");
    let weightElement = document.createElement("p");
    let heightElement = document.createElement("p");
    
    name = name.charAt(0).toUpperCase() + name.slice(1);
    nameElement.innerHTML = `Nome: ${name}`;
    weightElement.innerHTML = `Peso: ${weight / 10} kg`;
    heightElement.innerHTML = `Altezza: ${height / 10} m`;
    
    let info = info_element.children;

    info[0].appendChild(nameElement);
    info[1].appendChild(weightElement);
    info[2].appendChild(heightElement);
}

set_sprite = (sprite) => {
    img = document.createElement("img");
    img.src = sprite;
    sprite_element.appendChild(img);
}

set_stats = (stats) => {
    var text = document.createElement("h3");
    text.innerHTML = "Statistiche";
    stats_element.appendChild(text);

    for(i = 0; i < stats.length; i++){
        let statElement = document.createElement("h4");
        let statName = stats[i].stat["name"];
        statName = statName.charAt(0).toUpperCase() + statName.slice(1);
        statElement.innerHTML = statName;
        statElement.style.fontWeight = "bold";

        let statValue = document.createElement("progress");
        statValue.value = stats[i].base_stat / 100;
        
        stats_element.appendChild
        stats_element.appendChild(statElement);
        stats_element.appendChild(statValue);
    }
}


set_sprite_btn = (default_sprite, shiny_sprite) => {
    let default_sprite_btn = document.getElementById("default-sprite");
    let shiny_sprite_btn = document.getElementById("shiny-sprite");

    default_sprite_btn.addEventListener("click", () => {
        sprite_element.removeChild(sprite_element.firstChild);
        let img = document.createElement("img");
        img.src = default_sprite;
        sprite_element.append(img);
    });

    shiny_sprite_btn.addEventListener("click", () => {
        sprite_element.removeChild(sprite_element.firstChild);
        let img = document.createElement("img");
        img.src = shiny_sprite;
        sprite_element.append(img);
    });
}


fill_layout = (pokemon) => {
    
    if(results_header.children.length > 0){
        console.log("reset");
        reset_layout();
    }

    set_header(pokemon.name);
    set_info(pokemon.name, pokemon.height, pokemon.weight);
    set_sprite(pokemon.sprites.front_default);
    set_sprite_btn(pokemon.sprites.front_default, pokemon.sprites.front_shiny);
    set_stats(pokemon.stats);
    
    
}



reset_layout = () => {
    results_header.removeChild(results_header.children[0]);
    
    for(i = 0; i < info_element.children.length; i++){
        info_element.children[i].removeChild(info_element.children[i].firstChild);  
    }

    while (stats_element.firstChild) {
        stats_element.removeChild(stats_element.firstChild);
    }

    sprite_element.removeChild(sprite_element.children[0]);
   
}

