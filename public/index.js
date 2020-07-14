let mic, recorder, soundFile, soundBlob, base64String

let data, options

let state = 0

let reader = new FileReader();


function setup() {

    // listen record button
    const recordeButton = document.getElementById('record-button')
    recordeButton.onclick = () => {
        recorde()
    }

    // create canvas 
    if (windowWidth < 800) {
        var myCanvas = createCanvas(windowWidth / 2, windowHeight / 2)
    } else {
        var myCanvas = createCanvas(windowWidth / 3, windowHeight / 3)
    }
    myCanvas.parent("canvas")

    // create an audio in
    mic = new p5.AudioIn()

    // users must manually enable their browser microphone for recording to work properly!
    mic.start()

    // create a sound recorder
    recorder = new p5.SoundRecorder()

    // connect the mic to the recorder
    recorder.setInput(mic)

    // create an empty sound file that we will use to playback the recording
    soundFile = new p5.SoundFile()
}

function draw() {
    background(255, 20)

    let vol = mic.getLevel()

    noStroke()
    fill(random(255), random(255), random(255))
    ellipse(width / 2, height / 2, vol * 20000, vol * 20000)
}



function recorde() {
    if (state === 0 && mic.enabled) {

        recorder.record(soundFile)

        document.getElementById('record-button').textContent = 'Recording now! Click to stop.'
        document.getElementById('record-button').style = 'background-color: red'

        document.getElementById('done').textContent = ''

        state++

    } else if (state === 1) {

        recorder.stop()

        document.getElementById('record-button').textContent = 'Recording stopped. Click to play '
        document.getElementById('record-button').style = 'background-color: green'

        state++

    } else if (state === 2) {

        soundFile.play()

        document.getElementById('record-button').textContent = 'Click to new recording '

        document.getElementById('coordinates').style = 'visibility: visible'
        document.getElementById('wait').textContent = 'Acquiring coordinates...'

        reader.readAsDataURL(soundFile.getBlob());
        reader.onloadend = function() {
            base64String = reader.result;
            console.log(base64String);
            postData()
        }

        state = 0
    }
}


function postData() {

    if ("geolocation" in navigator) {
        console.log('geolocation is available')
        navigator.geolocation.getCurrentPosition((position) => {

            const lat = position.coords.latitude
            const lon = position.coords.longitude

            document.getElementById('latitude').textContent = lat.toFixed(2)
            document.getElementById('longitude').textContent = lon.toFixed(2)

            console.log('Your latitude is :' + lat + '°')
            console.log('Your longitude is: ' + lon + '°')

            document.getElementById('checkin-button').style = 'visibility: visible'

            data = {
                lat,
                lon,
                base64String
            }
            options = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            }


            const checkInButton = document.getElementById('checkin-button')
            checkInButton.onclick = function checkIn() {
                console.log('posting...')
                document.getElementById('done').textContent = 'posting...'
                fetch('/post', options).then(res => {
                    console.log(data)

                    document.getElementById('done').textContent = 'done'
                })
            }

        })
    } else {
        alert("I'm sorry, but geolocation services are not supported by your browser.")
    }

}

function windowResized() {
    if (windowWidth < 800) {
        resizeCanvas(windowWidth / 2, windowHeight / 2)
    } else {
        resizeCanvas(windowWidth / 3, windowHeight / 3)
    }
}


function mousePressed() {
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume()
    }
}