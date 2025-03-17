import React, { useState } from 'react';
import Substances from "./Substances";
import Inventory from "./Inventory";
import Displaying from "./Displaying";
import Exercise from "./Exercise";
import './Lab.css';

export default function Lab({ reaction, firstSub, secondSub, thirdSub, fourthSub }) {
    const [exerciseResult, setExerciseResult] = useState('');

    const handleExerciseResult = (result) => {
        setExerciseResult(result);
    };

    return (
        <div className="lab-main-block">
            <Displaying reaction={reaction}/>
            <Substances one={firstSub} two={secondSub}/>
            <Exercise result={exerciseResult} />
            <Inventory reaction={reaction} onExerciseResult={handleExerciseResult}/>
        </div>
    )
}
