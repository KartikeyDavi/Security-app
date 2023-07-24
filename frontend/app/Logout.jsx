"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const Logout = () => {
    const router = useRouter();
  return (
    <div>
      <button onClick={()=>router.push('/signin')} className="btn btn-danger">
        Logout
      </button>
    </div>
  )
}

export default Logout
