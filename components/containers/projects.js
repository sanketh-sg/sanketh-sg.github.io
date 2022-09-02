import React from "react";
import Carousel from "react-elastic-carousel";
import { projects } from "../../data";
import Card from "../core/Card";
import useWindowSize from "../useWindowSize";

export default function Projects() {
  const { width } = useWindowSize();
  const isWide = width > 750 ? true : false;
  return (
    <div className="projects row bg-container">
      <div className="container w-50 text-center mt-3 mb-0">
        <h1 className="text-white text-xxl-center">
          My Recent <span>Works</span>
        </h1>
        <p className="text-white">
          Here are a few projects I&apos;ve worked on recently...
        </p>
      </div>
      <Carousel
        itemsToShow={isWide ? 3 : 1}
        itemPadding={[20, 20, 20, 20]}
        style={{ padding: "0px 50px 0px 0px" }}
        showArrows={isWide}
      >
        {projects.map((project, index) => {
          const { title, imgSrc, desc, link } = project;
          return (
            <Card
              key={index}
              title={title}
              imgSrc={imgSrc}
              desc={desc}
              link={link}
            />
          );
        })}
      </Carousel>
    </div>
  );
}
