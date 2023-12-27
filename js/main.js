let cnv;  // Declare variable 'cnv'
let img;  // Declare variable 'img'.

let title;  // Declare variable 'title'.
let titleFontSize;
let titleFont;
let titleX;
let titleY;
let titleColor;
let titleStrokeWeight;

let description;  // Declare variable 'description'.
let brand;  // Declare variable 'brand'.
// let location;  // Declare variable 'location'.
let date;  // Declare variable 'date'.
let lowResCanvas;

function preload() {
    img = loadImage('../data/tatamiRoom.png');  // Load the image
}

function setup() {
    cnv = createCanvas(500, 800);
    cnv.parent('canvasContainer');
    cnv.style('border', '5px solid black');

    title = "Asakusa";
    description = "Asakusa is a district in the Taitō ward of Tokyo, renowned for its blend of historical and modern Japanese culture. Central to Asakusa's identity is the Sensō-ji Temple, a revered Buddhist temple dedicated to the bodhisattva Kannon, which is surrounded by several other temples and hosts various festivals like the Sanja Matsuri";
    brand = "架空の日本";

    drawLowResCanvas();
}

function draw() {

}

function drawLowResCanvas() {
    console.log("Drawing low res canvas");
    background(255);

    strokeWeight(1);  // Set the stroke thickness to 1
    if(img) {
        image(img, 80, 100, 400, 400);  // Display the image at position (50, 100)
    }

    // Text
    fill(0);
    noStroke();
    textFont('Noto Serif JP'); 
    textSize(80);
    textAlign(RIGHT);
    text(title, 480, 600);
    textSize(20);
    text(description, 80, 620, 400, 100);
    textSize(8);
    text("#1", 470, 780);

    // Vertical text
    push();  // Save the current settings and transformations
        translate(60, 450);  // Move to the point where you want to draw the text
        textSize(60);
        textAlign(LEFT);
        rotate(- PI / 2);  // Rotate the coordinate system 90 degrees
        text(brand, 0, 0);  // Draw the text
    pop();  // Restore the settings and transformations
}

function windowResized() {
    let newWidth = windowWidth / 2;  // Calculate the new width
    let newHeight = windowHeight / 2;  // Calculate the new height
    cnv.resizeCanvas(newWidth, newHeight);  // Resize the canvas
}

function getUpsclaedImage() {
    let highResCanvas;
    highResCanvas = createGraphics(1500, 2400);

    highResCanvas.background(255);
    
    if(img) {
        highResCanvas.image(img, 150, 300, 1200, 1200);  // Display the image at position (50, 100)
    }

    // Text
    highResCanvas.strokeWeight(1);  // Set the stroke thickness to 1
    highResCanvas.fill(0);
    highResCanvas.noStroke();
    highResCanvas.textFont('Noto Serif JP'); 
    highResCanvas.textSize(300);
    highResCanvas.text(title,150, 1800);
    highResCanvas.textSize(60);
    highResCanvas.text(description,150, 2100);
    highResCanvas.textSize(36);
    highResCanvas.text("by @mamorum", 150, 2200);

    return highResCanvas;
}

document.getElementById('imageUpload').addEventListener('change', function(e) {
    let files = e.target.files;  // Get the selected files
    console.log(files);

    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        let reader = new FileReader();

        // When the file is read, create an image element and set its src to the file data
        reader.onload = function(e) {
            img = createImg(e.target.result);
            img.hide();  // Hide the image element
            // Now you can use the img variable in your p5.js sketch
        }

        reader.readAsDataURL(file);  // Read the file
    }
});

// save button to save canvas
document.getElementById('saveButton').addEventListener('click', function(e) {
    console.log("Saving canvas");
    e.preventDefault();
    let highResCanvas = getUpsclaedImage();
    saveCanvas(highResCanvas, 'myCanvas', 'jpg');
});

// get title text from text input
document.getElementById('title').addEventListener('change', function(e) {
    title = e.target.value;
});

// get description text from text input
document.getElementById('description').addEventListener('change', function(e) {
    description = e.target.value;
});

// get location text from text input
// document.getElementById('location').addEventListener('change', function(e) {
//     location = e.target.value;
// }

// get brand text from text input
document.getElementById('brand').addEventListener('change', function(e) {
    brand = e.target.value;
});


document.querySelector('form').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
    }
});