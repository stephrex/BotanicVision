import React, { useState } from 'react';
import './CropRecommendation.css';
import axios from 'axios';
import CodeBox from '../../Components/CodeBox/CodeBox';

function CropRecommendation() {
    // State variables to store slider values
    const [N, setN] = useState(0);
    const [P, setP] = useState(0);
    const [K, setK] = useState(0);
    const [temperature, setTemperature] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [ph, setPh] = useState(0);
    const [rainfall, setRainfall] = useState(0);
    const [recommendedCrop, setRecommendedCrop] = useState('');

    // Function to handle slider value changes
    const handleSliderChange = (event, setValue) => {
        setValue(event.target.value);
    };

    // Function to handle form submission
    const handleSubmit = (event) => {
        setRecommendedCrop('')
        event.preventDefault();
        // Create JSON object with slider values
        const sliderValues = {
            N,
            P,
            K,
            temperature,
            humidity,
            ph,
            rainfall
        };
        axios.post('http://127.0.0.1:5000//croprecommender', sliderValues)
            .then(response => {
                console.log(response.data)
                setRecommendedCrop(response.data)
            })
    };

    return (
        <div id='recommender_body'>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="slider-container">
                        <label>Ratio of Nitrogen Content:</label>
                        <input type="range" min="0" max="140" value={N} onChange={(event) => handleSliderChange(event, setN)} />
                        <span>{N}</span>
                    </div>
                    <div>
                        <label>Ratio of Phosphorus Content::</label>
                        <input type="range" min="0" max="145" value={P} onChange={(event) => handleSliderChange(event, setP)} />
                        <span>{P}</span>
                    </div>
                    <div>
                        <label>Ratio of Potassium Content::</label>
                        <input type="range" min="0" max="205" value={K} onChange={(event) => handleSliderChange(event, setK)} />
                        <span>{K}</span>
                    </div>
                    <div>
                        <label>Temperature (°C):</label>
                        <input type="range" min="0" max="100" value={temperature} onChange={(event) => handleSliderChange(event, setTemperature)} />
                        <span>{temperature}</span>
                    </div>
                    <div>
                        <label>Humidity (%100):</label>
                        <input type="range" min="0" max="100" value={humidity} onChange={(event) => handleSliderChange(event, setHumidity)} />
                        <span>{humidity}</span>
                    </div>
                    <div>
                        <label>pH:</label>
                        <input type="range" min="0" max="14" step="0.1" value={ph} onChange={(event) => handleSliderChange(event, setPh)} />
                        <span>{ph}</span>
                    </div>
                    <div>
                        <label>Rainfall (mm):</label>
                        <input type="range" min="0" max="300" value={rainfall} onChange={(event) => handleSliderChange(event, setRainfall)} />
                        <span>{rainfall}</span>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div className='recommenderResult'>
                <div id='results-placeholder' style={{ display: recommendedCrop ? 'none' : 'block' }}>
                    <div className="results-placeholder_1" style={{ display: recommendedCrop ? 'none' : 'block' }}></div>
                    <div className="results-placeholder_2" style={{ display: recommendedCrop ? 'none' : 'block' }}></div>
                </div>
                {recommendedCrop && (
                    <div className='recommenderResultsText'>
                        <div className='results_class'>
                            <div id='results_class_header'>
                                <h2>In this soil type, <b>{recommendedCrop.prediction}</b> is the optimal choice for high yield and sustainable farming</h2>
                            </div>
                        </div>
                        <div id='results_class_info'>
                            <CodeBox text={recommendedCrop.info} width='28rem' maxline='52' />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CropRecommendation;
