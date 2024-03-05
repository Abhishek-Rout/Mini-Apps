import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Notepad from './Pages/Notepad';
import Otpform from './Pages/Otpform';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/Notepad' element={<Notepad />} />
        <Route path='/Otpform' element={<Otpform />} />
      </Routes>
    </Router>
  );
}

export default App;
