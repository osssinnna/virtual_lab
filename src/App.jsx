
import './App.css'
import Header from './components/Header'
import { buttonMain} from './data'
import ButtonMain from './components/ButtonMain'
import { useState } from 'react'
import Teory from './components/Teory'
import Lab from './components/Lab'
import Calc from './components/Calc'
function App() {

  const [contentVisible, setContentVisible] = useState(null);
  const handleButtonClick = (content) => {
    setContentVisible(content);
  };  

  return (
    <div className="all-page">
      <Header />
      <main>
        {contentVisible === null? (
          <div className='buttons'>
            <ButtonMain isActive = {contentVisible === 'teory'} clickButton={() => handleButtonClick('teory')}>{buttonMain[0].name}</ButtonMain>
            <ButtonMain isActive = {contentVisible === 'calc'} clickButton={() => handleButtonClick('calc')}>{buttonMain[2].name}</ButtonMain>
          </div>
        ) : (
          <div>{contentVisible === 'teory' ? <Teory/> : 
                contentVisible === 'lab' ? <Lab/> : 
                contentVisible === 'calc'? <Calc/>: <p>Error!</p>}</div>
        )}
      </main>
    </div>
  )
}

export default App
