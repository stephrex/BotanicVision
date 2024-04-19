import React, { useState } from 'react';
import Sidebar from '../../Containers/Sidebar/Sidebar';
import ChatBody from '../../Containers/ChatBody/ChatBody';
import './Body.css'

function Body() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [classifierName, setClassifierName] = useState('');
    { console.log(classifierName) }

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div className='Body'>
            <button className={`toggle-btn ${isSidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}>
                <span>&#x2190;</span>
            </button>
            <Sidebar isOpen={isSidebarOpen} setClassifierName={setClassifierName} classifierName={classifierName} />
            <div className={`chat_body ${isSidebarOpen ? '' : 'expanded'}`}>
                <ChatBody classifierName={classifierName} setClassifierName={setClassifierName} />
            </div>
        </div>
    );
}

export default Body;

