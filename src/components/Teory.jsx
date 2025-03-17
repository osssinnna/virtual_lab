import { useState } from 'react';
import { teoryData} from "../data";
import './Teory.css';
import Safety from './Safety';
import PropTypes from 'prop-types';
import TableMendeleev from './TableMendeleev';
import TableRast from './TableRast';
function ElementListTeory({ contentTitle, contentClass}) {
  const [showText, setShowText] = useState(false);

  const handleClick = () => {
    setShowText(!showText);
  };

  return (
    <div className="element-list-teory">
        <div className="header-list-teory">
            <button className={'image-button ' + contentClass} onClick={handleClick}></button>
            <p>{contentTitle}</p>
        </div>
        {showText && <div className="text-content">{contentClass === "table-mend"?<TableMendeleev/>:
                                                    contentClass === "table-bez" ?<Safety/>: 
                                                    contentClass === "table-rast"?<TableRast/>: ""}</div>}
    </div>
  );
}

ElementListTeory.propTypes = {
  contentTitle: PropTypes.string.isRequired,
  contentClass: PropTypes.string.isRequired
};

export default function Teory() {
  return (
    <div className="list-teory">
      {teoryData.map((data, index) => (
        <ElementListTeory key={index} isActive={false} contentTitle={data.title} contentClass={data.class} />
      ))}
    </div>
  );
}
