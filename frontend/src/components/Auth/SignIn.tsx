import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { postSignInData } from '../../api/api'
import Nav from '../Nav'
import Symbol from '../Symbol'

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`


const FormContainer = styled.div`
  border: 1px solid white;
  margin-top: 40px;
  border-radius: 15px;
  background-color: white;
  height: 550px;
  width: 450px;
  @media (max-width: 760px) {
    height: 420px;
    width: 350px;
    }
`
const InputContainer = styled.form`
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: 760px) {
    padding: 20px;
    }
`
const AuthTitle = styled.p`
  margin: 10px 0px;
  font-size: 35px;
  font-weight: 800;
  @media (max-width: 760px) {
    font-size: 25px;
    }
`
const AuthComent = styled.p`
  font-size: 20px;
  font-weight: bold;
  @media (max-width: 760px) {
    font-size: 18px;
    }
`

const InputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 55px;
  border-radius: 10px;
  background-color: whitesmoke;
  @media (max-width: 760px) {
    height: 45px;
    }
`

const Input = styled.input`
  width: 330px;
  height: 35px;
  border: none;
  font-size: 20px;
  background-color: whitesmoke;
  @media (max-width: 760px) {
    width: 280px;
    height: 25px;
    font-size: 15px;
    }
`


const SignInButton = styled.button`
  width: 100%;
  margin-top: 30px;
  height: 50px;
  border-radius: 8px;
  border: none;
  background-color: #8F20FF;
  color: white;
  font-size: 18px;
  font-weight: 700;
`


const SignGuideContainer = styled.div`
  
`

const SignUpGuideComent = styled.span`
  font-size: 18px;
  font-weight: bold;
  margin-right: 5px;
  @media (max-width: 760px) {
    font-size: 15px;
    }
`

const SignUpLink = styled(Link)`
  font-size: 18px;
  text-decoration: none;
  font-weight: bold;
  color: #8F20FF;
  position: relative;
  @media (max-width: 760px) {
    font-size: 15px;
    }
`

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
      <SignInContainer>
        <Symbol />
        <FormContainer>
          <InputContainer onSubmit={handleSubmit}>
            <AuthTitle>
              로그인
            </AuthTitle>
            <AuthComent>
              아이디
            </AuthComent>
            <InputBox>
              <Input
                type="text"
                name="identifier"
                value={formData.identifier}
                onChange={handleInputChange}
              />
            </InputBox>
            <AuthComent>
              비밀번호
            </AuthComent>
            <InputBox>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </InputBox>
            <SignInButton type="submit" disabled={notAllow}>
              완료
            </SignInButton>
          </InputContainer>
          <SignGuideContainer>
            <SignUpGuideComent>아이디가 없으신가요?</SignUpGuideComent>
            <SignUpLink to="/sign-up">10초만에 가입하기</SignUpLink>
          </SignGuideContainer>
        </FormContainer>
      </SignInContainer>
    </div>
  )
}

export default SignIn