document.addEventListener("DOMContentLoaded", () => {
    // for (mountain of mountainsArray) {
    //     const name = mountain.name;
    //     const o = option(name)
    //     mountainList.appendChild(o);
    // }
    mountainsArray.forEach(m => mountainList.appendChild(option(m.name)));
    mountainList.addEventListener("change", async e => {
        const mountain = mountainsArray[mountainList.selectedIndex - 1];
        mountainImage.src="./images/"+mountain.img
        mountainName.innerText=mountain.name
        mountainResults.innerHTML = `
            <br>
            
            <table>
                <tr><th> Elevation:</th><td> ${mountain.elevation} feet                    </td></tr>
                <tr><th> Effort:   </th><td> ${mountain.effort}                            </td></tr>
                <tr><th> Lattitude:</th><td> ${mountain.coords.lng}                        </td></tr>
                <tr><th> Longitude:</th><td> ${mountain.coords.lat}, ${mountain.coords.lng}</td></tr>
            </table>
            <p> ${mountain.desc} </p>
        `;
        // function that can "fetch" the sunrise/sunset times
        async function getSunsetForMountain(lat, lng) {
            let response = await fetch(
                `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`
            );
            let data = await response.json();
            return data;
        }
        //     "results": { "sunrise":"5:18:00 AM", "sunset":"6:43:52 PM",
        const sunData = await getSunsetForMountain(mountain.coords.lat, mountain.coords.lng);
        // += TO APPEND
        mountainResults.innerHTML += `
            <div> Sunrise: ${sunData.results.sunrise} </div>
            <div> Sunset: ${sunData.results.sunset} </div>
        `;
    });//end change
});//end loaded