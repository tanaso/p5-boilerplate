let cnv;  // Declare variable 'cnv'
let img;  // Declare variable 'img'.

let title = {
    text: "Asakusa",
    fontSize: 80,
    font: "Noto Serif JP",
    rightAlign: true,
    vertical: false,
    posX: 80,
    posY: 510,
    width: 420,
    height: 100,
    color: [0, 0, 0],
    strokeWeight: 1
};

let cordinate = {
    text: "(3213123, 434234)",
    fontSize: 20,
    font: "Noto Serif JP",
    rightAlign: true,
    vertical: false,
    posX: 80,
    posY: 580,
    width: 400,
    height: 100,
    color: [0, 0, 0],
    strokeWeight: 1
};

let description = {
    text: "Asakusa is a district in the Taitō ward of Tokyo, renowned for its blend of historical and modern Japanese culture. Central to Asakusa's identity is the Sensō-ji Temple, a revered Buddhist temple dedicated to the bodhisattva Kannon.",
    fontSize: 20,
    font: "Noto Serif JP",
    rightAlign: true,
    vertical: false,
    posX: 80,
    posY: 620,
    width: 400,
    height: 140,
    color: [0, 0, 0],
    strokeWeight: 1
};
let brand = {
    text: "架空の日本",
    fontSize: 60,
    font: "Noto Serif JP",
    rightAlign: false,
    vertical: true,
    posX: - 440,
    posY: 15,
    width: 100,
    height: 100,
    color: [0, 0, 0],
    strokeWeight: 1
};

let vol = {
    text: "# 1",
    fontSize: 20,
    font: "Noto Serif JP",
    rightAlign: true,
    vertical: false,
    posX: 80,
    posY: 780,
    width: 400,
    height: 200,
    color: [0, 0, 0],
    strokeWeight: 1
};

let objects = [title, cordinate, description, brand, vol];

let date;
let lowResCanvas;

function preload() {
    img = loadImage('../data/tatamiRoom.png');  // Load the image
}

function setup() {
    cnv = createCanvas(500, 800);
    cnv.parent('canvasContainer');
    cnv.style('border', '5px solid black');

    drawLowResCanvas();
}

function draw() {

}

function drawLowResCanvas() {
    background(255);

    if(img) {
        image(img, 80, 100, 400, 400);  // Display the image at position (50, 100)
    }

    // mapping objects
    for (let i = 0; i < objects.length; i++) {
        let obj = objects[i];
        push();
            // debug
            // let randomColor = [random(255), random(255), random(255)];
            // obj.color = randomColor;

            fill(obj.color);
            strokeWeight(obj.strokeWeight);
            textFont(obj.font);
            textSize(obj.fontSize);
            if(obj.rightAlign) {
                textAlign(RIGHT);
            }
            else {
                textAlign(LEFT);
            }
            if(obj.vertical) {
                rotate(- PI / 2);
            }
            text(obj.text, obj.posX, obj.posY, obj.width, obj.height);
            
            // debug
            // ellipse(obj.posX, obj.posY, 5)
            // noFill()
            // rect(obj.posX, obj.posY, obj.width, obj.height)
        pop();
    }
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
        highResCanvas.image(img, 240, 300, 1200, 1200);  // Display the image at position (50, 100)
    }

    // mapping objects
    for (let i = 0; i < objects.length; i++) {
        let obj = objects[i];
        highResCanvas.push();
            // debug
            // let randomColor = [random(255), random(255), random(255)];
            // obj.color = randomColor;

            highResCanvas.fill(obj.color);
            highResCanvas.strokeWeight(obj.strokeWeight * 3);
            highResCanvas.textFont(obj.font);
            highResCanvas.textSize(obj.fontSize * 3);
            if(obj.rightAlign) {
                highResCanvas.textAlign(RIGHT);
            }
            else {
                highResCanvas.textAlign(LEFT);
            }
            if(obj.vertical) {
                highResCanvas.rotate(- PI / 2);
            }
            highResCanvas.text(obj.text, obj.posX * 3, obj.posY * 3, obj.width * 3, obj.height * 3);
            
            // debug
            // highResCanvas.ellipse(obj.posX * 3, obj.posY * 3, 5)
            // highResCanvas.noFill()
            // highResCanvas.rect(obj.posX * 3, obj.posY * 3, obj.width * 3, obj.height * 3)
        highResCanvas.pop();
    }

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
    title.text = e.target.value;
});

// get description text from text input
document.getElementById('description').addEventListener('change', function(e) {
    description.text = e.target.value;
});

// get location text from text input
// document.getElementById('location').addEventListener('change', function(e) {
//     location = e.target.value;
// }

// get brand text from text input
document.getElementById('brand').addEventListener('change', function(e) {
    brand.text = e.target.value;
});


document.querySelector('form').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
    }
});