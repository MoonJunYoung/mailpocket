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
import { GooglesRedirect, KakaoRedirect, NaverRedirect } from './components/Oauth/SocialPlatformRedirect';



function App() {
  const [amplitudeInitialized, setAmplitudeInitialized] = useState(false);

  useEffect(() => {
    const initializeAndSetUserId = async () => {
      try {
        await initializeAmplitude();
        setAmplitudeInitialized(true);

        const authToken = Token();

        if (authToken) {
          const userInfo = await getUserData();
          amplitude.getInstance().setUserId(userInfo.data.id);
        }
      } catch (error) {
        console.error('Error in initialization:', error);
      }
    };

    initializeAndSetUserId();
  }, []);

  return (
    <div className={amplitudeInitialized ? '' : 'flex justify-center'}>
      {amplitudeInitialized ? <Router>
        <Routes>
          <Route index element={<MyPage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SingUp />} />
          <Route path="/kakao-oauth-redirect" element={<KakaoRedirect />} />
          <Route path="/naver-oauth-redirect" element={<NaverRedirect />} />
          <Route path="/google-oauth-redirect" element={<GooglesRedirect />} />
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
