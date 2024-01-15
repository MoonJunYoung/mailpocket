import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { postSignUpData } from '../../api/api'
import Nav from '../Nav'
import Symbol from '../Symbol'


const SignUp = () => {

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    name: ""
  })
  const [notAllow, setNotAllow] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const navigate = useNavigate();


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
      Cookies.set("authToken", response.data, {
        expires: 30,
      });
      navigate("/Subscribe");
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

  return (
    <div>
      <Nav />
      <div className='basecontainer'>
        <Symbol />
        <div className='basecontainer-submitcontainer signup-container'>
          <form className='authcontainer-submit' onSubmit={handleSubmit}>
            <p className='authcontainer-submit_title'>
              회원가입
            </p>
            <p className='authcontainer-submit_coment'>
              아이디
            </p>
            <div className='authcontainer-submit_box'>
              <input className='authcontainer-submit_data'
                type="text"
                name="identifier"
                value={formData.identifier}
                onChange={handleInputChange}
              />
            </div>
            <p className='authcontainer-submit_coment'>
              비밀번호
            </p>
            <div className='authcontainer-submit_box'>
              <input className='authcontainer-submit_data'
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            {!isPasswordValid && formData.password.length > 0 && (
              <div className='mt-2 text-customPurple font-bold h-9 text-lg md:text-sm'>
                비밀번호는 소문자, 숫자, 특수문자를 포함 하고 최소 8자 이상 이어야
                합니다.
              </div>
            )}  
            <p className='authcontainer-submit_coment'>
              이름
            </p>
            <div className='authcontainer-submit_box'>
              <input className='authcontainer-submit_data'
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <button className='basecontainer-submitdata'  type="submit" disabled={notAllow}>
              시작하기
            </button>
          </form>
          <div>
            <span className='auth-guidecoment'>이미 아이디가 있으신가요?</span>
            <Link className='auth-link' to="/sign-in">로그인 하기</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp