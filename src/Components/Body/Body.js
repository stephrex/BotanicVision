import React, { useState } from 'react';
import Sidebar from '../../Containers/Sidebar/Sidebar';
import ChatBody from '../../Containers/ChatBody/ChatBody';
import './Body.css'

function Body() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className='Body'>
            <button className={`toggle-btn ${isSidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}>
                <span>&#x2190;</span>
            </button>
            <Sidebar isOpen={isSidebarOpen} />
            <div className={`chat_body ${isSidebarOpen ? '' : 'expanded'}`}>
                <ChatBody />
            </div>
        </div>
    );
}

export default Body;

