import Footer from '@/components/Footer';
import cdn from '@/utils/cdn';
import { css } from '@emotion/css';
import clsx from 'clsx';
import React from 'react'

const content = [
    {
        title: "วิสัยทัศน์",
        content: (
            <div className='flex flex-col'>
                <div>“Elevate Tech, Unleash Innovation”</div>
                <div>ยกระดับเทคโนโลยี, ปลดปล่อยนวัตกรรม</div>
            </div>
        )
    },
    {
        title: "ประวัติชมรม",
        content: (
            <div className='flex flex-col gap-3 text-pretty'>
                กลุ่มกิจกรรมเทคโนโลยี มหาวิทยาลัยเกษตรศาสตร์ (Technology club of Kasetsart University) หรือ KU Tech ก่อตั้งขึ้นวันที่ 24 มีนาคม พ.ศ. 2566 โดยมีคณะวิทยาศาสตร์ สาขาวิทยาการคอมพิวเตอร์, คณะวิศวกรรมศาสตร์ สาขาวิศวกรรมคอมพิวเตอร์ และวิศวกรรมซอฟต์แวร์และความรู้ เป็นผู้ร่วมก่อตั้ง โดยมีอาจารย์ที่ปรึกษาได้แก่ ผศ.ดร. อุษา สัมมาพันธ์ สังกัดภาควิชาวิทยาการคอมพิวเตอร์ เป็นอาจารย์ที่ปรึกษากลุ่มกิจกรรม โดยมีเป้าหมายในการผลักดัน และพัฒนาเทคโนโลยีเพื่อแก้ไขปัญหาภายในมหาวิทยาลัยเกษตรศาสตร์พร้อมทั้งพัฒนาศักยภาพและให้ความรู้ทางด้านเทคโนโลยีให้แก่นิสิตและบุคคลทั่วไป
                <div>ปัจจุบันกลุ่มกิจกรรมเทคโนโลยี มหาวิทยาลัยเกษตรศาสตร์ ได้มีการดำเนินการจัดกิจกรรมตามวัตถุประสงค์ และสร้างชื่อเสียงให้มหาวิทยาลัยเกษตรศาสตร์มากมาย เช่น</div>
                <div className='flex flex-col'>
                    <div className='flex flex-col'>
                        <div className='font-bold'>ด้านกิจกรรม</div>
                        <ul className="list-disc">
                            <li>Tech Camp #1 เป็นกิจกรรมออกค่ายสอนโค้ดดิ้งน้อง ๆ ระดับมัธยมศึกษา โดยมุ่งเน้นโรงเรียนนอกกรุงเทพมหานครฯ เพื่อลดความเหลื่อมล้ำทางด้านการศึกษา</li>
                            <li>Tech Talk #1 เป็นกิจกรรมอบรมเชิงปฏิบัติการ เพื่อพัฒนาทักษะทางด้านเทคโนโลยีให้แก่นิสิตมหาวิทยาลัยเกษตรศาสตร์</li>
                            <li>KU Hackathon 2566 เป็นกิจกรรมระดมความคิด ไอเดีย เพื่อแก้ไขปัญหาภายในมหาวิทยาลัยเกษตรศาสตร์ด้วยเทคโนโลยีต่อไป</li>
                        </ul>
                    </div>
                    <div className='flex flex-col'>
                        <div className='font-bold'>ด้านเทคโนโลยี</div>
                        <ul className="list-disc">
                            <li>POP KU เป็นกิจกรรมแข่งขันผ่านเกม PopCat ระหว่างทุกคณะภายในมหาวิทยาลัยเกษตรศาสตร์ ภายในระยะเวลา 3 วัน ในช่วงของเปิดโลกกิจกรรม</li>
                            <li>KU Loy Krathong เว็บไซต์ลอยกระทงออนไลน์ ในธีมของมหาวิทยาลัยเกษตรศาสตร์ ลดโลกร้อน มุ่งสู่การพัฒนาอย่างยั่งยืน</li>
                            <li>KU SD Online โครงการพัฒนาระบบขออนุมัติโครงการออนไลน์ เพื่ออำนวยความสะดวกให้แก่นิสิตในการยื่นคำร้องขอจัดทำกิจกรรม</li>
                        </ul>
                    </div>
                    <div className='flex flex-col'>
                        <div className='font-bold'>ด้านพัฒนาทักษะ</div>
                        <ul className="list-disc">
                            <li>CTF Cyber โครงการแข่งขัน Capture the Flag ของกองทัพไทย โดยกลุ่มกิจกรรมเราได้เปิดโอกาสให้นิสิตภายในกลุ่มกิจกรรมได้เข้าร่วมแข่งขัน เพื่อฝึกฝีมือนอกห้องเรียน</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    },
    {
        title: "พันธกิจ",
        content: (
            <div className='flex flex-col gap-5'>
                <div className='grid md:grid-cols-3 grid-cols-1 gap-3 md:gap-5'>
                    <div className='w-full flex flex-col p-5 gap-3 bg-[#00204B] rounded-2xl text-center'>
                        <div className='font-bold text-2xl'>สนับสนุนการเรียนรู้</div>
                        <div>สร้างสภาพแวดล้อมที่ส่งเสริมการแลกเปลี่ยนความรู้และประสบการณ์ในด้านเทคโนโลยี</div>
                    </div>
                    <div className='w-full flex flex-col p-5 gap-3 bg-[#00204B] rounded-2xl text-center'>
                        <div className='font-bold text-2xl'>สนับสนุนการพัฒนาทักษะ</div>
                        <div>เปิดพื้นที่ให้โอกาสแก่นิสิตในการพัฒนาทักษะทางเทคโนโลยีและการนำเสนอผลงาน</div>
                    </div>
                    <div className='w-full flex flex-col p-5 gap-3 bg-[#00204B] rounded-2xl text-center'>
                        <div className='font-bold text-2xl'>ส่งเสริมนวัตกรรม</div>
                        <div>กระตุ้นและสนับสนุนการพัฒนานวัตกรรมในรูปแบบต่างๆ ที่เกี่ยวข้องกับเทคโนโลยี</div>
                    </div>
                </div>
                <div className='grid md:grid-cols-2 grid-cols-1 gap-3 md:gap-5'>
                    <img className='object-cover rounded-2xl h-[15rem] w-full' src={cdn + "/roadmap/2566/roadmap1.webp"} alt="" />
                    <img className='object-cover rounded-2xl h-[15rem] w-full' src={cdn + "/roadmap/2566/roadmap2.webp"} alt="" />
                </div>
            </div>
        )
    },
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
