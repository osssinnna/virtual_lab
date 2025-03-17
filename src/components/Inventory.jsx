import { useState } from 'react';
import './Inventory.css';
import Flask from './Flask';
import Pipette from './Pipette';
import Spoon from './Spoon';



export default function Inventory({ reaction }) {
    const [selectedFlask, setSelectedFlask] = useState(null);

    const handleSubstanceTransfer = (substance, aggregate, targetFlaskId, isFromFlask) => {
        if (isFromFlask) {
            reaction(substance, aggregate, targetFlaskId);
        } else if (selectedFlask && targetFlaskId !== selectedFlask) {
            reaction(substance, aggregate, targetFlaskId);
        }
    };

    const handleFlaskTransfer = (substance, aggregate) => {
        setSelectedFlask(substance); // Устанавливаем выбранную колбу для переливания
    };

    return (
        <div className='inventory-main-block'>
            <div className='text-result'></div>
            <div className='move-level'>
                <Flask flaskId={1} onTransfer={handleSubstanceTransfer} onSelectFlask={handleFlaskTransfer} />
                <Flask flaskId={2} onTransfer={handleSubstanceTransfer} onSelectFlask={handleFlaskTransfer} />
                <Pipette />
                <Spoon />
                
            </div>
            <div className='table'></div>
        </div>
    );
}
