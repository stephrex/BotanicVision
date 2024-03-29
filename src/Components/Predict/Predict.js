import { useEffect } from 'react';
import axios from 'axios';
import './Predict.css';

function Predict({ imageData, predictButtonState, onPredictionComplete, isPredictionProcessing, model_name }) {
    useEffect(() => {
        if (model_name === 'Fruits') {
            if (predictButtonState) {
                const formData = new FormData();
                formData.append('file', imageData);
                axios.post('http://127.0.0.1:5000/predict', formData)
                    .then(response => {
                        console.log(response.data);
                        const result = response.data;
                        // setPredictionResult(response.data.prediction);
                        onPredictionComplete(result);
                    })
                    .catch(error => {
                        console.error('Error predicting:', error);
                    });
            }
        } else {
            if (predictButtonState) {
                // console.log('Model For Crop Prediction isn\'t ready yet')
            }
        }
    }, [imageData, predictButtonState, onPredictionComplete, isPredictionProcessing, model_name]);

    return null;
}
export default Predict;