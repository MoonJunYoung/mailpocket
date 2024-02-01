import { sendEventToAmplitude } from "../Amplitude";



interface SocialLoginFormType {
  alt: string,
  src: string,
  socialLoginUrl: string,
  type: string
}

export const SocialLoginForm = ({
  alt,
  src,
  socialLoginUrl,
  type
}: SocialLoginFormType) => {
  const handleSocialLogin = () => {
    sendEventToAmplitude("click 3rd party sign in", { "provider type": type })
    window.location.href = socialLoginUrl;
  };

  return (
    <div className=" cursor-pointer hover:scale-110 transition-transform" onClick={handleSocialLogin}>
      <img className="w-10 h-10 rounded-3xl" alt={alt} src={src} />
    </div>
  );
};

