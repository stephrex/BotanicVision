// ChatInput.js
import React from "react";
import CameraIcon from './icons8-camera-30.png';
import ArrowUpIcon from './icons8-upload-48.png';
import './ChatInput.css';

function ChatInput({ onSendImage, onUploadedImage, onPredictButtonClick }) {
    const handleSendImage = (event) => {
        const imageFile = event.target.files[0];
        if (imageFile) {
            onSendImage(imageFile);
        }
    };

    return (
        <div className="chat-input-container">
            <div className="camera_icon_wrapper">
                <label htmlFor="image-upload" className="image-upload-button">
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleSendImage}
                        style={{ display: 'none' }}
                    />
                    <img src={CameraIcon} alt="Camera" className="camera-icon" />
                </label>
            </div>
            <div className="placeholder_image_input">
                <p>UPLOAD AN IMAGE AND MAKE A PREDICTION...</p>
            </div>
            <button
                onClick={onPredictButtonClick}
                className="send-button"
                disabled={!onUploadedImage}
                style={{ cursor: (onUploadedImage) ? 'pointer' : 'not-allowed' }}
            >
                <img src={ArrowUpIcon} alt="Send" className="send-icon" />
            </button>
        </div>
    );
}

export default ChatInput;
