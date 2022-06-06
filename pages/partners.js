import Image from "next/image";
import { useRouter } from "next/router";
import HeaderB from "../components/Navbar";
export default function Partners({isLoggedIn}){
    const router = useRouter()
    return(
      <>
        <HeaderB isLoggedIn={isLoggedIn}/>
        <div class="p-5 lg:p-10 py-[8rem] lg:py-[10rem] rounded-lg min-h-screen">
            <h1 className='text-5xl text-sky-500 italic font-bold'>Partners</h1>
            <div class='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-24 mt-5'>
            <div
              style={{ zIndex: "10" }}
              className="cursor-pointer bot-card h-auto sm:h-48 group hover:shadow-xl transition-all duration-200 relative mt-14 w-full bg-orange-900/10 rounded-lg"
            >
              <div
                className="bot-bg w-full h-full absolute rounded-lg"
                style={{
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  filter: "blur(2px)",
                  opacity: "50%",
                }}
              ></div>
              <div style={{zIndex: '10'}} className="p-4 relative">
                <div style={{zIndex: '10'}} className="flex flex-col sm:flex-row justify-center sm:justify-start items-center w-full sm:space-x-2 h-full -mt-14 mb-5">
                  <div style={{zIndex: '10'}} className="bg-orange-800/20 flex items-center justify-center relative w-[76px] h-[76px] sm:ml-5 rounded-full drop-shadow-xl">
                    <div
                      style={{
                      zIndex: '10',
                        display: "block",
                        overflow: "hidden",
                        position: "absolute",
                        inset: "0px",
                        boxSizing: "border-box",
                        margin: "0px",
                      }}
                    >
                      <i
                        className="text-orange-400 fad fa-badge-check"
                        style={{
                          position: "absolute",
                          inset: "0px",
                          boxSizing: "border-box",
                          padding: "0px",
                          border: "none",
                          margin: "auto",
                          display: "block",
                          width: "40px",
                          height: "40px",
                          fontSize: '40px'
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-0 relative flex-shrink-0">
                    <p className="rounded-lg bg-sky-500 text-white dark:bg-orange-900/20 px-4 shadow-xl text-xl">
                      Be a partner
                    </p>
                  </div>
                </div>
                <p className="text-sm text-neutral-800 dark:text-neutral-300 h-14 w-full line-clamp-2">
                  This could be you. Apply for partner today.
                </p>
                <div className="sm:flex space-y-2 sm:space-y-0 justify-between w-full gap-x-4 text-center mt-5">
                  <div
                    onClick={() => router.push("/apply/partner")}
                    className="w-full bg-orange-900/10 hover:bg-orange-900/50 hover:shadow-xl transition-all duration-200 cursor-pointer px-4 py-2 rounded-lg"
                  >
                    Apply
                  </div>
                </div>
              </div>
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