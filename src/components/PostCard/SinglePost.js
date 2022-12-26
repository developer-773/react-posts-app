import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { MeContext } from '../../context/MeContext';

export const SinglePost = () => {

    const [data, setData] = useState([])
	const { me, setMe } = useContext(MeContext);


    const getPosts = async () => {
        const data = await axios.get(`http://localhost:8080/posts?user_id=${me.id}`);
        setData(data.data)
    }

    useEffect(() => {

        getPosts()
    },[])

  return (
    <>
    {data.map(item => (
        <div className='mx-5 w-75'>
            <h2 className='my-5 fs-1'>{item.title}</h2>
            <p className='fs-3'>{item.body}</p>
        </div>
    ))}
    </>
  )
}
