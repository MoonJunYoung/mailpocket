
const Nav = () => {
  return (
    <div className="flex">
      <img className="h-6 m-5 md:w-[90px] md:mt-[10px] md:ml-[10px] md:h-[20px]"
        src="/images/MailpocketLogo.png"
        alt="Logo"
        onClick={() => (window.location.href = "/")}
      />
    </div>
  )
}

export default Nav