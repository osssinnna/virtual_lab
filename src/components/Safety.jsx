import React, { useState, useEffect } from 'react';
import './Safety.css'

export default function Safety() {
    const [text, setText] = useState("");

    useEffect(() => {
        fetch('/text_file_safety.txt')
            .then(response => response.text())
            .then(data => {
                setText(data);
            })
            .catch(error => {
                console.error('Error fetching text file:', error);
            });
    }, []);

    return (
        <div className='safe-text'>
            <pre className='text-text-text'>{text}</pre>
        </div>
    );
}
