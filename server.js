const express = require('express');
const multer = require('multer');
const path =  require('path')
const fs = require('fs');
const jpeg = require('jpeg-js')
const tf = require('@tensorflow/tfjs-node');
// Initialize the Express app
const app = express();
app.use(express.json())
const port = 3000;

// Configure Multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Function to load and preprocess the image
const loadImage = (path) => {
    const buffer = fs.readFileSync(path);
    const pixels = jpeg.decode(buffer, true);
    let tensor = tf.node.decodeImage(buffer, 3); // Decode image as RGB
    tensor = tf.image.resizeBilinear(tensor, [75, 100]); // Resize to the expected dimensions
    tensor = tensor.div(255.0); // Normalize to [0, 1]
    tensor = tensor.expandDims(0); // Add batch dimension
    console.log('tesnor: ', tensor)
    return tensor;
};

// Function to load the TensorFlow model
const loadModel = async () => {
    const modelPath = path.join(__dirname, 'tf_model', 'enhanced_model.h5');
    const model = await tf.loadGraphModel(`file://${modelPath}`);
    return model;
};

// Endpoint to handle image upload and make predictions
app.post('/predict', upload.single('image'), async (req, res) => {
    console.log(req.file)
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        // Load and preprocess the image
        const input = loadImage(req.file.path);
        
        // Load the model
        const model = await loadModel();

        // Make predictions
        // const output = model.predict(input);
        console.log('results: ', input)

        // Get the predicted class
        // const predictions = output.dataSync();
        // const predictedClass = predictions.indexOf(Math.max(...predictions));

        // Send the result back to the client
        // res.json({ predictions, predictedClass });
    } catch (error) {
        console.error('Error processing the image:', error.message);
        res.status(500).send('Internal server error');
    } finally {
        // Clean up the uploaded file
        fs.unlinkSync(req.file.path);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});