import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { postSignInData, Token } from '../../api/api'
import { AmplitudeSetUserId, sendEventToAmplitude } from '../Amplitude'
import Nav from '../Nav'
import { GoogleLogin, KakaoLogin, NaverLogin } from '../Social/SocialPlatformLogin'
import Symbol from '../Symbol'


const SignIn = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: ""
  })
  const [notAllow, setNotAllow] = useState(true);

  const navigate = useNavigate();
  const authToken = Token();


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  };

  useEffect(() => {
    if (authToken) {
      navigate("/");
    } else {
      sendEventToAmplitude('view sign in', '');
    }
  }, [authToken, navigate]);



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await postSignInData(formData);
      if (response.status === 201) {
        Cookies.set("authToken", response.data, {
          expires: 30,
        });
        await AmplitudeSetUserId()
        sendEventToAmplitude("complete sign in", "")
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

  return (
    <div className='text-center mx-auto max-w-900 h-auto'>
      <Nav />
      <div className='basecontainer'>
        <Symbol />
        <div className='basecontainer-submitcontainer signin-container' style={{ boxShadow: "-1px 5px 11px 1px lightgray" }}>
          <form className='authcontainer-submit ' onSubmit={handleSubmit}>
            <div>
              <p className='authcontainer-submit_title'>
                뉴스레터 3줄 요약
              </p>
              <p className='text-gray-400  text-xs  font-semibold'>
                긴 내용도 지루하지 않도록
              </p>
            </div>
            <div className='flex flex-col justify-center items-centerf gap-5  w-full mt-6'>
              <KakaoLogin />
              {navigator.userAgent.includes("KAKAOTALK") ? null : <GoogleLogin />}
              <NaverLogin />
            </div>
            <div className='mt-4 mb-1 text-gray-400  text-xs  font-semibold'>또는</div>
            <div className='authcontainer-submit_box my-4'>
              <input className='authcontainer-submit_data  placeholder-gray-500  placeholder:font-bold'
                type="text"
                name="identifier"
                value={formData.identifier}
                placeholder=' 이메일'
                onChange={handleInputChange}
              />
            </div>

            <div className='authcontainer-submit_box'>
              <input className='authcontainer-submit_data  placeholder-gray-500  placeholder:font-bold'
                type="password"
                name="password"
                placeholder=' 비밀번호'
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <button className='basecontainer-submitdata' type="submit" disabled={notAllow}>
              로그인
            </button>
          </form>
          <div className='mb-7'>
            <span className='auth-guidecoment'>아이디가 없으신가요?</span>
            <Link className='auth-link' to="/sign-up">10초만에 가입하기</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn



