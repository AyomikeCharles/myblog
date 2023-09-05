"use client"

import banner from '@public/banner.jpg'
import Image from 'next/image'
import Link from 'next/link'
import client from '@sanityClient/client'
import imageUrlBuilder from '@sanity/image-url'
import { useEffect, useState } from 'react'



export default function Home() {

  const  [posts, setPost] = useState([])

  useEffect(()=>{

    async function getData() {
      

        try{
          const res = await client.fetch(`
        *[_type == "post"]{..., author->{name}, categories[]->{title}}[0...30]
        `)
          setPost(res)
         
      }catch(err){
         
          alert('there is an error')
      }
     
      
    }

    getData()


  }, [])



  const builder = imageUrlBuilder(client)

  function urlFor(source) {
    return builder.image(source)
  }


  return (
    <main className="">
     <div style={{backgroundImage:`url(${banner.src})`}} className='h-[300px] md:h-[400px] grid grid-cols-1 justify-items-center content-center bg-fixed text-white w-full bg-cover bg-center bg-no-repeat'>
        <div className=''>
            <h1 className='text-4xl md:text-5xl font-medium'>Welcome to My Blog</h1>
          </div>
     </div>

    <section className='my-20 px-5 md:px-24'>
      <h4 className='text-2xl font-medium'>Latest</h4>
     


      <section className='md:grid md:grid-cols-2 md:gap-5'>

        {posts.length > 0 && posts.map((post)=>(

            <Link key={post._id} href={`posts/${post.slug.current}`}>
            <div className='flex my-10'>
              <div className='mr-3 basis-5/12'> 
                <Image src={urlFor(post.mainImage.asset._ref).width(300).height(200).url()} alt='' className='w-full h-full rounded' width={300} height={200}/>
              </div>
              <div className='basis-7/12'>
                <h5 className='font-medium'>{post.title}</h5>
                <p className='my-2 text-gray-600 text-sm'>
                  {post.body[0].children[0].text.slice(0, 100)}
                </p>
                <div className='font-light text-sm'>{post.author.name} in {post.categories.map((cat)=>(cat.title))}</div>
                <div className='font-light text-sm'>{post._createdAt.slice(0, 10)} • {post.readDuration} min read </div>
              </div>
            </div>
            </Link>
            
        ))

          }
          

      </section>

      <Link href='/posts' className='text-blue-400'>See All Post</Link>

     </section>
    </main>
  )
}
