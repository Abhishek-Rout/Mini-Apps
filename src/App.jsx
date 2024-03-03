import NotePad from './Pages/Notepad'
import Otpform from './Pages/Otpform';
import {Route, Link} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Route exact path='/Notepad' component={NotePad} />
      <Route exact path='/Otpform' component={Otpform} />
    </div>
  )
}

export default App;
