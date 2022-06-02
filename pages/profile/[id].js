import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Template from "../../public/template"
import axios from 'axios';
import Cookie from 'js-cookie'
import HeaderB from "../../components/Navbar";
import { ThreeDots } from "react-loader-spinner";
import Image from "next/image";
import Tippy from "@tippyjs/react";
export default  function profile({isLoggedIn}){
    const router = useRouter()
    const [isadmin, setisadmin] = useState(false)
    const [abots, setabots] = useState(
      <div className = 'flex items-center w-full justify-center' style={{height: '200px'}}>
        <ThreeDots color="#fff"/>
      </div>
    )
    const [user, setuser] = useState('')
    
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
                          alt="somelist.tk"
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
                            alt="somelist.tk"
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
                    <p className="text-base italic text-black/80 mt-2 dark:text-white/80"></p>
                    <p className="text-base italic text-black/80 dark:text-white/80">
                        <i className="fa fa-clock mr-1"></i>a few seconds ago
                    </p>
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
            {user}
            <div className="col-span-9">
                {abots}
            </div>
            </div>

        </div>
      </>
    )
}


export async function getServerSideProps(context) {
    return {
      props: {
        isLoggedIn: context.req.cookies.token ? true : false
      }
    }
  } 