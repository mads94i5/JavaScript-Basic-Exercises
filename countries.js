document.getElementById("svg2").onclick = getDetails

function getDetails(event) {
    const URL = "https://countries.plaul.dk/api/countries/"
    const target = event.target
    const id = target.id
    fetch(URL+id)
    .then(res => {
        if (!res.ok) {
            return Promise.reject(res.status + " - No country found.")
        }
        return res.json()
    })
    .then(data => {
        document.getElementById("flag").src = data.flag
        document.getElementById("name").innerText = data.name.common
        document.getElementById("un-member").innerText = data.unMember
        const currencyCodes = Object.keys(data.currencies) 
        const currencyObject = data.currencies[currencyCodes[0]] 
        document.getElementById("currencies").innerText = currencyObject.name
        document.getElementById("capital").innerText = data.capital
        document.getElementById("borders").innerText = data.borders
    })
}