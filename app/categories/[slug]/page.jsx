"use client"
import Link from 'next/link'
import Image from 'next/image'
import client from '@sanityClient/client'
import  imageUrlBuilder  from '@sanity/image-url'
import { useEffect, useState } from 'react'




const Category =  ({params}) => {

    const [posts, setPosts] =  useState([])

    async function getCatPosts(slug) {
        try{
            let res = await client.fetch(`
            *[_type == "post" && $slug in categories[]->title]{..., author->{name}, categories[]->{title}}[]
            `,{slug})

            setPosts(res)
        }catch(err){
            alert('there was an error')
        }

      }
      

    useEffect(()=>{
        getCatPosts(params.slug)
    })

    const imageBuilder = imageUrlBuilder(client)

  

    const forUrl = (src) =>{
            return imageBuilder.image(src)
        }



  return (
    <>

    <section className='px-5 md:px-24 py-10'>
        <h1 className='text-2xl font-medium'>{params.slug.split('_')[0]} {params.slug.split('_')[1]}</h1>


        {posts.length > 0 ? 
        <div className="grid grid-cols-1 md:grid-cols-2  gap-3">
        
          {posts.map((post)=>(

              <Link key={post._id} href={`post/${post.slug.current}`}>
                  <div className='flex my-10'>
                      <div className='mr-3 basis-5/12'> 
                          <Image src={forUrl(post.mainImage.asset._ref).width(300).height(200).url()} alt='' className='w-full h-full rounded' width={300} height={200}/>
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

              ))}
          </div>

            : 
          <div className='text-center py-24'>no post available in this category</div>

        }

        
     </section>
    </>
  )
}




export default Category