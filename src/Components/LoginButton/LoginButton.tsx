import React from 'react';

interface LoginButtonProps {
  image: string;
  loginType: string;
  href: string;
}

function LoginButton({ image, loginType, href }: LoginButtonProps) {
  return (
    <div className="pt-4">
      <a href={href}>
        <button className="flex px-2 py-2 text-xl text-black bg-white rounded-lg w-80 items-left drop-shadow-xl hover:bg-zinc-50 active:bg-zinc-50 focus:outline-none focus:ring focus:ring-zinc-50">
          <img className="mx-4" width="24px" height="24px" src={image} />
          {loginType}
        </button>
      </a>
    </div>
  );
}

export default LoginButton;
