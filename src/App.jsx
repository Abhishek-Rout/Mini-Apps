import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Notepad from './Notepad/Notepad';
import Otpform from './Otp-input/Otpform';
import UrlShortner from './UrlShortner/UrlShortner';
import MotionSimulator from './MotionSimulator/MotionSimulator';
import WeatherApp from './WeatherApp/WeatherApp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/notepad' element={<Notepad />} />
        <Route path='/otpform' element={<Otpform />} />
        <Route path='/short.io' element={<UrlShortner />} />
        <Route path='/simulator' element={<MotionSimulator />} />
        <Route path='/weather' element={<WeatherApp />} />
      </Routes>
    </Router>
  );
}

export default App;
