import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { postSignInData } from '../../api/api'
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
        Cookies.set("authToken", response.data, {
          expires: 30,
        });
        navigate("/mypage");
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
    <div>
      <Nav />
      <div className='basecontainer'>
        <Symbol />
        <div className='basecontainer-submitcontainer signin-container'>
          <form className='authcontainer-submit' onSubmit={handleSubmit}>
            <p className='authcontainer-submit_title'>
              로그인
            </p>
            <p className='authcontainer-submit_coment '>
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
            <p className='authcontainer-submit_coment '>
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
            <button className='basecontainer-submitdata' type="submit" disabled={notAllow}>
              완료
            </button>
          </form>
          <div>
            <span className='auth-guidecoment'>아이디가 없으신가요?</span>
            <Link className='auth-link' to="/sign-up">10초만에 가입하기</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn



