import React from "react";
import { Logo } from "@pmndrs/branding";
import {
  AiFillAmazonCircle,
  AiFillAndroid,
  AiFillApple,
  AiFillCamera,
  AiOutlineArrowLeft,
  AiOutlineHighlight,
  AiOutlineShopping,
} from "react-icons/ai";
import { useSnapshot } from "valtio";
import { AnimatePresence, motion } from "framer-motion";
import { state } from "./store";

const transition = { type: "spring", duration: 1.0 };
const config = {
  initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
  animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
  exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
};

export const Overlay = () => {
  const snap = useSnapshot(state);
  // console.log(snap);

  return (
    <div className="container">
      <motion.header
        initial={{ opacity: 0, y: -1 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
      >
        <Logo width={40} height={40} />
        <AiOutlineShopping size={"3em"} />
      </motion.header>

      <AnimatePresence>
        {snap.intro ? (
          <Intro key={"intro"} snap={snap} />
        ) : (
          <Customizer key={"customizer"} snap={snap} />
        )}
      </AnimatePresence>
    </div>
  );
};
const Intro = ({
  snap,
}: {
  snap: {
    intro: boolean;
    selectedColor: string;
  };
}) => {
  return (
    <motion.div className="intro" {...config}>
      <div className="contents">
        <h1
          className="title"
          style={{
            fontSize: "8rem",
            fontStyle: "italic",
            fontWeight: 900,
            fontFamily: "'Nunito Sans', sans-serif",
            letterSpacing: -6,
            width: "100%",
            whiteSpace: "pre-wrap",
            lineHeight: "8rem",
            marginTop: 0,
            marginLeft: "32px",
          }}
        >
          {`LET'S\nDO\nIT.`}
        </h1>
        <div
          className="desc"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            paddingLeft: "4rem",
            paddingBottom: "calc(128px + 6rem)",
          }}
        >
          <p style={{ fontSize: "1.5rem" }}>
            Create your unique and exclusive shirt with our brand-new 3D
            customization tool. <strong>Unleash your imagination</strong> and
            define your own style.
          </p>
          <button onClick={() => (state.intro = false)}>
            CUSTOMIZE IT <AiOutlineHighlight size="1.3em" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Customizer = ({
  snap,
}: {
  snap: {
    intro: boolean;
    selectedColor: string;
  };
}) => {
  const colors = [
    "#ccc",
    "#efbd4e",
    "#80c670",
    "#726de8",
    "#ef674e",
    "#353934",
  ];
  const decals = [<AiFillApple />, <AiFillAndroid />, <AiFillAmazonCircle />];

  return (
    <motion.section className="custom" {...config}>
      <div className="customizer">
        <div className="color-options">
          {colors.map((color) => {
            return (
              <div
                key={color}
                className="circle"
                style={{ background: color }}
                onClick={() => (state.selectedColor = color)}
              ></div>
            );
          })}
        </div>

        <div className="decals">
          <div className="decals--container">
            {decals.map((decal, index) => (
              <div key={index} className="decal">
                {decal}
              </div>
            ))}
          </div>
        </div>
        <button
          className="share"
          style={{ backgroundColor: snap.selectedColor }}
          onClick={() => {
            // TODO
            const link = document.createElement("a");
            link.setAttribute("download", "canvas.png");
            link.setAttribute(
              "href",
              document
                .querySelector("canvas")
                ?.toDataURL("image/png")
                .replace("image/png", "image/octet-stream")!
            );
            link.click();
          }}
        >
          DOWNLOAD
          <AiFillCamera />
        </button>
        <button
          className="exit"
          onClick={() => (state.intro = true)}
          style={{ backgroundColor: snap.selectedColor }}
        >
          GO BACK
          <AiOutlineArrowLeft />
        </button>
      </div>
    </motion.section>
  );
};
