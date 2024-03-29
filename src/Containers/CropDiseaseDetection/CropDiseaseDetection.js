import React, { useState } from 'react'
import './CropDiseaseDetection.css'

function CropDiseaseDetection({ onCropOptionClick, uploadedImage }) {
    const [cropName, setCropName] = useState(null)

    const handleOptionClick = (crop) => {
        setCropName(crop)
        onCropOptionClick();
    }

    return (
        <div>
            {!cropName && (
                <div>
                    <h1 id='selection_text'>Select Crop Species for Disease Detection</h1>
                    <div className='Crops_option_wrapper'>
                        <ul className='Crops_option_ul'>
                            <div onClick={() => { handleOptionClick('Apple') }} className='Crops_option'><h2>Apple</h2></div>
                            <div onClick={() => { handleOptionClick('Bell') }} className='Crops_option'><h2>Bell Pepper</h2></div>
                            <div onClick={() => { handleOptionClick('Cherry') }} className='Crops_option'><h2>Cherry</h2></div>
                            <div onClick={() => { handleOptionClick('Citrus') }} className='Crops_option'><h2>Citrus</h2></div>
                            <div onClick={() => { handleOptionClick('Corn') }} className='Crops_option'><h2>Corn</h2></div>
                            <div onClick={() => { handleOptionClick('Grape') }} className='Crops_option'><h2>Grape</h2></div>
                            <div onClick={() => { handleOptionClick('Peach') }} className='Crops_option'><h2>Peach</h2></div>
                            <div onClick={() => { handleOptionClick('Potato') }} className='Crops_option'><h2>Potato</h2></div>
                            <div onClick={() => { handleOptionClick('Strawberry') }} className='Crops_option'><h2>Strawberry</h2></div>
                            <div onClick={() => { handleOptionClick('Tomato') }} className='Crops_option'><h2>Tomato</h2></div>
                        </ul>
                    </div>
                </div>
            )}
            {cropName && (
                <div id='uploaded_CDD_image'>
                    <div className="image-placeholder" style={{ display: uploadedImage ? 'none' : 'block' }}></div>
                    {uploadedImage && (
                        <div className="image-container">
                            <img src={uploadedImage} alt="Uploaded" className="uploaded-image" style={{ height: '16rem', width: '15rem' }} />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default CropDiseaseDetection;
