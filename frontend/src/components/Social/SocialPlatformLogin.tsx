import { SocialLoginForm } from "./SocialLoginForm";

const KakaoLogin = () => {
  const kakaoProps = {
    alt: "Kakao",
    src: "/images/kakao.png",
    socialLoginUrl:
      "https://kauth.kakao.com/oauth/authorize?client_id=f898615d1b15529653e04549bd5203b7&redirect_uri=https://mailpocket.site/kakao-Oauth-redirect&response_type=code",
    type: "kakao"
  };

  return <SocialLoginForm {...kakaoProps} />;
};

const NaverLogin = () => {
  const naverProps = {
    alt: "Naver",
    src: "/images/naver.png",
    socialLoginUrl:
      "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=Q9vH3BUxoFpZea90R2g3&redirect_uri=https://mailpocket.site/naver-Oauth-redirect",
    type: "naver"
  };

  return <SocialLoginForm {...naverProps} />;
};

const GoogleLogin = () => {
  const googleProps = {
    alt: "google",
    src: "/images/google.png",
    socialLoginUrl:
      "https://accounts.google.com/o/oauth2/v2/auth?response_type=token&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&client_id=398680694432-j5tr9e2uk37g7shjipa1umr40r7gsltg.apps.googleusercontent.com&redirect_uri=https://mailpocket.site/google-Oauth-redirect",
    type: "google"
  };

  return <SocialLoginForm {...googleProps} />;
};

export { KakaoLogin, NaverLogin, GoogleLogin };
