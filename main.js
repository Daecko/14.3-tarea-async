//Input
const codename = document.getElementById("codename");
const switchBtn = document.getElementById("input-switch")
const btn = document.getElementById("submit-btn");

//Output
const displayCoords = document.getElementById("c-coords");
const displayName = document.getElementById("c-name");
const displayMoney = document.getElementById("c-money");

let codenameSwitch = false;
let countryInfo 
switchBtn.addEventListener("click", () => {
    codenameSwitch = !codenameSwitch;
    switchBtn.innerHTML = codenameSwitch ? "Using Code" : "Using Name"
})
btn.addEventListener("click", async () => {
    if(!codenameSwitch){
        await fetch(`https://restcountries.com/v3.1/name/${codename.value}`)
        .then(response=>{
            if(!response.ok){
                throw new Error('Something went wrong')
            }
            return response.json()
        })
        .then(data =>{
            countryInfo = data
            displayCoords.innerHTML = "Coords: "+data[0].latlng
            displayName.innerHTML = "Nombre: "+data[0].name.common
            displayMoney.innerHTML = "Moneda(s):"
            for(e in data[0].currencies){
                displayMoney.innerHTML+=` ${e}`
            }
            console.log(data);
        })
        .catch(error =>{
            console.log('Error: ',error)
            displayCoords.innerHTML = "Input the correct code/name of the country"
        })
    } else {
        fetch(`https://restcountries.com/v3.1/alpha/${codename.value}`)
        .then(response=>{
            if(!response.ok){
                throw new Error('Something went wrong')
            }
            return response.json()
        })
        .then(data =>{
            console.log(data);
        })
        .catch(error =>{
            console.log('Error: ',error)
            displayCoords.innerHTML = "Input the correct code/name of the country"
        })
    }
})