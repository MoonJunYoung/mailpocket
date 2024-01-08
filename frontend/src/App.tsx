import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SignIn from './components/Auth/SignIn';
import SingUp from './components/Auth/SingUp';
import MyPage from "./pages/MyPage";


function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SingUp />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route index element={<MainPage />} />
      </Routes>
    </Router>
  </div>
  );
}

export default App;
