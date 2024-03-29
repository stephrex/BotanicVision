import React, { useEffect, useState } from 'react';
import './TypingAnimation.css'; // Import the CSS file for styling

function TypingAnimation({ text, maxLine }) {
    const [typedText, setTypedText] = useState('');
    const [currentLine, setCurrentLine] = useState('');
    const [remainingText, setRemainingText] = useState(text);

    useEffect(() => {
        if (remainingText) {
            if (remainingText.length > 0) {
                setTimeout(() => {
                    let nextChar = '';
                    let nextLine = '';

                    if (currentLine.length >= maxLine) {
                        // If the maximum characters per line is reached, move to the next line
                        nextChar = '\n';
                        nextLine = typedText + nextChar;
                        setTypedText(nextLine);
                        setCurrentLine('');
                    } else {
                        nextChar = remainingText.charAt(0);
                        nextLine = currentLine + nextChar;
                        setTypedText(typedText + nextChar);
                        setCurrentLine(nextLine);
                        setRemainingText(remainingText.substring(1));
                    }
                }, 100); // Adjust the typing speed here
            }
        }
    }, [typedText, remainingText, currentLine, maxLine]);

    return (
        <div className="typing-animation_1">
            <pre>{typedText}<span className="cursor"></span></pre>
        </div>
    );
}

export default TypingAnimation;
