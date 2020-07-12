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
        const recordeButton = document.getElementById('recorde-button');
        recordeButton.onclick = () => {
            recorde()
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


// audio record and draw

let mic, recorder, soundFile;


let state = 0; // mousePress will increment from Record, to Stop, to Play

function setup() {

    var myCanvas = createCanvas(400, 400);
    myCanvas.parent("canvas")

    // create an audio in
    mic = new p5.AudioIn();

    // users must manually enable their browser microphone for recording to work properly!
    mic.start();

    // create a sound recorder
    recorder = new p5.SoundRecorder();

    // connect the mic to the recorder
    recorder.setInput(mic);

    // create an empty sound file that we will use to playback the recording
    soundFile = new p5.SoundFile();
}

function draw() {

    clear()
    let vol = mic.getLevel()
    noStroke()
    fill(255, 0, 0)
    ellipse(width / 2, height / 2, vol * 10000, vol * 10000)
}

function mousePressed() {
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume();
    }
}

function recorde() {
    console.log('recorde')
        // use the '.enabled' boolean to make sure user enabled the mic (otherwise we'd record silence)
    if (state === 0 && mic.enabled) {

        recorder.record(soundFile);
        document.getElementById('recorde-button').textContent = 'Recording now! Click to stop.'
        document.getElementById('recorde-button').style = 'background-color: red;'

        state++;
    } else if (state === 1) {
        recorder.stop(); // stop recorder, and send the result to soundFile

        // background(0, 255, 0);
        document.getElementById('recorde-button').textContent = 'Recording stopped. Click to play '
        document.getElementById('recorde-button').style = 'background-color: green;'

        state++;
    } else if (state === 2) {
        soundFile.play(); // play the result!

        document.getElementById('recorde-button').textContent = 'Click to new recording '
            // saveSound(soundFile, 'mySound.wav'); // save file
        state = 0;
    }
}