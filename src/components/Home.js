import React,{useState, useEffect, useContext} from 'react'

const Home = () => {

    const redirectToFreeAgent = ()=>{
        window.location.assign("https://freeagent.network")
    }

    useEffect(()=>{
        redirectToFreeAgent()
    },[])

  return (
    <div></div>
  )
}

export default Home