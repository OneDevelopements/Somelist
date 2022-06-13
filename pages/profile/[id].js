import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Template from "../../public/template"
import axios from 'axios';
import Cookie from 'js-cookie'
import HeaderB from "../../components/Navbar";
import MarketplaceItem from '../../components/MarketplaceItem'
import { ThreeDots } from "react-loader-spinner";
import Image from "next/image";
import Tippy from "@tippyjs/react";
import {motion, AnimatePresence} from 'framer-motion'
import BotCard from "../../components/BotCard";
export default  function profile({isLoggedIn, userdata, userassets, userbots}){
    const router = useRouter()
    const [isadmin, setisadmin] = useState(false)
    const [abots, setabots] = useState(
      <div className = 'flex items-center w-full justify-center' style={{height: '200px'}}>
        <ThreeDots color="#fff"/>
      </div>
    )
    const tabs = [
      { label: 'Bots', content: <>
            {userbots == 'none' ? (
                    <div className="flex flex-col h-full items-center justify-center">
                    <p className="text-sky-500 text-center italic text-4xl font-semibold">
                        Oops!
                    </p>
                    <p className="text-black dark:text-white text-center text-2xl font-medium">
                        Seems like this user has no bots.
                    </p>
                    </div>
            )
            :<>
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-24 mt-5"
              >
              {userbots.map((bot) =>{
                return(
                  <>{bot.approved ? 
                  <BotCard name={bot.name} id={bot.id} votes={bot.votes} avatar={bot.avatar} banner={bot.banner} shortdesc={bot.shortdesc}/>            
                  : 
                  <></>  
                  }
                  </>
                  )
            })}
        </div>
      </>
      }
      </>
      },
      { label: 'Posts', disabled: true },
      { label: 'Assets', content: <>
      {!userdata.viewAssets ? 
      <>
      <div className="h-full min-h-[300px] w-full flex items-center justify-center flex-col">
        <h1 className="text-4xl text-blue-500 italic">Oops!</h1>
        <p className="text-white/50 text-xl">This user does not allow you to view their assets.</p>
      </div>
      </>
      : userassets.length <= 0 ?
        <>
        <div className="h-full min-h-[300px] w-full flex items-center justify-center flex-col">
          <h1 className="text-4xl text-blue-500 italic">Oops!</h1>
          <p className="text-white/50 text-xl">This user does not have any assets.</p>
        </div>
        </>
      : <div className="mt-5">
      {userassets.map((item)=>{
        return(<MarketplaceItem id={item.id} name={item.name} price={item.price} description={item.description} owned={true}/>)
      })
      }
      </div>
      }
      </> },
    ]
    const [user, setuser] = useState('')
    const [selectedTab, setSelectedTab] = useState(tabs[0])

    useEffect(()=>{
        async function getbots (){
          await axios.get('https://api.somelist.tk/find_bots?owner='+router.query.id).then((res)=>{
            if (res.data.bots == 'none'){
                setabots(
                    <div className="flex flex-col h-full items-center justify-center">
                    <p className="text-sky-500 text-center italic text-4xl font-semibold">
                        Oops!
                    </p>
                    <p className="text-black dark:text-white text-center text-2xl font-medium">
                        Seems like this user has no bots.
                    </p>
                    </div>
                )
            }
            var abotsarray = []
            res.data.bots.map((bot)=>{
              if (bot.approved){
                abotsarray.push(bot)
              }
            })
            abotsarray.map((bot) =>{
            })
            setabots(<>
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-24 mt-5"
              >
              {abotsarray.map((bot) =>{
                return(<div
                className="cursor-pointer bot-card h-auto sm:h-48 group hover:shadow-xl transition-all duration-200 relative mt-14 w-full bg-sky-900/10 rounded-lg"
              >
                <div
                  className="bot-bg w-full h-full absolute rounded-lg"
                  style={{background: bot.banner}}
                ></div>
                <div className="p-4 relative">
                  <div
                    className="flex flex-col sm:flex-row justify-center sm:justify-start items-center w-full sm:space-x-2 h-full -mt-14 mb-5"
                  >
                    <div
                      className="relative flex-shrink-0 w-[76px] h-[76px] sm:ml-5 rounded-full drop-shadow-xl"
                    >
                      <div
                        style={
                          {
                            "display": "block",
                            "overflow": "hidden",
                            "position": "absolute",
                            "inset": "0px",
                            "boxSizing": "border-box",
                            "margin": "0px"
                          }
                          
                        }
                      >
                        <img
                          alt="vcodes.xyz"
                          decoding="async"
                          className="rounded-full w-full h-full"
                          sizes="100vw"
                          src={bot.avatar}
                          style={{
                            "position": "absolute",
                            "inset": "0px",
                            "boxSizing": "border-box",
                            "padding": "0px",
                            "border": "none",
                            "margin": "auto",
                            "display": "block",
                            "width": "0px",
                            "height": "0px",
                            "minWidth": "100%",
                            "maxWidth": "100%",
                            "minHeight": "100%",
                            "maxHeight": "100%"
                          }
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-0 relative flex-shrink-0">
                      <p
                        className="rounded-lg bg-sky-500 text-white dark:bg-sky-900/20 px-4 shadow-xl text-xl"
                      >
                        {bot.name}
                      </p>
                    </div>
                  </div>
                  <p
                    className="text-sm text-neutral-800 dark:text-neutral-300 h-14 w-full line-clamp-2"
                  >
                    {bot.shortdesc}
                  </p>
                  <div
                    className="sm:flex space-y-2 sm:space-y-0 justify-between w-full gap-x-4 text-center mt-5"
                  >
                    <div
                      onClick={() => router.push('/bot/'+bot.id.toString())}
                      className="w-full bg-sky-900/10 hover:bg-sky-900/50 hover:shadow-xl transition-all duration-200 cursor-pointer px-4 py-2 rounded-lg"
                    >
                      View
                    </div>
                    <div
                      className="w-full bg-sky-900/10 hover:bg-sky-900/50 hover:shadow-xl transition-all duration-200 cursor-pointer px-4 py-2 rounded-lg"
                    >
                      Vote
                    </div>
                  </div>
                </div>
                <div
                  className="absolute flex items-center top-2 right-2 bg-sky-500/10 px-3 py-1 rounded-lg text-sm"
                >
                  <i className="fa fa-chevron-up mr-2"></i>34
                </div>
              </div>)
              })}
              </div>
            </>)
          })
        }
        async function getuser(){
            await axios.get('https://api.somelist.tk/info?user='+router.query.id).then((res)=>{
                setuser(
                <div className="col-span-3">
                    <div className="flex w-full flex-col items-center">
                    <div
                        className="flex-shrink-0 border-[2.2px] w-[8rem] h-[8rem] border-sky-500/50 mb-2 rounded-full"
                    >
                        <div
                        style={{display: "inline-block", maxWidth: "100%", overflow: "hidden", position: "relative", boxSizing: "border-box", margin: "0px"}}
                        >
                        <div style={{boxSizing: "border-box", display: "block", maxWidth: "100%"}}>
                            <img
                            style={{maxWidth: "100%", borderRadius: '100%', display: "block", margin: "0px", border: "medium none", padding: "0px"}}
                            alt=""
                            src={res.data.result.avatar}
                            aria-hidden="true"
                            role="presentation"
                            />
                        </div>
                        <Image
                            alt="vcodes.xyz"
                            decoding="async"
                            height='0'
                            width='0'
                            src={res.data.result.avatar}
                            className="rounded-full"
                            style={{position: "absolute", inset: "0px", boxSizing: "border-box", padding: "0px", border: "medium none", margin: "auto", display: "block", width: "0px", height: "0px", minWidth: "100%", maxWidth: "100%", minHeight: "100%", maxHeight: "100%"}}
                        />
                        </div>
                    </div>
                    <p
                        className="text-3xl font-semibold line-clamp-1 italic text-black dark:text-white"
                    >
                        {res.data.result.name}
                    </p>
                    <p className="text-base italic text-black/80 mt-2 dark:text-white/80 text-center"></p>
                    <div className="flex items-center mt-2 gap-x-2">
                        {res.data.result.badges  &&
                        res.data.result.badges.includes('owner') &&
                        <>
                        <Tippy content='Owner' placement='top'>
                        <i className="fa fa-crown text-2xl text-orange-500 mr-1"></i>
                        </Tippy>
                        </>
                        }
                        {res.data.result.badges  &&
                          res.data.result.badges.includes('team') &&
                        <>
                        <Tippy content='Team' placement='top'>
                        <i className="fa fa-users text-2xl text-green-500 mr-1"></i>
                        </Tippy>
                        </>     
                        }                   
                        {res.data.result.badges  &&
                          res.data.result.badges.includes('moderator') &&
                        <>
                        <Tippy content='Moderator' placement='top'>
                        <i className="fa fa-shield text-2xl text-red-500 mr-1"></i>
                        </Tippy>
                        </>                               
                        } {
                          res.data.result.badges  &&
                          res.data.result.badges.includes('partner') && 
                        <>
                          <Tippy content='Partner' placement='top'>
                          <i className="fa fa-handshake text-2xl text-violet-500 mr-1"></i>
                          </Tippy>
                        </>                                                       
                        }
                        {res.data.result.badges  &&
                          res.data.result.badges.includes('bot reviewer') &&
                        <>
                          <Tippy content='Bot Reviewer' placement='top'>
                          <i className="fa fa-bolt text-2xl text-fuchsia-500 mr-1"></i>
                          </Tippy>
                        </>                                                                               
                        }{res.data.result.badges  &&
                          res.data.result.badges.includes('bot developer') &&
                        <>
                        <Tippy content='Bot Developer' placement='top'>
                          <i className="fa fa-hammer text-2xl text-blue-500 mr-1"></i>
                        </Tippy>
                        </>                        
                      }
                    </div>
                    <div className="mt-5 w-full">
                        <div
                        className="flex items-center text-sky-500 dark:text-sky-500 font-medium text-2xl text-left"
                        >
                        <i className="fas fa-external-link text-sky-500 mr-2"></i
                        ><span className="text-sky-500">Links</span>
                        </div>
                        <a
                        href="https://discord.com/users/729975591406796840"
                        className="flex items-center shadow-xl"
                        target="_blank"
                        ><div
                            className="mt-2 bg-indigo-700 text-center px-4 py-2 rounded-l-lg text-white"
                        >
                            <i className="fab fa-discord"></i>
                        </div>
                        <div
                            className="mt-2 bg-indigo-600 w-full px-4 py-2 rounded-r-lg text-white"
                        >
                            <p className="line-clamp-1">{res.data.result.name}#{res.data.result.discriminator}</p>
                        </div></a
                        >
                    </div>
                    </div>
                </div>
                )
                getbots()
            })
        }
        getuser()
      }, [])

    return(
      <>
      <HeaderB isLoggedIn={isLoggedIn}/>
        <div className="p-5 lg:p-10 py-[10rem] lg:py-[12rem] rounded-lg min-h-screen">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-y-4 xl:gap-y-0 xl:gap-x-8">

            <div className="col-span-3">
                  <div className="flex w-full flex-col items-center">
                    <div
                        className="flex-shrink-0 border-[2.2px] w-[8rem] h-[8rem] border-sky-500/50 mb-2 rounded-full"
                    >
                        <div
                        style={{display: "inline-block", maxWidth: "100%", overflow: "hidden", position: "relative", boxSizing: "border-box", margin: "0px"}}
                        >
                        <div style={{boxSizing: "border-box", display: "block", maxWidth: "100%"}}>
                            <img
                            style={{maxWidth: "100%", borderRadius: '100%', display: "block", margin: "0px", border: "medium none", padding: "0px"}}
                            alt=""
                            src={userdata.avatar}
                            aria-hidden="true"
                            role="presentation"
                            />
                        </div>
                        <Image
                            alt="vcodes.xyz"
                            decoding="async"
                            height='0'
                            width='0'
                            src={userdata.avatar}
                            className="rounded-full"
                            style={{position: "absolute", inset: "0px", boxSizing: "border-box", padding: "0px", border: "medium none", margin: "auto", display: "block", width: "0px", height: "0px", minWidth: "100%", maxWidth: "100%", minHeight: "100%", maxHeight: "100%"}}
                        />
                        </div>
                    </div>
                    <p
                        className="text-3xl font-semibold line-clamp-1 italic text-black dark:text-white"
                    >
                        {userdata.name}
                    </p>
                    <p className="text-base italic text-black/80 mt-2 dark:text-white/80 text-center">{userdata.bio}</p>
                    <div className="flex items-center mt-2 gap-x-2">
                        
                        {userdata.badges  &&
                        userdata.badges.includes('owner') &&
                        <>
                        <Tippy content='Owner' placement='top'>
                        <i className="fa fa-crown text-2xl text-orange-500 mr-1"></i>
                        </Tippy>
                        </>
                        }
                        {userdata.badges  &&
                          userdata.badges.includes('team') &&
                        <>
                        <Tippy content='Team' placement='top'>
                        <i className="fa fa-users text-2xl text-green-500 mr-1"></i>
                        </Tippy>
                        </>     
                        }                   
                        {userdata.badges  &&
                          userdata.badges.includes('moderator') &&
                        <>
                        <Tippy content='Moderator' placement='top'>
                        <i className="fa fa-shield text-2xl text-red-500 mr-1"></i>
                        </Tippy>
                        </>                               
                        } {
                          userdata.badges  &&
                          userdata.badges.includes('partner') && 
                        <>
                          <Tippy content='Partner' placement='top'>
                          <i className="fa fa-handshake text-2xl text-violet-500 mr-1"></i>
                          </Tippy>
                        </>                                                       
                        }
                        {userdata.badges  &&
                          userdata.badges.includes('bot reviewer') &&
                        <>
                          <Tippy content='Bot Reviewer' placement='top'>
                          <i className="fa fa-bolt text-2xl text-fuchsia-500 mr-1"></i>
                          </Tippy>
                        </>                                                                               
                        }{userdata.badges  &&
                          userdata.badges.includes('bot developer') &&
                        <>
                        <Tippy content='Bot Developer' placement='top'>
                          <i className="fa fa-hammer text-2xl text-blue-500 mr-1"></i>
                        </Tippy>
                        </>                        
                      }
                    </div>
                    <div className="mt-5 w-full">

                        <div
                          className="flex items-center text-sky-500 dark:text-sky-500  text-xl text-left"
                        >
                          <i className="fas fa-wrench text-sky-500 mr-2"></i
                          >
                          <span className="text-sky-500">Actions</span>
                        </div>
                        {userdata.id == Cookie.get('id') ? 
                          <button
                            onClick={()=>{
                                router.push('/profile/'+userdata.id+'/edit')
                              }}
                            className="flex items-center shadow-xl w-full text-left"
                          >
                              <div
                                className="mt-2 bg-slate-700 text-center px-4 py-2 rounded-l-lg text-white"
                              >
                                <i className="fas fa-pen"></i>
                              </div>
                              <div
                                className="mt-2 bg-slate-800 w-full px-4 py-2 rounded-r-lg text-white"
                              >
                                <p className="line-clamp-1">Edit</p>
                              </div>
                            </button>
                            :
                            <button
                              onClick={()=>{
                                  router.push('/profile/'+userdata.id+'/edit')
                                }}
                              className="flex items-center shadow-xl w-full text-left"
                            >
                                <div
                                  className="mt-2 bg-red-700 text-center px-4 py-2 rounded-l-lg text-white"
                                >
                                  <i className="fas fa-warning"></i>
                                </div>
                                <div
                                  className="mt-2 bg-red-800 w-full px-4 py-2 rounded-r-lg text-white"
                                >
                                  <p className="line-clamp-1">Report</p>
                                </div>
                              </button>
                        }
                        <div
                        className="mt-4 flex items-center text-sky-500 dark:text-sky-500 text-xl text-left"
                        >
                        <i className="fas fa-external-link text-sky-500 mr-2"></i
                        ><span className="text-sky-500">Links</span>
                        </div>
                        <a
                        href={"https://discord.com/users/"+userdata.id}
                        className="flex items-center shadow-xl"
                        target="_blank"
                        ><div
                            className="mt-2 bg-indigo-700 text-center px-4 py-2 rounded-l-lg text-white"
                        >
                            <i className="fab fa-discord"></i>
                        </div>
                        <div
                            className="mt-2 bg-indigo-600 w-full px-4 py-2 rounded-r-lg text-white"
                        >
                            <p className="line-clamp-1">{userdata.name}#{userdata.discriminator}</p>
                        </div></a>
                    </div>
                    </div>
                </div>
            <div className="col-span-9">
                <ul className="w-full flex">
                  {tabs.map((item) => {
                    return (
                      <li
                        key={item.label}
                        className={`tab text-2xl ${item.disabled && 'text-white/10'}`}
                        onClick={() =>{ 
                          if (!item.disabled) {
                              setSelectedTab(item)
                          }
                        }}
                      >
                        <p className="text-center w-full" style={{zIndex: 11}}>{`${item.label}`}</p>
                        {item.label === selectedTab.label && (
                          <motion.div className="underline" layoutId="underline" />
                        )}
                        </li>
                    )
                  })
                  }
                </ul>

                <AnimatePresence exitBeforeEnter>
                  <motion.div
                    key={selectedTab ? selectedTab.label : "empty"}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {selectedTab.content}
                  </motion.div>
                </AnimatePresence>
            </div>
            </div>

        </div>
      </>
    )
}


export async function getServerSideProps(context) {
    const res = await fetch('https://api.somelist.tk/info?user='+context.query.id)
    const data = await res.json()
    console.log(data)
    const res2 = await fetch('https://api.somelist.tk/find_bots?owner='+context.query.id)
    const data2 = await res2.json()
    if (data.result == 'none'){
      context.res.statusCode = 404
      return{
        notFound: true
      }
    }
    return {
      props: {
        isLoggedIn: context.req.cookies.token ? true : false,
        userdata: data.result,
        userassets: data.assets,
        userbots: data2.bots
      }
    }
  } 