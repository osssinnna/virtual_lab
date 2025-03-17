import { useState } from 'react';
import './Pipette.css';
import { useCursor } from '../CursorContext';

export default function Pipette() {
    const [isCursorChangedPipette, setCursorChangedPipette] = useState(false);
    const { changeCursor } = useCursor();

    const handleClickPipette = () => {
        if (isCursorChangedPipette) {
            changeCursor('auto');
        } else {
            changeCursor('url(/images/cursor-pipette.svg) 16 16, auto');
        }
        setCursorChangedPipette(!isCursorChangedPipette);
    };

    return (
        <div className='main-pipetka'>
            <div className='block-instrument' onClick={handleClickPipette}>
                <div className='pipetka'></div>
            </div>
            <p className='name-instrument-helper'>пипетка</p>
        </div>
    );
}
