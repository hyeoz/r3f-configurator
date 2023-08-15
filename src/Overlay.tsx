import React from "react";
import { Logo } from "@pmndrs/branding";
import { AiOutlineShopping } from "react-icons/ai";

export const Overlay = () => {
  return <Intro />;
};

const Intro = () => {
  return (
    <div className="container">
      <header>
        <Logo width={40} height={40} />
        <AiOutlineShopping size={"3em"} />
      </header>
    </div>
  );
};
