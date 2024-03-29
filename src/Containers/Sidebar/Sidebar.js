import React from 'react';
import './Sidebar.css'

function Sidebar({ isOpen }) {
    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <h2>Menu</h2>
            <ul>
                <li><a href="#plants">Plant Classification</a></li>
                <li><a href="#fruits">Fruit Classification</a></li>
                <li><a href='#CDD'>Crop Disease Detection</a></li>
            </ul>
        </div>
    );
}

export default Sidebar;