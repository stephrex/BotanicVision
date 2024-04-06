import React from 'react';
import TypingAnimation from '.././TypingAnimation/TypingAnimation'; // Import your TypingAnimation component
import './CodeBox.css'

const CodeBox = ({ text, width, maxline }) => {
    return (
        <div className="code-box" style={{ width: width }} >
            <pre>
                <code>
                    <TypingAnimation text={text} maxLine={maxline} />
                </code>
            </pre>
        </div>
    );
};

export default CodeBox;
