import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import MyPage from "./pages/MyPage";
import MobileReadPage from "./mobile/MobileReadPage";
import Subscribe from "./pages/SubscribePage";
import SignIn from "./components/Auth/SignIn";
import SingUp from "./components/Auth/SignUp";
import RedirectMypage from "./components/RedirectMypage";
import ReadPage from "./pages/ReadPage";
import LandingPage from "./pages/LandingPage";
import { useEffect, useState } from "react";
import {
  AmplitudeSetUserId,
  initializeAmplitude,
} from "./components/Amplitude";
import PageLoding from "./components/PageLoding";
import { Token, getUserData } from "./api/api";
import {
  GooglesRedirect,
  KakaoRedirect,
  NaverRedirect,
} from "./components/Oauth/SocialPlatformRedirect";
import MobileMyPage from "./mobile/MobileMyPage";
import MobileSubscribe from "./mobile/MobileSubscribe";

export const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );


function App() {
  const [amplitudeInitialized, setAmplitudeInitialized] = useState(false);
  if (
    parser.getDevice().type === "mobile" &&
    !window.location.pathname.includes("mobile")
  ) {
    window.location.href = `/mobile${window.location.pathname}${window.location.search}`;
  }

  useEffect(() => {
    const initializeAndSetUserId = async () => {
      try {
        await initializeAmplitude();
        setAmplitudeInitialized(true);
        await AmplitudeSetUserId();
      } catch (error) {
        console.error("Error in initialization:", error);
      }
    };

    initializeAndSetUserId();
  }, []);



  return (
    <div className={amplitudeInitialized ? "" : "flex justify-center"}>
      {amplitudeInitialized ? (
        <Router>
          <Routes>
            <Route index element={<MyPage />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SingUp />} />
            <Route path="/kakao-oauth-redirect" element={<KakaoRedirect />} />
            <Route path="/naver-oauth-redirect" element={<NaverRedirect />} />
            <Route
              path="/google-oauth-redirect"
              element={<GooglesRedirect />}
            />
            <Route path="/slack-oauth" element={<RedirectMypage />} />
            <Route path="/read" element={<ReadPage />} />
            <Route path="/subscribe" element={<Subscribe />} />
            <Route path="/landingpage" element={<LandingPage />} />
            <Route path="/mobile/read" element={<MobileReadPage />} />
            <Route path="/mobile" index element={<MobileMyPage />} />
            <Route path="/mobile/subscribe" element={<MobileSubscribe />} />
          </Routes>
        </Router>
      ) : (
        <PageLoding />
      )}
    </div>
  );
}

export default App;
