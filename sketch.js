// Teachable Machine
// Utensils!

let video;
let label = "Welcome";
let classifier;
let labelBar;

let modelURL = "https://teachablemachine.withgoogle.com/models/Y1G9GqffG/";

// STEP 1: Load the model
function preload() {
  classifier = ml5.imageClassifier(modelURL, { version: 2 });
}

function setup() {
  // let canvas stay in container 
  let container = document.getElementById("canvasContainer");
  let w = container.offsetWidth;
  let h = w * 0.55;
  let canvas = createCanvas(w, h);
  canvas.parent("canvasContainer");

  // webcam
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  // styled label bar under the canvas
  labelBar = createDiv(label);
  labelBar.parent("canvasContainer");
  labelBar.style("width", "640px");
  labelBar.style("height", "70px");
  labelBar.style("background", "#6e2438");
  labelBar.style("color", "white");
  labelBar.style("font-size", "34px");
  labelBar.style("font-family", "Georgia, serif");
  labelBar.style("font-weight", "bold");
  labelBar.style("display", "flex");
  labelBar.style("align-items", "center");
  labelBar.style("justify-content", "center");
  labelBar.style("margin", "0");
  labelBar.style("padding", "0");


  // Start classifying
  classifyVideo();
}

function windowResized() {
    let container = document.getElementById('canvasContainer');
    resizeCanvas(container.offsetWidth, container.offsetWidth * 0.75);
}

// STEP 2: Classify the video
function classifyVideo() {
  classifier.classify(video, gotResults);
}

function draw() {
  background(0);

  // Show only the webcam image
  image(video, 0, 0, width, height);

  // No large text drawn on the canvas
}

// STEP 3: Get classification results
function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  console.log("Label is:", results[0].label);
  console.log("Confidence:", results[0].confidence);

  label = results[0].label;
  labelBar.html(label);

  classifyVideo();
 
}
