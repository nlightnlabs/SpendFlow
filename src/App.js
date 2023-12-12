import React,{useState, useEffect, useContext} from 'react'
import {Context } from './components/Context';
import Login from './components/Login'
import UserInfo from './components/UserInfo'
import Home from './components/Home';
import 'animate.css';

function App() {

  const {
    user,
    setUser,
    userLoggedIn,
    setUserLoggedIn,
    page,
    setPage,
    pages,
    setPages,
    pageName,
    setPageName,
    appData,
    setAppData,
    pageList,
    setPageList,
    initialFormData,
    setInitialFormData
  } = useContext(Context)

  let pageData=[
    {name: "Log In", component: <Login/>, data: "user_info", request_type: false, description: "Description for this request", icon:"https://nlightnlabs.net/spendFlow/intake/icons/log_in.png"},
    {name: "User Info", component: <UserInfo/>, data: "user_info", request_type: false, description: "Description for this request", icon:"https://nlightnlabs.net/spendFlow/intake/icons/sign_up.png"},
    {name: "Home", component: <Home/>, data: "request_summary", request_type: false, description: "Description for this request", icon:"https://nlightnlabs.net/spendFlow/intake/icons/home.png"},
  ]

  useEffect(()=>{
    setPageName("Log In")
    setPages(pageData)
    setPage(pageData.filter(x=>x.name===pageName)[0])
  },[])

  const pageStyle={
    backgroundSize: "cover",
    backgroundImage: "linear-gradient(0deg, rgb(220, 230, 255), rgb(245, 250, 255), white)",
    height: "100vh",
    overflow: "auto"
  }

  return (
    <div className="App" style={pageStyle}>
      {userLoggedIn && pages.filter(x=>x.name===pageName)[0].component}
      {pageName == "Log In" && <Login/>}
      {pageName == "User Info" && <UserInfo/>}
    </div>
  );
}

export default App;
