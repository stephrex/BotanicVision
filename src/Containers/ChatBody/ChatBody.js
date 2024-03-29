import React, { useState, useEffect } from 'react';
import './ChatBody.css';
import ChatInput from '../../Components/ChatInput/ChatInput';
import Predict from '../../Components/Predict/Predict';
import CodeBox from '../../Components/CodeBox/CodeBox';
import CropDiseaseDetection from '../CropDiseaseDetection/CropDiseaseDetection';

function ChatBody() {
    const [welcomeTextIndex, setWelcomeTextIndex] = useState(0);

    const welcomeTexts = [
        "Explore Nature's Bounty",
        "Discover the World of Fruits",
        "Identify Exotic Plants",
        "Learn About Your Food",
        "Join Us on this Journey"
        // Add more text lines as needed
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            // Increment the index or loop back to 0 when reaching the end
            setWelcomeTextIndex((welcomeTextIndex + 1) % welcomeTexts.length);
        }, 5000); // Change text every 5 seconds

        // Clear the interval on component unmount to avoid memory leaks
        return () => clearInterval(interval);
    }, [welcomeTextIndex, welcomeTexts.length]);

    const [showCropClassification, setShowCropClassification] = useState(true);
    const [showFruitsClassification, setShowFruitsClassification] = useState(true);
    const [showCropDiseaseDetection, setShowCropDiseaseDetection] = useState(true);
    const [showMainContent, setShowMainContent] = useState(true);
    const [showChatBodyContent2, setshowChatBodyContent2] = useState(false);
    const [classifierName, setClassifierName] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [isPredictButtonClicked, setIsPredictButtonClicked] = useState(false);
    const [predictionResult, setPredictionResult] = useState('');
    const [isLoadingPrediction, setIsLoadingPrediction] = useState(false);
    const [isCDDSelectPage, setIsCDDSelectPage] = useState(false);

    const handlePlantsClick = () => {
        setShowCropClassification(false);
        setShowFruitsClassification(false);
        setShowCropDiseaseDetection(false);
        setShowMainContent(false);
        setshowChatBodyContent2(true);
        setClassifierName('Crops');
    };

    const handleFruitsClick = () => {
        setShowFruitsClassification(false);
        setShowCropClassification(false);
        setShowCropDiseaseDetection(false);
        setShowMainContent(false);
        setshowChatBodyContent2(true);
        setClassifierName('Fruits');
    };

    const handleCDDClick = () => {
        setShowCropDiseaseDetection(false);
        setShowCropClassification(false);
        setShowFruitsClassification(false);
        setShowMainContent(false);
        setshowChatBodyContent2(true);
        setClassifierName('CDD');
        setIsCDDSelectPage(true);
    };

    const handleBackButtonClick = () => {
        setShowCropClassification(true);
        setShowFruitsClassification(true);
        setShowCropDiseaseDetection(true);
        setShowMainContent(true); // Show the main content
        setshowChatBodyContent2(false); // Hide the back button
        setClassifierName('');
        setUploadedImage(null);
        setPredictionResult('');
        setIsLoadingPrediction(false);
        setIsCDDSelectPage(false);
    };

    const handleSendImage = (imageFile) => {
        setSelectedImage(imageFile);
        setPredictionResult('');
        // Handle the received image data
        const reader = new FileReader();
        reader.onload = () => {
            setUploadedImage(reader.result);
        };
        reader.readAsDataURL(imageFile);
    };

    const handlePrediction = () => {
        setIsPredictButtonClicked(true);
        setIsLoadingPrediction(true)
    };

    const handlePredictionComplete = (result) => {
        setIsPredictButtonClicked(false);
        setPredictionResult(result);
        setIsLoadingPrediction(false);
    };

    const handleCropOptionClick = () => {
        setIsCDDSelectPage(false);
    }

    return (
        <div className='chat_body_main'>
            <div className='chat_body_header'>
                <h1 className='App_name'>BotanicVision<span className='version_num'> 1.0</span></h1>
            </div>
            <div className='chat_body_content'>
                <div className='chat_body_content_1'>
                    <div className='welcome_text_container'>
                        <div className='welcome_text_wrapper'>
                            <h1 className='welcome_text' style={showMainContent ? null : { display: 'none' }}>Welcome to BotanicVision</h1>
                            {(classifierName === 'Fruits' || classifierName === 'Crops') && (
                                <h1 className='welcome_text' style={!showMainContent ? null : { display: 'none' }}>Use Botanic Vision to Learn about your {classifierName}</h1>
                            )}
                            {(classifierName === 'CDD') && (
                                <h1 className='welcome_text' style={!showMainContent ? null : { display: 'none' }}>Use Botanic Vision to Detect Diseases in Crops</h1>
                            )}
                        </div>
                        <div className='welcome_text_2_wrapper'>
                            <h1 className='welcome_text_2' style={showMainContent ? null : { display: 'none' }}>{welcomeTexts[welcomeTextIndex]}</h1>
                        </div>
                    </div>
                </div>
                <div className='chat_body_content_2' style={showMainContent ? null : { display: 'none' }}>
                    <div className='inner_container_chat_body_content_2'>
                        {showCropClassification && (
                            <div className='plants_classification_border_option' onClick={handlePlantsClick}>
                                <div className='plants_classification_border_option_header'><h1 style={{ fontWeight: 400 }}>Crop Classifier</h1></div>
                                <div className='plants_classification_border_option_body'><p style={{ textAlign: 'center' }}>Advanced Crop Detection: Our AI accurately identifies crop from images, aiding in botanical exploration and gardening endeavors. Try it now!</p></div>
                            </div>
                        )}
                        {showFruitsClassification && (
                            <div className='fruits_classification_border_option' onClick={handleFruitsClick}>
                                <div className='fruits_classification_border_option_header'><h1 style={{ fontWeight: 400 }}>Fruits Classifier</h1></div>
                                <div className='fruits_classification_border_option_body'><p style={{ textAlign: 'center' }}>Accurate Fruit Recognition: Our AI identifies fruits from images, aiding grocery shopping and nutrition decisions. Try it now!</p></div>
                            </div>
                        )}
                        {showCropDiseaseDetection && (
                            <div className='crop_disease_detection_border_option' onClick={handleCDDClick}>
                                <div className='crop_disease_detection_border_option_header'><h1 style={{ fontWeight: 400 }}>Crop Disease Detector</h1></div>
                                <div className='crop_disease_detection_border_option_body'><p style={{ textAlign: 'center' }}>Our AI accurately identifies crop diseases from images, empowering farmers to make informed decisions and protect their harvests. Try it now!</p></div>
                            </div>
                        )}
                    </div>
                </div>
                <div className='chat_body_content_3' style={showChatBodyContent2 ? null : { display: 'none' }}>
                    <button className="back-button" onClick={handleBackButtonClick}>Back</button>
                    {(classifierName === 'Fruits' || classifierName === 'Crops') && (
                        <div className='image-prediction-container'>
                            <div className="image-placeholder" style={{ display: uploadedImage ? 'none' : 'block' }}></div>
                            {uploadedImage && (
                                <div className="image-container">
                                    <img src={uploadedImage} alt="Uploaded" className="uploaded-image" style={{ height: '16rem', width: '15rem' }} />
                                </div>
                            )}
                            <div className='prediction_response_container'>
                                {isPredictButtonClicked && (
                                    <Predict imageData={selectedImage} predictButtonState={isPredictButtonClicked} onPredictionComplete={handlePredictionComplete} model_name={classifierName} />
                                )}
                                <div className='prediction_response_data'>
                                    {isLoadingPrediction ? (
                                        <div id='prediction_class_skeleton_loading_wrapper'><div className="prediction_class_skeleton_loading">{/* Skeleton loading for more info */}</div></div>
                                    ) : (
                                        predictionResult.prediction && (
                                            <div id='prediction_response_class'>
                                                <p className='typing-animation prediction_response_class_data'>
                                                    {classifierName} Class: {predictionResult.prediction}
                                                </p>
                                            </div>
                                        )
                                    )}
                                    {isLoadingPrediction ? (
                                        <div id='info_skeleton_loading_wrapper'><div className="info_skeleton_loading">{/* Skeleton loading for more info */}</div></div>
                                    ) : (
                                        predictionResult.info && (
                                            <div id='prediction_response_info'>
                                                <CodeBox text={predictionResult.info} />
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    {classifierName === 'CDD' && (
                        <div > <CropDiseaseDetection onCropOptionClick={handleCropOptionClick} uploadedImage={uploadedImage} /></div>
                    )}
                    {!isCDDSelectPage && (
                        <div className='chat_input_component'>
                            <ChatInput onSendImage={handleSendImage} onUploadedImage={uploadedImage} onPredictButtonClick={() => handlePrediction()} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ChatBody;