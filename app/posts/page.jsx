"use client"
import Link from 'next/link'
import Image from 'next/image'
import client from '@sanityClient/client'
import imageUrlBuilder from '@sanity/image-url'
import { useEffect, useState } from 'react'






const Post = () => {

    const [posts, setPost] = useState([])

    useEffect(()=>{

        async function getPostList() {

            try{
                const res = await client.fetch(`
                *[_type == "post"]{..., author->{name}, categories[]->{title}}[]
                `)

                setPost(res)
                console.log(posts)
            }catch(err){
                alert('there is an error')

            }

          }

          getPostList()
        
    },[])

    const builder = imageUrlBuilder(client)

    const urlFor = (source) => {
      return builder.image(source)
    }




   

  return (
    <>

    <section className='px-5 md:px-24 py-10'>
        <h1 className='text-2xl font-medium'>All Post</h1>

        <div className="grid grid-cols-1 md:grid-cols-2  gap-3">

            {posts.length > 0 &&
                posts.map((post)=>(
                <Link key={post._id} href={`posts/${post.slug.current}`}>
                    <div className='flex my-5'>
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


        </div>
   
     </section>
    </>
  )
}

export default Post