import React, { useState, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import './Flask.css';
import { products } from '../data';

export default function Flask({ flaskId, onSelectFlask, onExerciseResult }) {
    const [flaskContent, setFlaskContent] = useState({ substance: null, aggregate: null });
    const [isEmpty, setIsEmpty] = useState(true);
    const [productImage, setProductImage] = useState(null);

    useEffect(() => {
        console.log(`useEffect: isEmpty = ${isEmpty}`);
        if (isEmpty) {
            setProductImage(null);
        }
    }, [isEmpty]);

    const checkProductMatch = (firstSubstance, secondSubstance) => {
        console.log(`Checking product match for ${firstSubstance} and ${secondSubstance}`);
        for (let product of products) {
            console.log(`Comparing with product: ${product.first} + ${product.second}`);
            if ((product.first === firstSubstance && product.second === secondSubstance) || (product.first === secondSubstance && product.second === firstSubstance)) {
                console.log(`Match found: ${product.result}`);
                return product;
            }
        }
        console.log('No match found');
        return null;
    };

    const handleDropSubstance = (item) => {
        console.log(`Handling drop for substance: ${item.substance || item.name}`);
        const newSubstance = item.substance || item.name;
        const newAggregate = item.aggregate;

        if (isEmpty) {
            setFlaskContent({ substance: newSubstance, aggregate: newAggregate });
            setIsEmpty(false);
            console.log(`Dropped into empty flask: ${newSubstance}`);
        } else {
            console.log(`Flask not empty, selecting flask for: ${newSubstance}`);
            onSelectFlask({ substance: newSubstance, aggregate: newAggregate });
        }
    };

    const handleDropFlask = (item) => {
        console.log(`Handling drop for flask: ${item.substance}`);
        console.log(`cringe: ${flaskContent.substance}`);
        console.log("cringe");
        console.log("cringe");
        const newSubstance = item.substance;
        const firstSubstance = flaskContent.substance; //текущее вещество первой колбы
        const secondSubstance = item.substance;
        const product = checkProductMatch(firstSubstance, secondSubstance);
        if (product) {
            setFlaskContent({ substance: product.result, aggregate: 'result' });
            setProductImage(`/images/substances/products/${product.index}.svg`);
            onSelectFlask({ substance: newSubstance, aggregate: newAggregate });
            onExerciseResult(product.result);
        }
    };
    
    

    const [{ isOver }, drop] = useDrop(() => ({
        accept: ['SUBSTANCE', 'FLASK'],
        drop: (item, monitor) => {
            console.log('Drop item:', item);
            if (item.type === 'SUBSTANCE') {
                handleDropSubstance(item);
            } else if (item.type === 'FLASK') {
                handleDropFlask(item);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'FLASK',
        item: { type: 'FLASK', substance: flaskContent.substance, aggregate: flaskContent.aggregate },
        canDrag: !isEmpty,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (item, monitor) => {
            if (monitor.didDrop()) {
                setFlaskContent({ substance: null, aggregate: null });
                setIsEmpty(true);
            }
        }
    }), [flaskContent, isEmpty]);

    const getFlaskImage = () => {
        if (productImage) {
            return productImage;
        }
        if (flaskContent.aggregate === 'liquid') {
            return '/images/substances/liquid/blue.svg';
        } else if (flaskContent.aggregate === 'cristal') {
            return '/images/substances/cristal/fe.svg';
        }
        return '/images/flask.svg';
    };

    return (
        <div
            ref={drop}
            className={`flask ${isOver ? 'hover' : ''}`}
            data-flask-id={flaskId}
        >
            <div className='contain-flask-chem' ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
                <div
                    className='flask-chem'
                    style={{ backgroundImage: `url(${getFlaskImage()})` }}
                ></div>
            </div>
            {flaskContent.substance ? (
                <p className='name-instrument'>{flaskContent.substance}</p>
            ) : (
                <p className='name-instrument'>колба</p>
            )}
        </div>
    );
}
