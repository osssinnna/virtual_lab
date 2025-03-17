import Substance from './Substance';
import { substancesInfo } from '../data';

export default function Substances({ one, two, result}) {
    let array = [one, two];
    // substancesInfo.forEach((element) => {
    //     if(element.formul.first === three.first &&
    //         element.formul.second === three.second &&
    //         element.formul.third === three.third) {
    //             three.name = element.name;
    //             three.aggregate = element.aggregate;
    //     }
    // });
    // substancesInfo.forEach((element) => {
    //     if(element.formul.first === four.first &&
    //         element.formul.second === four.second &&
    //         element.formul.third === four.third) {
    //             four.name = element.name;
    //             four.aggregate = element.aggregate;
    //     }
    // });
    return (
        <div className='substances-main-block'>
            <h2 className='substances'>вещества</h2>
            {array.map((substance, index) => (
                <Substance 
                    key={index} 
                    nameSubstance={substance.name} 
                    aggregate={substance.aggregate} 
                />
            ))}
            <div className='result-sign'>
                
            </div>
        </div>
    );
}
