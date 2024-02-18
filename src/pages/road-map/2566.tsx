import React from 'react'

const content = [
    {
        title: "วิสัยทัศน์",
        content: "2566"
    }
]

export default function _2566() {
    return (
        <div className='mx-auto w-full max-w-[73rem] flex-col gap-10 p-5 '>
            {content.map((item, index) => (
                <div key={index}>
                    <div className='text-2xl'>{item.title}</div>
                    <div>{item.content}</div>
                </div>
            ))}
        </div>
    )
}
