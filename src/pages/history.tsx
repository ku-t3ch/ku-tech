import cdn from '@/utils/cdn';
import { css } from '@emotion/css';
import Structure from "@/assets/KU-Tech-Structure68v2.svg";
import Image from "next/image";
import clsx from 'clsx';
import React from 'react'

const content = [
    {
        title: "ประวัติกลุ่ม",
        content: (
            <div className='flex flex-col gap-3 text-pretty'>
                กลุ่มกิจกรรมเทคโนโลยี มหาวิทยาลัยเกษตรศาสตร์ (Technology club of Kasetsart University) หรือ KU Tech ก่อตั้งขึ้นวันที่ 24 มีนาคม พ.ศ. 2566 โดยมีคณะวิทยาศาสตร์ สาขาวิทยาการคอมพิวเตอร์, คณะวิศวกรรมศาสตร์ สาขาวิศวกรรมคอมพิวเตอร์ และวิศวกรรมซอฟต์แวร์และความรู้ เป็นผู้ร่วมก่อตั้ง โดยมีอาจารย์ที่ปรึกษาได้แก่ ผศ.ดร. อุษา สัมมาพันธ์ สังกัดภาควิชาวิทยาการคอมพิวเตอร์ เป็นอาจารย์ที่ปรึกษากลุ่มกิจกรรม โดยมีเป้าหมายในการผลักดัน และพัฒนาเทคโนโลยีเพื่อแก้ไขปัญหาภายในมหาวิทยาลัยเกษตรศาสตร์พร้อมทั้งพัฒนาศักยภาพและให้ความรู้ทางด้านเทคโนโลยีให้แก่นิสิตและบุคคลทั่วไป
            </div>
        )
    },
    {
        title: "วิสัยทัศน์",
        content: (
            <div className='flex flex-col text-center text-2xl font-bold'>
                <div className='text-primary text-3xl'>Elevate Tech, Unleash Innovation</div>
                <div>ยกระดับเทคโนโลยี, ปลดปล่อยนวัตกรรม</div>
            </div>
        )
    },
    {
        title: "พันธกิจ",
        content: (
            <div className='flex flex-col gap-5'>
                <div className='grid md:grid-cols-3 grid-cols-1 gap-3 md:gap-5'>
                    <div className='w-full flex flex-col p-5 gap-3 bg-[#00204B] rounded-2xl text-center'>
                        <div className='font-bold text-2xl'>ดำเนินกิจกรรม</div>
                        <div>ดำเนินการจัดกิจกรรมพัฒนาทักษะด้านเทคโนโลยีเพื่อนิสิต และสังคม</div>
                    </div>
                    <div className='w-full flex flex-col p-5 gap-3 bg-[#00204B] rounded-2xl text-center'>
                        <div className='font-bold text-2xl'>พัฒนาเทคโนโลยี</div>
                        <div>ดำเนินการพัฒนาเทคโนโลยี เพื่อพัฒนามหาวิทยาลัยเกษตรศาสตร์</div>
                    </div>
                    <div className='w-full flex flex-col p-5 gap-3 bg-[#00204B] rounded-2xl text-center'>
                        <div className='font-bold text-2xl'>ผลักดันการแข่งขัน</div>
                        <div>สนับสนุนและส่งเสริม การแข่งขันด้านเทคโนโลยีให้แก่นิสิต</div>
                    </div>
                </div>
                {/* <div className='grid md:grid-cols-2 grid-cols-1 gap-3 md:gap-5'>
                    <img className='object-cover rounded-2xl h-[15rem] w-full' src={cdn + "/roadmap/2567/SUNTH68-SAKU.jpg"} alt="" />
                    <img className='object-cover rounded-2xl h-[15rem] w-full' src={cdn + "/roadmap/2567/NSC2024.jpg"} alt="" />
                </div> */}
            </div>
        )
    },
    {
        title: "โครงสร้างองค์กร",
        content: (
            <div className='flex flex-col text-center text-2xl font-bold'>
                <Image className='object-cover' src={Structure} alt=""></Image>
            </div>
        )
    },
{
    title: "สถานที่ตั้ง",
    content: (
       <div className='flex flex-col md:flex-row gap-6 p-6 rounded-xl w-full max-w-8xl mx-auto'>
    {/* แผนที่ Google Maps (ด้านซ้าย) */}
    <div className='w-full md:w-1/2'>
        <div className='aspect-video w-full rounded-lg overflow-hidden shadow-md'>
            <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=13.845699289222006,100.5677100450859&z=15&output=embed"
            ></iframe>
        </div>
    </div>
    
    {/* ข้อมูลองค์กร (ด้านขวา) */}
    <div className='w-full md:w-1/2 flex flex-col justify-center'>
        {/* ชื่อองค์กร */}
        <div className='text-primary font-bold text-xl md:text-2xl mb-3'>
            กลุ่มกิจกรรมเทคโนโลยี มหาวิทยาลัยเกษตรศาสตร์
        </div>
        
        {/* ที่อยู่ */}
        <div className='space-y-2 mb-4'>
            <div className='font-medium'>ชั้น 5 อาคารกิจกรรมนิสิต มหาวิทยาลัยเกษตรศาสตร์</div>
            <div>เลขที่ 50 ถนนงามวงศ์วาน แขวงลาดยาว เขตจตุจักร กรุงเทพมหานคร 10900</div>
        </div>
    </div>
</div>

    )
}

]

const cssColorGradient = css`
  background: linear-gradient(180deg, #11283a 0%, rgba(61, 23, 90, 0) 85.69%);
  height: 100%;
  z-index: 0;
`;

export default function _2566() {
    return (
        <>
            <div className="mx-auto min-h-screen max-w-[73rem] p-5 md:p-10">
                <div className="h-full">
                    <div className="flex flex-col justify-start gap-5">
                        <div className="absolute top-0 right-0 left-0 bottom-0 z-0 w-full">
                            <div className={cssColorGradient}>
                                {/* <div className={cssImageGrid}></div> */}
                            </div>
                        </div>
                        <div className={clsx('mx-auto w-full z-10 max-w-[73rem] flex-col gap-10 p-5 flex items-s')}>
                            {content.map((item, index) => (
                                <div key={index} className='flex flex-col gap-2'>
                                    <div className='text-3xl font-bold'># {item.title}</div>
                                    <div className='text-xl'>{item.content}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="bg-[#06AEEF]">sdf</div>
        <div className={cssColorGradient}>sdf</div>
            <div className={clsx('mx-auto w-full max-w-[73rem] flex-col gap-10 p-5 flex justify-center items-center')}>
                {content.map((item, index) => (
                    <div key={index} className='text-center flex flex-col gap-2'>
                        <div className='text-3xl'>{item.title}</div>
                        <div className='text-xl'>{item.content}</div>
                    </div>
                ))}
            </div> */}
        </>

    )
}
