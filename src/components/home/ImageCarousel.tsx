import { NextPage } from "next";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";
import clsx from "clsx";
import { css } from "@emotion/css";

interface Props {}

const ImageCarousel: NextPage<Props> = () => {
  return (
    <Splide
      options={{
        type: "loop",
      }}
    >
      {new Array(9).fill(0).map((_, i) => (
        <SplideSlide className="relative overflow-hidden rounded-2xl" key={i}>
          <Image
            className="h-[30rem] w-full object-cover"
            width={1080} height={1920}
            src={`/activities/${i + 1}.jpg`}
            alt={`Image ${i + 1}`}
          />
          <div
            className={clsx(
              "bg absolute bottom-0 right-0 left-0 z-30 flex flex-col items-center justify-center py-7 px-3 font-bold",
              css`
                background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.81) 0%, rgba(0, 0, 0, 0.49) 55%, rgba(0, 0, 0, 0) 100%);

                /* border-radius: 0 0 1rem 0; */
              `
            )}
          >
            <div>Tech Camp #1</div>
          </div>
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default ImageCarousel;
