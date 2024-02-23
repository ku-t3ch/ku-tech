import { env } from '@/env.mjs'
import { Button, Loading, Textarea } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import Turnstile from 'react-turnstile'

export default function Messaging() {
    const [value, setValue] = useState<string>("")
    const [token, setToken] = useState<string>("")
    const [key, setKey] = useState<number>(0)
    const reportApi = useMutation((message: string) => {
        return axios.post(process.env.externalApi + "/report/website",
            {
                message: message,
                token: token
            }
        )
    })

    const onFinished = () => {
        if (value === "") {
            return
        }
        reportApi.mutate(value, {
            onSuccess: () => {
                setValue("")
                setToken("")
                setKey(pre => pre + 1)
            }
        })
    }
    return (
        <div className="mx-auto flex max-w-[73rem] flex-col gap-10 md:gap-20 p-5 md:p-10 w-full">
            <div className="flex flex-col gap-5 w-full">
                <div className="prompt text-2xl w-full">
                    ช่องแสดงความเห็น และวิจารรณ์
                </div>
                <Textarea
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value)
                    }}
                    className='w-full'
                    size='lg'
                    placeholder="ความเห็น และวิจารรณ์"
                    rows={5}
                />
                <div className='flex justify-center'>
                    <Turnstile
                        key={key}
                        sitekey={process.env.turnstileSiteKey!}
                        onVerify={(token) => {
                            setToken(token)
                        }}
                    />
                </div>
                <Button onClick={onFinished} auto className='w-full'>
                    {reportApi.isLoading ? <Loading color="currentColor" size="sm" /> : "ส่ง"}
                </Button>

            </div>
        </div>
    )
}
