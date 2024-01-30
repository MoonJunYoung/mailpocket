import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyPage from "./pages/MyPage";
import Subscribe from "./pages/SubscribePage";
import SignIn from './components/Auth/SignIn';
import SingUp from './components/Auth/SignUp';
import RedirectMypage from './components/RedirectMypage';
import ReadPage from "./pages/ReadPage";
import LandingPage from './pages/LandingPage';
import { useEffect, useState } from 'react';
import { initializeAmplitude } from './components/Amplitude';
import PageLoding from './components/PageLoding';



function App() {
  const [amplitudeinitialized, setAmplitudeInitialized] = useState(false)


  useEffect(() => {
    initializeAmplitude().then(() => {
      setAmplitudeInitialized(true);
    })
  }, []);


  return (
    <div className={amplitudeinitialized ? '' : 'flex justify-center'}>
      {amplitudeinitialized ? <Router>
        <Routes>
          <Route index element={<MyPage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SingUp />} />
          <Route path="/slack-oauth" element={<RedirectMypage />} />
          <Route path="/read" element={<ReadPage />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/landingpage" element={<LandingPage />} />
        </Routes>
      </Router> : <PageLoding />}
    </div>
  );
}

export default App;
