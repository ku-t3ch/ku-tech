import Footer from '@/components/Footer'
import { NextPage } from 'next'

interface Props {
    children: React.ReactNode
}

const WithFooter: NextPage<Props> = ({children}) => {
    return (
        <>
            {children}
            <Footer />
        </>
    )
}

export default WithFooter