import { NextPage } from "next";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";
import clsx from "clsx";
import { css } from "@emotion/css";

interface Props { }

const data = [
    {
        title: "Tech Camp #2",
        date: "9-12 มิถุนายน 2567",
        images: [
            "https://s3.tech.nisit.ku.ac.th/activities/techcamp/2/TC2 (2).jpg",
            "https://s3.tech.nisit.ku.ac.th/activities/techcamp/2/TC2 (1).jpg",
            "https://s3.tech.nisit.ku.ac.th/activities/techcamp/2/TC2 (3).jpg"
        ],
    },
    {
        title: "Tech Camp #3",
        date: "29-30 มิถุนายน 2567",
        images: [
            "https://s3.tech.nisit.ku.ac.th/activities/techcamp/3/TC3 (3).jpg",
            "https://s3.tech.nisit.ku.ac.th/activities/techcamp/3/TC3 (2).jpg",
            "https://s3.tech.nisit.ku.ac.th/activities/techcamp/3/TC3 (1).jpg"
        ],
    },
    {
        title: "First Meet 2024",
        date: "24 กรกฎาคม 2567",
        images: [
            "https://s3.tech.nisit.ku.ac.th/activities/firstmeet/2024/FM2024 (3).jpg",
            "https://s3.tech.nisit.ku.ac.th/activities/firstmeet/2024/FM2024 (4).jpg",
            "https://s3.tech.nisit.ku.ac.th/activities/firstmeet/2024/FM2024 (1).jpg"
        ],
    }
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
