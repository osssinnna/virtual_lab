import { elements } from "../data";
import './TableMendeleev.css'
import { useState } from "react";

export default function TableMendeleev() {
    const [selectedElement, setSelectedElement] = useState(null);
    const [text, setText] = useState("");

    const toggleCard = (element) => {
        setSelectedElement(element); // Устанавливаем выбранный элемент при нажатии на кнопку
    };

    const handleChange = (e) => {
        setText(e.target.value);
    };

    return (
        <div className="table-elements">
            {elements.map(element => (
                <>
                    <button 
                        key={element.count}
                        onClick={() => toggleCard(element)} // Передаем элемент в функцию toggleCard при нажатии на кнопку
                        className={element.number === 0 ? "button-element null-number-element": 
                            element.direction ==="horizontal"? "button-element horizontal": 
                            element.direction ==="vertical"? "button-element vertical": "button-element"}
                    >
                        <div className="element-symbol">{element.symbol}</div>
                    </button>
                    {selectedElement === element && (
                        <div>
                            <div className="overlay" onClick={() => setSelectedElement(null)}></div>
                            <div className="card">
                                <div className="cardContent">
                                    <button onClick={() => setSelectedElement(null)} className="closeCardBtn">
                                        X
                                    </button>
                                    <div className="content-card-text-all">
                                        <div className="textContent" contentEditable="true" onChange={handleChange}>
                                        {element.symbol}<br></br>
                                        {element.title}
                                        </div>
                    
                                        <div className="text-info-element-periodic"> 
                                            Название: {element.name} <br></br>
                                            Атомная масса:  {element.atomic_mass} <br></br>
                                            Атомное число: {element.atomic_number} <br></br>
                                            Электронная конфигурация: {element.electron_configuration} <br></br>
                                            Тип: {element.type} <br></br>
                                            Группа: {element.group} <br></br>
                                            Период: {element.period} <br></br>
                                            Валентность: {element.valence} <br></br>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ))}
        </div>
    )
}
