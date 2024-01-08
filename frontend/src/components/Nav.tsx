import styled from "styled-components";

const LogoContainer = styled.div`
  display: flex;
`

const Logo = styled.a`
  img {
    width: 180px;
    height: 40px;
    margin: 20px;
    @media (max-width: 760px) {
      width: 90px;
      margin: 10px 0px 0px 10px;
      height: 20px;
    }
  }
`

const Nav = () => {
  return (
      <LogoContainer>
        <Logo>
          <img
            src="/images/MailpocketLogo.png"
            alt="Logo"
            onClick={() => (window.location.href = "/")}
          />
        </Logo>
      </LogoContainer>
  )
}

export default Nav