import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { substancesInfo, exerciseBase } from "../data";
import { parseUserData, parseChemicalFormula } from '../server';
import Teory from "./Teory";
import "./Blocks.css";
import { directSubstance } from '../server';
import ButtonMain from './ButtonMain';
import Lab from './Lab';
import { buttonMain } from '../data';

export default function Blocks() {
    const getSubstanceInfo = (name) => {
        const substance = substancesInfo.find((element) => element.name === name);
        return substance ? substance : { name: name, formul: { koef: "", first: "", indexFirst: "", second: "", indexSecond: "", third: "", indexThird: "" } };
    }

    const [updatedArraySolution, setUpdatedArraySolution] = useState(exerciseBase[0].substances.map(name => getSubstanceInfo(name)));
    const [firstSubstanceBlock, setFirstSubstanceBlock] = useState(null);
    const [secondSubstanceBlock, setSecondSubstanceBlock] = useState(null);
    const [thirdSubstanceText, setThirdSubstanceText] = useState("");
    const [fourthSubstanceText, setFourthSubstanceText] = useState("");
    const [firstCoeffText, setFirstCoeffText] = useState(1);
    const [secondCoeffText, setSecondCoeffText] = useState(1);
    const [thirdCoeffText, setThirdCoeffText] = useState(1);
    const [fourthCoeffText, setFourthCoeffText] = useState(1);
    const [draggingIndex, setDraggingIndex] = useState(null);
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [contentVisible, setContentVisible] = useState(null);
    const [isBalanced, setIsBalanced] = useState(false);

    const handleContentButtonClick = (content) => {
        setContentVisible(content);
    };

    const handleDragStart = (e, index) => {
        e.dataTransfer.setData("index", index.toString());
        setDraggingIndex(index);
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleDropFirstSubstance = (e) => {
        e.preventDefault();
        const draggedIndex = parseInt(e.dataTransfer.getData("index"));
        setFirstSubstanceBlock(updatedArraySolution[draggedIndex]);
        setDraggingIndex(null);
    }

    const handleDropSecondSubstance = (e) => {
        e.preventDefault();
        const draggedIndex = parseInt(e.dataTransfer.getData("index"));
        setSecondSubstanceBlock(updatedArraySolution[draggedIndex]);
        setDraggingIndex(null);
    }

    const handleThirdSubstanceChange = (e) => {
        setThirdSubstanceText(e.target.value);
    }

    const handleFourthSubstanceChange = (e) => {
        setFourthSubstanceText(e.target.value);
    }

    const handleFirstCoeffChange = (e) => {
        setFirstCoeffText(e.target.value);
    }

    const handleSecondCoeffChange = (e) => {
        setSecondCoeffText(e.target.value);
    }

    const handleThirdCoeffChange = (e) => {
        setThirdCoeffText(e.target.value);
    }

    const handleFourthCoeffChange = (e) => {
        setFourthCoeffText(e.target.value);
    }

    const handleButtonClick = () => {
        console.log("Button clicked");

        const balanced = parseUserData(firstCoeffText, firstSubstanceBlock?.formul.string, secondCoeffText, secondSubstanceBlock?.formul.string, thirdCoeffText, thirdSubstanceText, fourthCoeffText, fourthSubstanceText);
        
        setIsBalanced(balanced);
        setResult(balanced ? "Реакция сбалансирована, приступай к следующему заданию" : "Реакция не сбалансирована, попробуй снова");
 
    };
    const reactionString = (k1, sub1, k2, sub2, k3, sub3, k4, sub4) => {
        let string = '';
        if (k1 != '1') {
            string += k1 + sub1 + " + ";
        } else {
            string += sub1 + " + ";
        }
        if (k2 != '1') {
            string += k2 + sub2 + " -> ";
        } else {
            string += sub2 + " -> ";
        }
        if (k3 != '1') {
            string += k3 + sub3 + " + ";
        } else {
            string += sub3 + " + ";
        }
        if (k4 != '1') {
            string += k4 + sub4;
        } else {
            string += sub4;
        }
        return string;
    }
    return (
        <div className="main-block-into-blocks">
            <div className="all-blocks">
                {updatedArraySolution.map((elem, index) => (
                    <div
                        key={index}
                        className={`block ${draggingIndex === index ? 'dragging' : ''}`}
                        draggable="true"
                        onDragStart={(e) => handleDragStart(e, index)}
                    >
                        {elem.formul.string}
                    </div>
                ))}
            </div>
            <div className="blocks-paste">
                <div className="block-paste" onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDropFirstSubstance(e)}>
                    <div className="coeff one-coeff">
                        <input type="text" value={firstCoeffText} onChange={handleFirstCoeffChange} />
                    </div>
                    <div className="substance first-substance">{firstSubstanceBlock ? firstSubstanceBlock.formul.string : null}</div>
                </div>
                <div className="plus">+</div>
                <div className="block-paste" onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDropSecondSubstance(e)}>
                    <div className="coeff two-coeff">
                        <input type="text" value={secondCoeffText} onChange={handleSecondCoeffChange} />
                    </div>
                    <div className="substance second-substance">{secondSubstanceBlock ? secondSubstanceBlock.formul.string : null}</div>
                </div>
                <div className="direction"></div>
                <div className="block-paste">
                    <div className="coeff three-coeff">
                        <input type="text" value={thirdCoeffText} onChange={handleThirdCoeffChange} />
                    </div>
                    <div className="substance third-substance"><input type="text" value={thirdSubstanceText} onChange={handleThirdSubstanceChange} /></div>
                </div>
                <div className="plus">+</div>
                <div className="block-paste">
                    <div className="coeff four-coeff">
                        <input type="text" value={fourthCoeffText} onChange={handleFourthCoeffChange} />
                    </div>
                    <div className="substance fourth-substance"><input type="text" value={fourthSubstanceText} onChange={handleFourthSubstanceChange} /></div>
                </div>
            </div>
            <div className='teory-in-calc'>
                <Teory/>
            </div>
            <div className="main-insert">
                <button className="button-result" onClick={handleButtonClick} disabled={isLoading}>
                    {isLoading ? "Loading..." : "результат"}
                </button>
                <div className='result-text'>{result && <div>{result}</div>}</div>
            </div>
            {isBalanced && (
                <div>
                    {contentVisible === null ? (
                        <div className='buttons'>
                            <ButtonMain isActive={contentVisible === 'lab'} clickButton={() => handleContentButtonClick('lab')}>{buttonMain[1].name}</ButtonMain>
                        </div>
                    ) : (
                        <div>{contentVisible === 'lab' ? <DndProvider backend={HTML5Backend}>
                        <Lab reaction = {"Fe + CuSO4 -> FeSO4 + Cu↓"}
                        firstSub = {firstSubstanceBlock}
                        secondSub ={secondSubstanceBlock}
                        thirdSub ={parseChemicalFormula(thirdSubstanceText)}
                        fourthSub ={parseChemicalFormula(fourthSubstanceText)}/> </DndProvider> : <p>Error!</p>}</div>
                    )}
                </div>
            )}
        </div>
    );
}

//reaction = {reactionString(firstCoeffText, firstSubstanceBlock?.formul.string, secondCoeffText, secondSubstanceBlock?.formul.string, thirdCoeffText, directSubstance(thirdSubstanceText), fourthCoeffText, directSubstance(fourthSubstanceText))}