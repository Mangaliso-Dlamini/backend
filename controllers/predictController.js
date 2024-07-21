const tf = require('@tensorflow/tfjs-node');
const path = require('path');
const fs = require('fs');


let model;

 // Load label encoders from JSON files
 const labelEncoderT1 = JSON.parse(fs.readFileSync(path.join(__dirname, '../model/label_encoder_t1.json'), 'utf8'));
const labelEncoderT2 = JSON.parse(fs.readFileSync(path.join(__dirname, '../model/label_encoder_t2.json'), 'utf8'));

(async () => {
  try {
    const modelPath = path.resolve(__dirname, '../model/model.json');
    model = await tf.loadLayersModel(`file://${modelPath}`);
    console.log('Model loaded successfully');
  } catch (error) {
    console.error('Failed to load model:', error);
  }
})();

const predict = async (req, res) => {
  const data = [
    parseInt(req.body.age),
    parseInt(req.body.position),
    parseInt(req.body.matchesPlayed),
    parseInt(req.body.goals),
    parseInt(req.body.assists),
    parseInt(req.body.tackles),
    parseInt(req.body.passesCompleted),
    parseInt(req.body.distanceCovered),
    parseInt(req.body.sprints),
    parseInt(req.body.injuries),
    parseInt(req.body.fitnessLevel),
    parseInt(req.body.trainingHours)
  ];

  try {
    // Ensure the input data is in the correct format
    const inputData = data;

    // Check for valid input data
    if (!Array.isArray(inputData) || inputData.length === 0) {
      return res.status(400).send('Invalid input data');
    }

    // Preprocess input data if necessary
    const inputTensor = tf.tensor2d([inputData], [1, inputData.length]);

    // Make predictions
    const prediction = model.predict(inputTensor);

    // Ensure the prediction output is handled correctly
    const predictions = Array.isArray(prediction) ? prediction : [prediction];
    const results = predictions.map((pred) => pred.argMax(-1).dataSync()[0]);

    const t1Focus = labelEncoderT1[results[0]];
    const t2Focus = labelEncoderT2[results[1]];

    const recommendations = { t1Prediction: t1Focus, t2Prediction: t2Focus};
    res.render('recommender', {recommendations
    })
  } catch (error) {
    res.status(500).send(error.toString());
  }
};
module.exports={predict}