import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { postSignInData } from '../../api/api'
import { sendEventToAmplitude, AmplitudeSetUserId } from '../Amplitude'
import Nav from '../Nav'
import Symbol from '../Symbol'


const SignIn = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: ""
  })
  const [notAllow, setNotAllow] = useState(true);

  const navigate = useNavigate();


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  };




  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await postSignInData(formData);
      if (response.status === 201) {
        sendEventToAmplitude("complete sign in", "")
        Cookies.set("authToken", response.data, {
          expires: 30,
        });
        AmplitudeSetUserId()
        navigate("/");
      } else {
        alert("아이디 및 비밀번호를 확인해주세요.")
      }
    } catch (error) {
      alert("실패했습니다. 다시 시도하세요.");
    }
  };


  useEffect(() => {
    if (formData.identifier.length > 0 && formData.password.length > 0) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [formData]);

  useEffect(() => {
    sendEventToAmplitude('view sign in', '');
  }, []);

  return (
    <div className='text-center mx-auto max-w-900 h-auto'>
      <Nav />
      <div className='basecontainer'>
        <Symbol />
        <div className='basecontainer-submitcontainer signin-container'>
          <form className='authcontainer-submit' onSubmit={handleSubmit}>
            <p className='authcontainer-submit_title'>
              Sign In
            </p>

            <div className='authcontainer-submit_box my-4'>
              <input className='authcontainer-submit_data'
                type="text"
                name="identifier"
                value={formData.identifier}
                placeholder=' Id'
                onChange={handleInputChange}
              />
            </div>

            <div className='authcontainer-submit_box'>
              <input className='authcontainer-submit_data'
                type="password"
                name="password"
                placeholder=' Password'
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <button className='basecontainer-submitdata' type="submit" disabled={notAllow}>
              완료
            </button>
          </form>
          <div className='mt-6'>
            <span className='auth-guidecoment'>아이디가 없으신가요?</span>
            <Link className='auth-link' to="/sign-up">10초만에 가입하기</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn



