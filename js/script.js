			
// POKEMONS
// Global variables
let myChart;
let myChart1;
let dades;
let arrayPokemons = [];
let labelsTypes = [];
let dataTypes = [];
let backgroundColor = [];
let latestList = [];

// Reading json and convert to array
fetch("js/data/pokemon.json")
.then((response) => response.json())
.then((data) => {
	dades = data.pokemon;		
	
	dades.forEach(e => {
		let pokemon = {num: e.num, name: e.name, img: e.img, weight: e.weight, type: e.type};
		arrayPokemons.push(pokemon);	
	})

	createList(arrayPokemons);
});

// This function refresh page
function refreshPage(){
    window.location.reload();
} 

// This function sorts the pokeList in ascendent or descendent order
function orderList(order){
	if(order=="asc"){
		latestList.sort(function(a,b) {
			return a.name > b.name ? 1 : -1;
		});
	}
	
	if(order=="des"){
		latestList.sort(function(a, b) {
			return a.name < b.name ? 1 : -1;
		});
	}
	createList(latestList);
}

// This function search pokemon by value entered
function searchList(){
	let inputSearch = document.getElementById('txtSearch')
	console.log(inputSearch.value);
	let resultats = arrayPokemons.filter(pokemon =>{
		return pokemon.name.toLowerCase().includes(inputSearch.value.trim().toLowerCase());
	});
	latestList == resultats;
	createList(resultats);
}

// This function calculate the midium weight
function calcMitjana(list){
	let countkg = 0;

	list.forEach(pokemon => {
		countkg += parseFloat(pokemon.weight.substring(0, pokemon.weight.indexOf(' ')));
	})

	document.getElementById("avarageKG").innerHTML = "Avarage weight: " + (countkg/list.length).toFixed(2) + " kg";
}

// This function create the list in index.html
function createList(list) {
	deleteList();
	calcMitjana(list)
	
	latestList = list;

	var pokeTabla = document.createElement("tbody");
	var headTabla = document.createElement("thead");

	list.forEach(pokemon => {printPokeList(pokemon, pokeTabla, headTabla)});
	document.getElementById("resultat").appendChild(pokeTabla);
}

function printPokeList(pokemon, pokeTabla) {
	var newLine = pokeTabla.insertRow();
	
	let numCell = newLine.insertCell();
	let nameCell = newLine.insertCell();
	let imgCell = newLine.insertCell();
	let weightCell = newLine.insertCell();

	let num = document.createElement("p");
	let name = document.createElement("p");
	let img = document.createElement("img");
	let weight = document.createElement("p");

	num.innerHTML = pokemon.num;
	name.innerHTML = pokemon.name;
	img.src = pokemon.img;
	weight.innerHTML = pokemon.weight;

	numCell.appendChild(num);
	nameCell.appendChild(name);
	imgCell.appendChild(img);
	weightCell.appendChild(weight);

}

// This function delete the list in index.html
function deleteList(){
	if(document.getElementById("resultat").firstChild) {
		document.getElementById("resultat").firstChild.remove();

	}
}

// This function create the graphic in index.html with Chart Library
function showStats(){
	let grafic = document.getElementById("myChart");
	if(grafic.style.display="none" && !myChart) {
		grafic.style.display="";
		latestList.forEach(pokemon => {
			backgroundColor.push(random_rgb());
			pokemon.type.forEach(type=>{
				if(!labelsTypes.includes(type)){
					labelsTypes.push(type);
					dataTypes.push(0);
				}
				let index = labelsTypes.indexOf(type);
				dataTypes[index]++;
			})
		})

		const dataChart = {
			labels: labelsTypes,
			datasets: [{
			label: 'My First Dataset',
			data: dataTypes,
			backgroundColor: backgroundColor
			}]
		};

		const config = {
		type: 'polarArea',
		data: dataChart,
		options: {}
		};

		myChart = new Chart(
			document.getElementById('myChart'),
			config
		);
	}else{
		myChart.destroy();
		grafic.style.display="none";
		myChart = myChart1;
		backgroundColor = [];
		labelsTypes = [];
		dataTypes = [];
	}
	
}

// This function create a random rgb color
function random_rgb() {
    var o = Math.round, r = Math.random, s = 255;
    let color = 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
	return color;
}


/*
// MUNICIPIS
fetch("js/data/municipis.json")
.then((response) => response.json())
.then((data) => {
	dades = data.elements;		
	
	console.log(dades)
	console.log(dades[0].municipi_nom)
});

/*

// METEORITS
fetch("js/data/earthMeteorites.json")
.then((response) => response.json())
.then((data) => {
	dades = data;		
	
	console.log(dades)
	console.log(dades[0].name)
});


// MOVIES
fetch("js/data/movies.json")
.then((response) => response.json())
.then((data) => {
	dades = data.movies;		
	
	console.log(dades)
	console.log(dades[0].title)
});

*/