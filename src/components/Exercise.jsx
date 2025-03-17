import { exerciseBase } from "../data"
import "./Exercise.css"
export default function Exercise({result}) {
    console.log(exerciseBase.additional);
    return(
        <div>
            <div className="text-block-exercise">
                <p className="base">{exerciseBase[0].firstPart}</p>
                <p className="additional">{exerciseBase[0].additional}</p>
            </div>
            <div>
                <p className="result-sign">{result}</p>
                {console.log(result)}
            </div>
        </div>
        
    )
}