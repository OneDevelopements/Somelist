import Template from "../public/template";
import Image from "next/image";
export default Template(function Partners(){
    return(
        <div class="p-5 lg:p-10 py-[8rem] lg:py-[10rem] rounded-lg min-h-screen">
            <h1 className='text-5xl text-sky-500 italic font-bold'>Partners</h1>
            <div class='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-24 mt-5'>
            <div
              className="cursor-pointer bot-card h-auto sm:h-48 group hover:shadow-xl transition-all duration-200 relative mt-14 w-full bg-sky-900/10 rounded-lg"
            >
              <div
                className="bot-bg w-full h-full absolute rounded-lg"
                style={{
                  background: `url(${'placeholder'})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  filter: 'blur(2px)',
                  opacity: '50%'
                }}
              ></div>
              <div className="p-4 relative">

                <div
                  className="flex flex-col sm:flex-row justify-center sm:justify-start items-center w-full sm:space-x-2 h-full -mt-14 mb-5"
                >
                  <div
              onClick={()=>{window.open('https://nanocord.glitch.me')}}

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
                        alt="Nanocord"
                        decoding="async"
                        className="rounded-full w-full h-full"
                        sizes="100vw"
                        width={'0px'}
                        height='0px'
                        src={'https://cdn.discordapp.com/attachments/854188580422025226/972853676152598570/Screenshot_20220501-2107362.png'}
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
                        Nanocord
                    </p>
                  </div>
                </div>
                <p
                  className="text-sm text-neutral-800 dark:text-neutral-300 h-14 w-full line-clamp-2"
                >
                  Create. Share. Grow. Brought to you by CursedBots.Inc.
                </p>
                <div
                  className="sm:flex space-y-2 sm:space-y-0 justify-between w-full gap-x-4 text-center mt-5"
                >
                  <div
                    onClick={()=>{window.open('https://nanocord.glitch.me')}}
                    className="w-full bg-sky-900/10 hover:bg-sky-900/50 hover:shadow-xl transition-all duration-200 cursor-pointer px-4 py-2 rounded-lg"
                  >
                    View
                  </div>
                  <div
                  onClick={()=>{window.open('https://discord.gg/zqRPsmDS95')}}
                    className="w-full bg-sky-900/10 hover:bg-sky-900/50 hover:shadow-xl transition-all duration-200 cursor-pointer px-4 py-2 rounded-lg"
                  >
                    Join
                  </div>
                </div>
              </div>
            </div>
            </div>
        </div>
    )
})