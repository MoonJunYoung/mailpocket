import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyPage from "./pages/MyPage";
import Subscribe from "./pages/SubscribePage";
import SignIn from './components/Auth/SignIn';
import SingUp from './components/Auth/SingUp';
import RedirectMypage from './components/RedirectMypage';
import ReadPage from "./pages/ReadPage";
import LandingPage from './pages/LandingPage';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route index element={<MyPage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SingUp />} />
          <Route path="/slack-oauth" element={<RedirectMypage />} />
          <Route path="/read" element={<ReadPage />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/landingpage" element={<LandingPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
