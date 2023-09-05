import '@styles/globals.css'
import Footer from '@components/Footer'
import Nav from '@components/Nav'
import { Work_Sans } from 'next/font/google'

const workSans = Work_Sans({
  subsets: ['latin'],
  variable:'--font-work_sans'
})


export const metadata = {
    title:'Blog',
    description:'a blog website'
}



const RootLayout = ({children}) => {
    return(
        <html lang="en">
            <body className='flex flex-col min-h-screen'>
                <main className={workSans.className}>
                    <Nav/>
                        {children}
                    <Footer/>
                </main>
            </body>
            {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8001034188743378" crossorigin="anonymous"></script> */}
        </html>
    )
}

export default RootLayout
