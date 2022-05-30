import Image from "next/image";
import { useRouter } from "next/router";


const BotCard = (props) => {
    const router = useRouter()
    return (
      <div
        onClick={() => router.push("/bot/" + props.id)}
        style={{ zIndex: "10" }}
        className="cursor-pointer bot-card h-auto sm:h-48 group hover:shadow-xl transition-all duration-200 relative mt-14 w-full bg-sky-900/10 rounded-lg"
      >
        <div
          className="bot-bg w-full h-full absolute rounded-lg"
          style={{
            background: `url(${props.banner})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            filter: "blur(2px)",
            opacity: "50%",
          }}
        ></div>
        <div style={{zIndex: '10'}} className="p-4 relative">
          <div style={{zIndex: '10'}} className="flex flex-col sm:flex-row justify-center sm:justify-start items-center w-full sm:space-x-2 h-full -mt-14 mb-5">
            <div style={{zIndex: '10'}} className="relative flex-shrink-0 w-[76px] h-[76px] sm:ml-5 rounded-full drop-shadow-xl">
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
                <Image
                  alt="vcodes.xyz"
                  decoding="async"
                  className="rounded-full w-full h-full"
                  sizes="100vw"
                  width={"0px"}
                  height="0px"
                  src={props.avatar}
                  style={{
                    position: "absolute",
                    inset: "0px",
                    boxSizing: "border-box",
                    padding: "0px",
                    border: "none",
                    margin: "auto",
                    display: "block",
                    width: "0px",
                    height: "0px",
                    minWidth: "100%",
                    maxWidth: "100%",
                    minHeight: "100%",
                    maxHeight: "100%",
                  }}
                />
              </div>
            </div>
            <div className="mt-5 sm:mt-0 relative flex-shrink-0">
              <p className="rounded-lg bg-sky-500 text-white dark:bg-sky-900/20 px-4 shadow-xl text-xl">
                {props.name}
              </p>
            </div>
          </div>
          <p className="text-sm text-neutral-800 dark:text-neutral-300 h-14 w-full line-clamp-2">
            {props.shortdesc}
          </p>
          <div className="sm:flex space-y-2 sm:space-y-0 justify-between w-full gap-x-4 text-center mt-5">
            <div
              onClick={() => router.push("/bot/" + props.id.toString())}
              className="w-full bg-sky-900/10 hover:bg-sky-900/50 hover:shadow-xl transition-all duration-200 cursor-pointer px-4 py-2 rounded-lg"
            >
              View
            </div>
            <div className="w-full bg-sky-900/10 hover:bg-sky-900/50 hover:shadow-xl transition-all duration-200 cursor-pointer px-4 py-2 rounded-lg">
              Vote
            </div>
          </div>
        </div>
        <div className="absolute flex items-center top-2 right-2 bg-sky-500/10 px-3 py-1 rounded-lg text-sm">
          <i className="fa fa-chevron-up mr-2"></i>
          {props.votes}
        </div>
      </div>
    );
  };
  export default BotCard;
  