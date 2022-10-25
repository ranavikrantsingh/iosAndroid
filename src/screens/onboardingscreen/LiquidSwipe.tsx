import React, { useState } from "react";
import Slider from "./components/Slider";
import Slide from "./components/Slide";

const slides = [
  {
    color: "#F2A1AD",
    title: "Dessert Recipes",
    description:
      "Hot or cold, our dessert recipes can turn an average meal into a memorable event",
    picture:   'https://honcimagecdn.s3.ap-south-1.amazonaws.com/1666539724958-productImg.jpeg',

  },
  {
    color: "#0090D6",
    title: "Healthy Foods",
    description:
      "Discover healthy recipes that are easy to do with detailed cooking instructions from top chefs",
    picture:  'https://honcimagecdn.s3.ap-south-1.amazonaws.com/1666539724958-productImg.jpeg',

  },
  {
    color: "#69C743",
    title: "Easy Meal Ideas",
    description:
      "explore recipes by food type, preparation method, cuisine, country and more",
    picture:  'https://honcimagecdn.s3.ap-south-1.amazonaws.com/1666539724958-productImg.jpeg',

  },
  {
    color: "#FB3A4D",
    title: "10000+ Recipes",
    description:
      "Browse thousands of curated recipes from top chefs, each with detailled cooking instructions",
    picture:   'https://honcimagecdn.s3.ap-south-1.amazonaws.com/1666539724958-productImg.jpeg',

  },
  {
    color: "#F2AD62",
    title: "Video Tutorials",
    description:
      "Browse our best themed recipes, cooking tips, and how-to food video & photos",
    picture:   'https://honcimagecdn.s3.ap-south-1.amazonaws.com/1666539724958-productImg.jpeg',

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