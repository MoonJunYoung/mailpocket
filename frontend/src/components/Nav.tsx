import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";



const Nav = () => {

  return (
    <div className="flex items-center justify-between">
      <img className="h-6 m-5 md:w-[90px] md:mt-[10px] md:ml-[10px] md:h-[20px]"
        src="/images/MailpocketLogo.png"
        alt="Logo"
        onClick={() => (window.location.href = "/")}
      />
    </div>
  )
}

export default Nav