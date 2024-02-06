import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { postSignUpData, Token } from '../../api/api'
import { AmplitudeSetUserId, sendEventToAmplitude } from '../Amplitude'
import Nav from '../Nav'
import { GoogleLogin, KakaoLogin, NaverLogin } from '../Social/SocialPlatformLogin'
import Symbol from '../Symbol'


const SignUp = () => {

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  })
  const [notAllow, setNotAllow] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const navigate = useNavigate();
  const authToken = Token();


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })

    if (name === "password") {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
      const isValid = passwordRegex.test(value);
      setIsPasswordValid(isValid);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await postSignUpData(formData);
      if (response.status === 201) {
        Cookies.set("authToken", response.data, {
          expires: 30,
        });
        await AmplitudeSetUserId()
        sendEventToAmplitude("complete sign up", "")
        navigate("/subscribe");
      }

    } catch (error) {
      alert("실패했습니다. 다시 시도하세요.");
    }
  };

  useEffect(() => {
    if (isPasswordValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [isPasswordValid]);

  useEffect(() => {
    if (authToken) {
      navigate("/");
    } else {
      sendEventToAmplitude('view sign up', '');
    }
  }, [authToken, navigate]);



  return (
    <div className='text-center mx-auto max-w-900 h-auto'>
      <Nav />
      <div className='basecontainer'>
        <Symbol />
        <div className='basecontainer-submitcontainer signin-container' style={{ boxShadow: "-1px 5px 11px 1px lightgray" }}>
          <form className='authcontainer-submit' onSubmit={handleSubmit}>
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
              <input className='authcontainer-submit_data placeholder-gray-500  placeholder:font-bold'
                type="text"
                name="identifier"
                placeholder=' 이메일'
                value={formData.identifier}
                onChange={handleInputChange}
              />
            </div>
            <div className='authcontainer-submit_box'>
              <input className='authcontainer-submit_data placeholder-gray-500  placeholder:font-bold'
                type="password"
                name="password"
                placeholder=' 비밀번호'
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            {!isPasswordValid && formData.password.length > 0 && (
              <div className='mt-2 text-customPurple font-bold h-9  text-[13px] md:text-sm'>
                비밀번호는 소문자, 숫자, 특수문자를 포함 하고 최소 8자 이상 이어야
                합니다.
              </div>
            )}
            <button className='basecontainer-submitdata' type="submit" disabled={notAllow}>
              회원가입
            </button>
          </form>
          <div className='mb-7'>
            <span className='auth-guidecoment'>이미 아이디가 있으신가요?</span>
            <Link className='auth-link' to="/sign-in">로그인 하기</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp