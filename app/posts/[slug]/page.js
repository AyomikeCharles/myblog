"use client"
import Image from 'next/image'
import Link from 'next/link'
import client from '@sanityClient/client'
import  imageUrlBuilder  from '@sanity/image-url'
import SanityBlockContent from '@sanity/block-content-to-react'
import useCodeSerializer from '@res/postStyles'
import { useEffect, useState } from 'react'




const Article = ({params}) => {

  

    const [post, setPost] = useState([])
    const [similars, setSimilars] = useState([])

    async function getArticle(slug) {
      try{
        const post = await client.fetch(`
        *[_type == "post" && slug.current == $slug]{..., author->{name}, categories[]->{title}}
        `,{slug})
    
        const { title = '' } = post[0].categories[0]
    
        const similar = await client.fetch(`
          *[_type == "post" && $title in categories[]->title && slug.current != $slug]{..., author->{name}, categories[]->{title}}[0...5]
          `,{title, slug})
    
        setPost(post)
        setSimilars(similar)
    
      }catch(err){
        alert('there was an error')
      }
       
      
      }

    useEffect(()=>{
      getArticle(params.slug)
    })
  



  const imageBuilder = imageUrlBuilder(client)

  const serializers = {
    types: {
      code: useCodeSerializer,
      // ...other block type serializers
    },
    // ...other serializers if needed
  };

  const forUrl = (src) =>{
    return imageBuilder.image(src)
  }



  return (
    <>
    <section className='md:flex pl-5 md:px-24 py-10'>
      { post.length > 0 &&
        <article className='basis-8/12 mr-10'>
          <div className='mr-3 basis-5/12'> 
              <Image src={forUrl(post[0].mainImage.asset._ref).url()} alt='' className='w-full h-full rounded' width={500} height={400}/>
          </div>
          <h1 className='text-2xl font-medium my-4'>
            {post[0].title}
          </h1>
          <div className='font-light'>
            {post[0].categories[0].title}
          </div>
          <div className='font-light mb-4'>
            {post[0]._createdAt.slice(0, 10)} • {post[0].readDuration} min read 
          </div>
          
          <div className='prose'>
            <SanityBlockContent
                blocks={post[0].body}
                imageOptions={{w: 320, h: 240, fit: 'max'}}
                projectId='yopcp6yd'
                dataset='production'
                serializers={serializers}
              />
          </div>
            
        

          {/* add comment here later */}

        </article>}


        <div className='sticky basis-4/12 mt-10 md:mt-0'>
          <h4 className='text-2xl font-medium'>Similar Post</h4>

          {similars.length > 0 &&
            similars.map((similar)=>(
              <Link key={similar._id} href={`posts/${similar.slug.current}`}>
                <div className='flex my-10'>
                  <div className='mr-3 basis-5/12'> 
                    <Image src={forUrl(similar.mainImage.asset._ref).width(300).height(200).url()} alt='' className='rounded' width={300} height={200}/>
                  </div>
                  <div className='basis-7/12'>
                    <h5 className='font-medium'>{similar.title}</h5>
                    <p className='my-2 text-gray-600 text-sm'>
                      {similar.body[0].children[0].text.slice(0, 100)}
                    </p>
                    <div className='font-light text-sm'>{similar.author.name} in {similar.categories.map((cat)=>(cat.title))}</div>
                    <div className='font-light text-sm'>{similar._createdAt.slice(0, 10)} • {similar.readDuration} min read </div>
                  </div>
                </div>
                </Link>
            ))
          }


          <Link href='/posts'>See All Post</Link>

        </div>
      </section>
    </>
  )
}





export default Article