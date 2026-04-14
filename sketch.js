// Teachable Machine
// Utensils!

// The video
let video;
// For displaying the label
let label = "waiting...";
// The classifier
let classifier;
//let modelURL = 'https://teachablemachine.withgoogle.com/models/Y1G9GqffG/';
let modelURL = './model/';

// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(modelURL, {version: 2});
}

function setup() {
  let canvas = createCanvas(640, 520);
  canvas.parent('canvasContainer');
  // Create the video
  video = createCapture(VIDEO);
  video.hide();
  // STEP 2: Start classifying
  classifyVideo();
}

// STEP 2 classify the video!
function classifyVideo() {
  classifier.classify(video, gotResults);
}

function draw() {
  background(0);

  // Draw the video
  image(video, 0, 0, width, height - 40);

  // STEP 4: Draw the label
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width / 2, height - 16);

  // Pick an emoji, the "default" is fork
  let emoji = "blank";
  if (label == "Spoon") {
    emoji = "SPOON!";
  } else if (label == "Knife") {
    emoji = "KNIFE!";
  } else if (label == "Fork") {
    emoji = "FORK!";
  } else if (label == "Blank") {
    emoji = "nothing here...";
  }
  // Draw the emoji
  textSize(256);
  text(emoji, width / 2, height / 2);
}

// STEP 3: Get the classification!
function gotResults(error, results) {
  // Something went wrong!
  if (error) {
    console.error(error);
    return;
  }
  console.log("Label is:", results[0].label);  // change to this
  console.log("Confidence:", results[0].confidence);
  // Store the label and classify again!
  label = results[0].label;
  classifyVideo();
}