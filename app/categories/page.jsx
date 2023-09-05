"use client"
import Link from 'next/link'
import Image from 'next/image'
import client from '@sanityClient/client'
import imageUrlBuilder from '@sanity/image-url'
import { useEffect, useState } from 'react'




const Categories =  () => {

  const [categories, setCategories] = useState([])

  async function getCategories() {

    try{
      const res = await client.fetch(`
      *[_type == "category"]
      `)
      setCategories(res)
    }catch(err){
      alert('there was an error')
    }

  
  }
 
  useEffect(()=>{
    getCategories()
  })

    const builder = imageUrlBuilder(client)

    function urlFor(source) {
      return builder.image(source)
    }


  return (
    <>

    <section className='px-5 md:px-24 py-10'>
        <h1 className='text-2xl font-medium'>All Categories</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {categories.length > 0 &&
                categories.map((category)=>(

                <div key={category._id}  className='my-10 flex justify-center bg-slate-100 rounded'>
                  <Link href={`categories/${category.title}`}>
                      <div> 
                          <Image src={urlFor(category.image.asset._ref).width(200).height(100).url()} alt='' width={200} height={100} className='w-full h-full rounded hover:scale-105 transition duration-500'/>
                          <h5 className='font-medium mt-2'>{category.title.split('_')[0]} {category.title.split('_')[1]}</h5>
                          <p className='my-2 text-gray-600 text-sm'>
                          {category.description}
                          </p>
                          </div>
                  </Link>
                </div>

                ))
            }

        </div>
     </section>
    </>
  )
}

export default Categories