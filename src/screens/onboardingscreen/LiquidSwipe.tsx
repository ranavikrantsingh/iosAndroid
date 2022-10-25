import React, { useState } from "react";
import Slider from "./components/Slider";
import Slide from "./components/Slide";

const slides = [
  {
    color: "#F2A1AD",
    title: "Hey There!",
    description:"Rana here",
    picture:   require('../../assets/animations/robot.json'),

  },
  {
    color: "#0090D6",
    title: "Wallet",
    description:
      "Discover your wallet",
      picture:   require('../../assets/animations/Wallet.json'),

  },
  {
    color: "#69C743",
    title: "Easy Orders",
    description:
      "explore recipes by food type, preparation method, cuisine, country and more",
      picture:   require('../../assets/animations/CartActive.json'),

  },
  {
    color: "#FB3A4D",
    title: "10000+ Recipes",
    description:
      "Browse thousands of curated recipes from top chefs, each with detailled cooking instructions",
      picture:   require('../../assets/animations/pencil-animation.json'),

  },
  {
    color: "#F2AD62",
    title: "Video Tutorials",
    description:
      "Browse our best themed recipes, cooking tips, and how-to food video & photos",
    picture:   require('../../assets/animations/bell.json'),
  },
  
];

export const assets = slides.map(({ picture }) => picture);

const LiquidSwipe = () => {
  const [index, setIndex] = useState(0);
  const prev = slides[index - 1];
  const next = slides[index + 1];
  return (
    <Slider
      key={index}
      index={index}
      setIndex={setIndex}
      prev={prev && <Slide slide={prev} />}
      next={next && <Slide slide={next} />}
    >
      <Slide slide={slides[index]!} />
    </Slider>
  );
};

export default LiquidSwipe;