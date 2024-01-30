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
import { Token, getUserData } from './api/api';
import amplitude from 'amplitude-js';




function App() {
  const [amplitudeInitialized, setAmplitudeInitialized] = useState(false);
  const token = Token();

  useEffect(() => {
    initializeAmplitude().then(() => {
      setAmplitudeInitialized(true);
    })
  }, [amplitudeInitialized]);


  useEffect(() => {
    const setUserIdWithEmail = async () => {
      if (token) {
        try {
          const userInfo = await getUserData();
          if (userInfo.data && userInfo.data.identifier) {
            amplitude.getInstance().setUserId(userInfo.data.identifier);
          }
        } catch (error) {
          console.error('사용자 정보 가져오기 중 오류 발생:', error);
        }
      }
    };
    setUserIdWithEmail();
  }, [token]);


  return (
    <div className={amplitudeInitialized ? '' : 'flex justify-center'}>
      {amplitudeInitialized ? <Router>
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
