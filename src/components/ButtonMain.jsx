import PropTypes from 'prop-types';
import './ButtonMain.css'
export default function ButtonMain({children, clickButton, isActive}) {
    return(

        <button onClick={clickButton} className={ isActive ? 'button active' : 'button'}>{children}</button>
    )
  }

  ButtonMain.propTypes = {
    children: PropTypes.node.isRequired,
    clickButton: PropTypes.func.isRequired,
    isActive: PropTypes.node.isRequired
  };