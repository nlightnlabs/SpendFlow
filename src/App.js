import React,{useState, useEffect} from 'react'
import axios from 'axios'
function App() {

  const redirectToFreeAgent = ()=>{
    window.location.assign("https://freeagent.network")
  }

  useEffect(()=>{
    redirectToFreeAgent()
  },[])

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
