import "./Substance.css";
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { useCursor } from '../CursorContext';

export default function Substance({ nameSubstance, aggregate }) {
    const { cursor } = useCursor();

    // Функция для проверки возможности перетаскивания
    const canDrag = () => {
        if (cursor === 'url(/images/cursor-pipette.svg) 16 16, auto' && aggregate === "liquid") {
            return true;
        } else if (cursor === 'url(/images/cursor-spoon.svg) 16 16, auto' && aggregate === "cristal") {
            return true;
        }
        return false;
    };

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'SUBSTANCE',
        item: { type: 'SUBSTANCE', name: nameSubstance, aggregate },
        canDrag: canDrag(),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [cursor]); 

    return (
        <div
            ref={drag}
            style={{ opacity: isDragging ? 0.5 : 1, cursor: canDrag() ? 'grab' : 'not-allowed' }}
            className="substance"
        >
            <p className="name-sub">{nameSubstance}</p>
        </div>
    );
}

Substance.propTypes = {
    nameSubstance: PropTypes.string.isRequired,
    aggregate: PropTypes.string.isRequired,
};
