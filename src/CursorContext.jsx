import React, { createContext, useContext, useState } from 'react';

const CursorContext = createContext();

export const CursorProvider = ({ children }) => {
    const [cursor, setCursor] = useState('auto');

    const changeCursor = (newCursor) => {
        setCursor(newCursor);
        document.body.style.cursor = newCursor;
    };

    return (
        <CursorContext.Provider value={{ cursor, changeCursor }}>
            {children}
        </CursorContext.Provider>
    );
};

export const useCursor = () => {
    return useContext(CursorContext);
};
