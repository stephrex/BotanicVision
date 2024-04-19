import React, { useEffect } from 'react';
import './Sidebar.css';

function Sidebar({ isOpen, setClassifierName, classifierName }) {

    const handleItemClick = (classifiername) => {
        setClassifierName(classifiername);
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <h2>Menu</h2>
            <ul>
                <li onClick={() => { handleItemClick('Crops') }}><a>Plant Classification</a></li>
                <li onClick={() => { handleItemClick('Fruits') }}><a>Fruit Classification</a></li>
                <li onClick={() => { handleItemClick('CDD') }}><a>Crop Disease Detection</a></li>
                <li onClick={() => { handleItemClick('CR') }}><a>Crop Recommendation System</a></li>
                <li onClick={() => { handleItemClick('Weather') }}><a>Weather Forecast</a></li>
            </ul>
        </div>
    );
}

export default Sidebar;