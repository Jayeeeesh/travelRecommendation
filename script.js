
/*function search() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const results = document.getElementById('results');
    results.inert = "";


    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then((data) => {
            const countries = data.countries.find(Item => Item.name.toLowerCase() === searchInput)
            console.log(countries)
            

        })





}*/

function search() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const results = document.getElementById('results');
    results.innerHTML = ""; // Clear previous results

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {

            let matchedPlaces = [];
            if(searchInput.includes('beache')){
                matchedPlaces = data.beaches
            } else if(searchInput.includes('temple')){
                matchedPlaces = data.temples

            } else {
                matchedPlaces = data.countries.filter(country => 
                    country.name.toLowerCase() === searchInput
                ).map(e => e.cities
                ).flat()
            }

            if(matchedPlaces.length > 0){
                matchedPlaces.forEach(element => {
                    console.log(element)
                    const card = document.createElement('div');
                    card.classList.add('result-card')

                    card.innerHTML = `
                
                    <h1>${element.name}</h1>
                    <img src="${element.imageUrl}" alt="">
                    <p>${element.description}</p>
                    `;
                    results.appendChild(card);
                    console.log(card)
                });

            } else {
                results.innerHTML = "<p>No results found for your search.</p>";
            }


            
        })
        .catch(err => {
            console.error("Error fetching data:", err);
            results.innerHTML = "<p>Failed to load results.</p>";
        })
}
// Optional reset function
function resetSearch() {
    document.getElementById('searchInput').value = "";
    document.getElementById('results').innerHTML = "";
}
