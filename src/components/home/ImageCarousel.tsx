import { NextPage } from "next";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";
import clsx from "clsx";
import { css } from "@emotion/css";

interface Props {}

const data = [
  {
    title: "First Meet 2023",
    date: "12 กรกฎาคม 2566",
    images: [
      "https://s3.tech.nisit.ku.ac.th/activities/firstmeet/2023/01.jpg",
      "https://s3.tech.nisit.ku.ac.th/activities/firstmeet/2023/IMG_5384.jpg",
      "https://s3.tech.nisit.ku.ac.th/activities/firstmeet/2023/IMG_5388.jpg",
    ],
  },
  {
    title: "Tech Camp #1",
    date: "17 มิถุนายน 2566",
    images: [
      "https://s3.tech.nisit.ku.ac.th/activities/techcamp/2023/9.jpg",
      "https://s3.tech.nisit.ku.ac.th/activities/techcamp/2023/1.jpg",
      "https://s3.tech.nisit.ku.ac.th/activities/techcamp/2023/5.jpg",
    ],
  },
  {
    title: "Tech Camp #2",
    date: "15 กันยายน 2566",
    images: [
      "https://s3.tech.nisit.ku.ac.th/activities/google-app-sheet/1.jpeg",
      "https://s3.tech.nisit.ku.ac.th/activities/google-app-sheet/2.jpeg",
      "https://s3.tech.nisit.ku.ac.th/activities/google-app-sheet/3.jpeg",
    ],
  },
  {
    title: "KU Hackathon (Matching Teams)",
    date: "15 พฤษจิกายน 2566",
    images: [
      "https://s3.tech.nisit.ku.ac.th/activities/ku-hackathon/1.jpeg",
      "https://s3.tech.nisit.ku.ac.th/activities/ku-hackathon/2.jpeg",
      "https://s3.tech.nisit.ku.ac.th/activities/ku-hackathon/3.jpeg",
    ],
  },
];

const ImageCarousel: NextPage<Props> = () => {
  return (
    <Splide>
      {data.map((d, i) =>
        d.images.map((img, j) => (
          <SplideSlide className="relative overflow-hidden rounded-2xl" key={i + j}>
            <Image
              className="h-[30rem] w-full object-cover"
              width={0}
              height={0}
              sizes="100vw"
              src={img}
              alt={d.title}
            />
            <div
              className={clsx(
                "bg absolute bottom-0 right-0 left-0 z-30 flex flex-col items-center justify-center py-7 px-3 font-bold",
                css`
                  background-image: linear-gradient(
                    0deg,
                    rgba(0, 0, 0, 0.81) 0%,
                    rgba(0, 0, 0, 0.49) 55%,
                    rgba(0, 0, 0, 0) 100%
                  );
                `
              )}
            >
              <div
                className={css`
                  line-height: 1.5rem;
                `}
              >
                {d.title}
              </div>
              <div className="text-sm font-light">{d.date}</div>
            </div>
          </SplideSlide>
        ))
      )}
    </Splide>
  );
};

export default ImageCarousel;
