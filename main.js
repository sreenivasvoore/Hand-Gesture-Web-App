// Link for Teachable: https://teachablemachine.withgoogle.com/models/a3AFNuf3m/

Webcam.set({
    width: 350,
    height: 250,
    image_format: "png",
    png_quality: 90
});

var Camera = document.getElementById("Camera");

Webcam.attach(Camera);

function Capture() {
    Webcam.snap(function (data_uri){
        document.getElementById("Result").innerHTML = '<img id="captured_img" src="'+ data_uri +'">';
    });
}

console.log("ml5 version", ml5.version);
var Classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/a3AFNuf3m/model.json", modelReady);

function modelReady() {
    console.log("Model is Ready!");
}

var prediction_1 = "";
var prediction_2 = "";

function Speak() {
    var Synth = window.speechSynthesis;
    Speak_data_1 = "The First Prediction is: " + prediction_1;
    Speak_data_2 = "And the Second Prediction is: " + prediction_2;
    var Utterance = new SpeechSynthesisUtterance(Speak_data_1 + Speak_data_2);
    Synth.speak(Utterance);
}

function Predict() {
   img = document.getElementById('captured_img');
   Classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        document.getElementById('result_emotion_name_1').innerHTML = results[0].label;
        document.getElementById('result_emotion_name_2').innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        Speak();
        if (results[0].label == "A-Ok") {
            document.getElementById('update_gesture_1').innerHTML = '&#128076;';
        } else if (results[0].label == "Excellent") {
            document.getElementById('update_gesture_1').innerHTML = '&#128077;';
        } else if (results[0].label == "Victory") {
            document.getElementById("update_gesture_1").innerHTML = '&#9996;';
        } else if (results[0].label == "Fist") {
            document.getElementById("update_gesture_1").innerHTML = '&#9994;';
        } if (results[0].label == "Horrible") {
            document.getElementById('update_gesture_1').innerHTML = '&#128078;';
        } else if (results[0].label == "Rockin'") {
            document.getElementById('update_gesture_1').innerHTML = '&#129304;';
        }

        if (results[1].label == "A-Ok") {
            document.getElementById('update_gesture_').innerHTML = '&#128076;';
        } else if (results[1].label == "Excellent") {
            document.getElementById('update_gesture_2').innerHTML = '&#128077;';
        } else if (results[1].label == "Victory") {
            document.getElementById("update_gesture_2").innerHTML = '&#9996;';
        } else if (results[1].label == "Fist") {
            document.getElementById("update_gesture_2").innerHTML = '&#9994;';
        } if (results[1].label == "Horrible") {
            document.getElementById('update_gesture_2').innerHTML = '&#128078;';
        } else if (results[1].label == "Rockin'") {
            document.getElementById('update_gesture_2').innerHTML = '&#129304;';
        }
    }    
}