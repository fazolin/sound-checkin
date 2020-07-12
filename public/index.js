var mic

function setup() {
    mic = new p5.AudioIn()
}
// geolocation
if ("geolocation" in navigator) {
    console.log('geolocation is available')
    navigator.geolocation.getCurrentPosition((position) => {

        const lat = position.coords.latitude
        const lon = position.coords.longitude

        document.getElementById('latitude').textContent = lat.toFixed(2)
        document.getElementById('longitude').textContent = lon.toFixed(2)

        console.log('Your latitude is: ' + lat + '°')
        console.log('Your longitude is: ' + lon + '°')

        const data = {
            lat,
            lon
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        const checkInButton = document.getElementById('checkin-button');
        checkInButton.onclick = function checkIn() {
            fetch('https://soundcheckin.herokuapp.com' + '/post', options).then(res => {
                console.log(data)
                document.getElementById('done').textContent = 'DONE'
            })
        }

    })
} else {
    alert("I'm sorry, but geolocation services are not supported by your browser.")
}