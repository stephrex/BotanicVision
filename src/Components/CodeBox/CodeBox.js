import React from 'react';
import TypingAnimation from '.././TypingAnimation/TypingAnimation'; // Import your TypingAnimation component
import './CodeBox.css'

const CodeBox = ({ text }) => {
    return (
        <div className="code-box">
            <pre>
                <code>
                    <TypingAnimation text={text} maxLine={75} />
                </code>
            </pre>
        </div>
    );
};

export default CodeBox;
