import axios from 'axios';
import { useRouter } from 'next/router';
import {useEffect, useState} from 'react';
import Template from '../public/template';

export default Template(function Home() {
    const [botsdata, setbotsdata] = useState([])
    const router = useRouter()
    const [abots, setabots] = useState(
      <div class = 'flex items-center w-full justify-center' style={{height: '200px'}}>
        <h1 className='text-3xl font-bold italic text-white/70'>Loading...</h1>
      </div>
    )
    const [search, setsearch] = useState(
      <div class = 'flex items-center w-full justify-center' style={{height: '200px'}}>
        <h1 className='text-3xl font-bold italic text-white/70'>Loading...</h1>
      </div>
    )
    useEffect(()=>{
      async function getbots (){
        await axios.get('https://api.somelist.tk/find_bots').then((res)=>{
          setbotsdata(res.data.bots)
          var abotsarray = []
          res.data.bots.map((bot)=>{
            if (bot.approved){
              abotsarray.push(bot)
            }
          })
          abotsarray.map((bot) =>{
          })
          setsearch(
          <div class = 'flex items-center w-full justify-center' style={{height: '200px'}}>
          <h1 className='text-2xl font-bold text-white/70'>Type to start searching!</h1>
        </div>
        )
          setabots(<>
            <div
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-24 mt-5"
            >
            {abotsarray.map((bot) =>{
              return(<div
              class="cursor-pointer bot-card h-auto sm:h-48 group hover:shadow-xl transition-all duration-200 relative mt-14 w-full bg-sky-900/10 rounded-lg"
            >
              <div
                class="bot-bg w-full h-full absolute rounded-lg"
                style={{background: bot.banner}}
              ></div>
              <div class="p-4 relative">
                <div
                  class="flex flex-col sm:flex-row justify-center sm:justify-start items-center w-full sm:space-x-2 h-full -mt-14 mb-5"
                >
                  <div
                    class="relative flex-shrink-0 w-[76px] h-[76px] sm:ml-5 rounded-full drop-shadow-xl"
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
                        class="rounded-full w-full h-full"
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
                  <div class="mt-5 sm:mt-0 relative flex-shrink-0">
                    <p
                      class="rounded-lg bg-sky-500 text-white dark:bg-sky-900/20 px-4 shadow-xl text-xl"
                    >
                      {bot.name}
                    </p>
                  </div>
                </div>
                <p
                  class="text-sm text-neutral-800 dark:text-neutral-300 h-14 w-full line-clamp-2"
                >
                  {bot.shortdesc}
                </p>
                <div
                  class="sm:flex space-y-2 sm:space-y-0 justify-between w-full gap-x-4 text-center mt-5"
                >
                  <div
                    onClick={() => router.push('/bot/'+bot.id.toString())}
                    class="w-full bg-sky-900/10 hover:bg-sky-900/50 hover:shadow-xl transition-all duration-200 cursor-pointer px-4 py-2 rounded-lg"
                  >
                    View
                  </div>
                  <div
                    class="w-full bg-sky-900/10 hover:bg-sky-900/50 hover:shadow-xl transition-all duration-200 cursor-pointer px-4 py-2 rounded-lg"
                  >
                    Vote
                  </div>
                </div>
              </div>
              <div
                class="absolute flex items-center top-2 right-2 bg-sky-500/10 px-3 py-1 rounded-lg text-sm"
              >
                <i class="fa fa-chevron-up mr-2"></i>{bot.votes}
              </div>
            </div>)
            })}
            </div>
          </>)
        })
      }
      getbots()
    }, [])
    return(
      <div className='p-5 lg:p-10 py-[10rem] lg:py-[10rem] rounded-lg min-h-screen	'>
      <div className="pb-24">
        <h1 className="text-4xl font-bold">Somelist</h1>
        <p className="text-2xl text-black/40 dark:text-white/40 font-medium">
          The best place for your online presence.
        </p>
        <div className="flex items-center gap-2">
          <div style={{zIndex: '0'}} className="w-full relative">
            <input
              style={{zIndex: '100'}}
              spellCheck="false"
              id="searchInput"
              disabled={botsdata == [] && true}
              onFocus={()=>{
                document.getElementById('search').style.display = 'block'
                document.getElementById('search-backdrop').style.display = 'block'
                document.getElementById('search').classList.add('search-show')
              }}
              onChange={()=>{
                if (document.getElementById('searchInput').value == ''){
                  setsearch(
                    <div class = 'flex items-center w-full justify-center' style={{height: '200px'}}>
                      <h1 className='text-2xl font-bold text-white/70'>Type to start searching!</h1>
                    </div>
                  )
                  return
                }
                var searchbotsarr = []
                botsdata.map((bot) => {
                  if (bot.approved){
                    console.log(bot)
                    if(bot.name.toLowerCase().indexOf(document.getElementById('searchInput').value.toLowerCase()) > -1){
                      searchbotsarr.push(bot)
                    }
                  }
                })
                setsearch(
                <div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-h-[20rem] gap-4 overflow-auto"
                >
                  {searchbotsarr.map((bot) => {
                  return(<div
                    
                    className="p-4 gap-x-4 flex w-full hover:bg-zinc-500/5 transition-all duration-200 rounded-xl transiiton-all duration-200 cursor-pointer"
                  >
                    <div className="w-[64px] h-[64px] rounded-full shadow-xl flex-shrink-0">
                      <div
                        style={{
                          display: 'inline-block',
                          maxWidth: '100%',
                          overflow: 'hidden',
                          position: 'relative',
                          boxSizing: 'border-box',
                          margin: '0px',
                        }}
                      >
                        <div
                          style={{
                          boxSizing: 'border-box',
                          display: 'block',
                          maxSidth: '100%'}}
                        >
                          <img
                            style={{
                              maxWidth: '100%',
                              display: 'block',
                              margin: '0px',
                              border: 'medium none',
                              padding: '0px',
                            }}
                            alt=""
                            aria-hidden="true"
                            role="presentation"
                            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMS4xIi8+"
                          />
                        </div>
                        <img
                          alt="vcodes.xyz"
                          src={bot.avatar}
                          decoding="async"
                          className="rounded-full"
                          style={{
                            position: 'absolute',
                            inset: '0px',
                            boxSizing: 'border-box',
                            padding: '0px',
                            border: 'medium none',
                            margin: 'auto',
                            display: 'block',
                            width: '0px',
                            height: '0px',
                            minWidth: '100%',
                            maxWidth: '100%',
                            minHeight: '100%',
                            maxHeight: '100%',
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="flex justify-between w-full">
                        <h1 className="text-xl font-medium w-full line-clamp-1 break-words">
                          {bot.name}
                        </h1>
                        <span
                          className="flex items-center font-medium bg-neutral-500/10 p-2 py-1 rounded-lg text-sm"
                          ><p>{bot.votes}</p>
                          <i className="fa fa-chevron-up ml-2"></i
                        ></span>
                      </div>
                      <p
                        className="mt-2 text-sm text-black/75 dark:text-white/75 line-clamp-2 font-normal"
                      >
                        {bot.shortdesc}
                      </p>
                    </div>
                  </div>
                  )})}
                  </div>                
                )
              }}
              autoComplete="off"
              placeholder="Explore the bots by name and description..."
              className="relative transition-all duration-200 my-2 w-full bg-black/10 dark:bg-black/30 dark:hover:bg-black/50 hover:bg-black/20 text-dark dark:text-white focus:text-sky-500 rounded-xl border border-white/10 focus:border-sky-500 outline-none py-4 px-6"
            />
          <div>
  <div className="">
    <div
      style={{zIndex: "99", display: 'none'}}
      className="left-0 top-0 bg-black/50 fixed w-full h-full"
      id='search-backdrop'
      onClick={()=>{
        document.getElementById('search').style.display = 'none'
        document.getElementById('search-backdrop').style.display = 'none'
        document.getElementById('search').classList.remove('search-show')
      }}
    ></div>
  </div>
  <div className="">
    <div
      style={{zIndex: "99", display: 'none'}}
      className="rounded-lg p-4 bg-[#0B0A15]/50 absolute w-full"
      id='search'
    >
      {search}
    </div>
  </div>
</div>
</div>
          <button
            className="opacity-100 h-14 bg-gradient-to-br from-sky-600 to-sky-800 py-4 px-6 flex items-center rounded-lg text-white shadow-xl shadow-sky-600/20"
          >
            <i className="fas fa-search"></i>
          </button>

        </div>
        <div
          className="flex flex-wrap transition-all duration-200 items-center gap-2 justify-start"
        >
          <div
            className="text-md bg-sky-600/5 border border-zinc-400/10 text-black dark:text-zinc-300 hover:border-zinc-400/20 hover:bg-sky-600/10 transition-all duration-200 cursor-pointer rounded-lg px-3 py-1.5"
          >
            <span className="mr-1"><i className="fa fa-hashtag text-blurple-500/50"></i></span
            >Moderation
          </div>
          <div
            className="text-md bg-sky-600/5 border border-zinc-400/10 text-black dark:text-zinc-300 hover:border-zinc-400/20 hover:bg-sky-600/10 transition-all duration-200 cursor-pointer rounded-lg px-3 py-1.5"
          >
            <span className="mr-1"><i className="fa fa-hashtag text-blurple-500/50"></i></span
            >Fun
          </div>
          <div
            className="text-md bg-sky-600/5 border border-zinc-400/10 text-black dark:text-zinc-300 hover:border-zinc-400/20 hover:bg-sky-600/10 transition-all duration-200 cursor-pointer rounded-lg px-3 py-1.5"
          >
            <span className="mr-1"><i className="fa fa-hashtag text-blurple-500/50"></i></span
            >Minecraft
          </div>
          <div
            className="text-md bg-sky-600/5 border border-zinc-400/10 text-black dark:text-zinc-300 hover:border-zinc-400/20 hover:bg-sky-600/10 transition-all duration-200 cursor-pointer rounded-lg px-3 py-1.5"
          >
            <span className="mr-1"><i className="fa fa-hashtag text-blurple-500/50"></i></span
            >Economy
          </div>
          <div
            className="text-md bg-sky-600/5 border border-zinc-400/10 text-black dark:text-zinc-300 hover:border-zinc-400/20 hover:bg-sky-600/10 transition-all duration-200 cursor-pointer rounded-lg px-3 py-1.5"
          >
            <span className="mr-1"><i className="fa fa-hashtag text-blurple-500/50"></i></span
            >Guard
          </div>
          <div
            className="text-md bg-sky-600/5 border border-zinc-400/10 text-black dark:text-zinc-300 hover:border-zinc-400/20 hover:bg-sky-600/10 transition-all duration-200 cursor-pointer rounded-lg px-3 py-1.5"
          >
            <span className="mr-1"><i className="fa fa-hashtag text-blurple-500/50"></i></span
            >NSFW
          </div>
          <div
            className="text-md bg-sky-600/5 border border-zinc-400/10 text-black dark:text-zinc-300 hover:border-zinc-400/20 hover:bg-sky-600/10 transition-all duration-200 cursor-pointer rounded-lg px-3 py-1.5"
          >
            <span className="mr-1"><i className="fa fa-hashtag text-blurple-500/50"></i></span
            >Anime
          </div>
          <div
            className="text-md bg-sky-600/5 border border-zinc-400/10 text-black dark:text-zinc-300 hover:border-zinc-400/20 hover:bg-sky-600/10 transition-all duration-200 cursor-pointer rounded-lg px-3 py-1.5"
          >
            <span className="mr-1"><i className="fa fa-hashtag text-blurple-500/50"></i></span
            >Invite
          </div>
          <div
            className="text-md bg-sky-600/5 border border-zinc-400/10 text-black dark:text-zinc-300 hover:border-zinc-400/20 hover:bg-sky-600/10 transition-all duration-200 cursor-pointer rounded-lg px-3 py-1.5"
          >
            <span className="mr-1"><i className="fa fa-hashtag text-blurple-500/50"></i></span
            >Music
          </div>
          <div
            className="text-md bg-sky-600/5 border border-zinc-400/10 text-black dark:text-zinc-300 hover:border-zinc-400/20 hover:bg-sky-600/10 transition-all duration-200 cursor-pointer rounded-lg px-3 py-1.5"
          >
            <span className="mr-1"><i className="fa fa-tags text-blurple-500/50"></i></span
            >Explore Tags
          </div>
        </div>
      </div>
      <div>
      <p class="text-3xl italic font-semibold text-black/80 dark:text-white/80">
        Trending Bots
      </p>
      <p class="text-lg italic font-normal text-black/80 dark:text-white/80 mb-2">
        Most popular bots.
      </p>
      {abots}
    </div>
    </div>
    )
})