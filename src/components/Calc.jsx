import Blocks  from "./Blocks";
import Exercise from "./Exercise";

import './Calc.css'
export default function Calc() {
    return (
        <div className="calc-main-block">
            <Exercise/>
            <Blocks/>
        </div>
    )
}