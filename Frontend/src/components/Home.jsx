import React from 'react'

const home = () => {
  const handleClick = (e)=>{
    console.log(localStorage.getItem("token"));
    localStorage.removeItem("token")
  }
  return (
    <>
      <div>home</div>
      <button className='bg-amber-600' onClick={handleClick}>LogOut</button>
    </>
  )
}

export default home