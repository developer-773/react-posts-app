import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { MeContext } from '../../context/MeContext';
import uuid from 'react-uuid';

export const SinglePost = () => {

    const [data, setData] = useState([])
	const { me, setMe } = useContext(MeContext);


    const getPosts = async () => {
        const data = await axios.get(`https://plum-ill-piranha.cyclic.app/posts?user_id=${me.id}`);
        setData(data.data)
    }

    useEffect(() => {

        getPosts()
    },[])

  return (
    <>
    {data.map(item => (
        <div key={uuid()} className='mx-5 w-75'>
            <h2 className='my-5 fs-1'>{item.title}</h2>
            <p className='fs-3'>{item.body}</p>
        </div>
    ))}
    </>
  )
}
