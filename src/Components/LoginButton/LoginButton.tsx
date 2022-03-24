interface LoginButtonProps {
  image: string;
  loginType: string;
  href?: string;
  onClick?: () => void;
}

function LoginButton({
  image,
  href,
  loginType,
  onClick,
  ...props
}: LoginButtonProps) {
  return (
    <div className="pt-4" onClick={onClick}>
      <a href={href}>
        <button
          className="flex px-2 py-2 text-xl text-black bg-white rounded-lg w-80 items-left drop-shadow-xl hover:bg-zinc-50 active:bg-zinc-50 focus:outline-none focus:ring focus:ring-zinc-50"
          {...props}
        >
          <img className="mx-4" width="24px" height="24px" src={image} />
          {loginType}
        </button>
      </a>
    </div>
  );
}

export default LoginButton;
