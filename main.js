function randomIndex() {
    return Math.floor(Math.random() * 256)
}

function displayInfo(info) {
    let country = document.querySelector("#country");
    country.innerText = info.names.name;
    
    let continent = document.querySelector("#continent");
    continent.innerText = info.names.continent;
    
    let language = document.querySelector("#lang");
    let languages = [];
    info.language.forEach((lang) => {
        if (lang.official === "Yes") {
          languages.push(lang.language);
        }
    });
    if (languages.length > 0) {
        language.innerText = languages.join(", ")
    } else {
        language.innerText = "Official language not defined."
    }

    let vaccination = document.querySelector("#vaccination");
    let shots = [];
    info.vaccinations.forEach((vaxx) => shots.push(vaxx.name))
    if (shots.length > 0) {
      vaccination.innerText = shots.join(", ");
    } else {
      vaccination.innerText = "Vaccination not required for travelers.";
    }

    let currency = document.querySelector("#currency")
    currency.innerText = `${info.currency.name}(${info.currency.code})`

    let water = document.querySelector("#water")
    if (info.water.short) {
        water.innerText = `${info.water.short} for drinking.`
    } else {
        water.innerText = "Quality of water not informed."
    }
    
    let electricity = document.querySelector("#electricity");
    electricity.innerText = `Voltage: ${info.electricity.voltage}`;

    let neighbours = document.querySelector("#neighbours")
    let borders = []
    info.neighbors.forEach(country => borders.push(country.name))
    if (borders.length > 0) {
        neighbours.innerText = borders.join(", ")
    } else {
        neighbours.innerText = "There are no neighbours listed."
    }
}

document.querySelector("button").addEventListener("click", () => {
  fetch("https://travelbriefing.org/countries.json")
    .then((res) => res.json())
    .then((data) => {
      fetch("https://travelbriefing.org/" + data[randomIndex()].name + "?format=json")
        .then((response) => response.json())
        .then((info) => displayInfo(info))
        .catch(() => {
          throw "Could not load country info!"
        })
        .catch(() => {
          throw "Could not retrieve a country!"
        })
    })
})