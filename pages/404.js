import { useRouter } from "next/router";

export default function notfound(){
    const router = useRouter()
    return(
            <div className="p-5 lg:p-10 py-[10rem] lg:py-[12rem] rounded-lg min-h-screen">
            <div className="flex justify-center w-full">
                <div className="px-6 lg:px-36 max-w-4xl">
                <div className="flex flex-col mt-20 justify-center text-center w-full">
                    <p
                    className="text-8xl text-transparent bg-clip-text bg-gradient-to-bl to-sky-500 from-purple-600 font-semibold"
                    >
                    404
                    </p>
                    <p
                    className="mt-2 text-2xl text-transparent bg-clip-text bg-gradient-to-bl to-gray-200 from-gray-400 font-semibold"
                    ></p>
                    <p
                    className="mt-1 text-xl text-transparent bg-clip-text bg-gradient-to-bl to-gray-400 from-gray-600 dark:to-gray-200 dark:from-gray-400 font-semibold"
                    >
                    We couldn't find the page you were looking for.
                    </p>
                    <div className="mt-10">
                    <div className="w-full h-1 my-3 bg-zinc-500/0 rounded-xl"></div>
                    <div
                        onClick={() => {router.back()}}
                        className="w-full hover:bg-zinc-500/5 px-6 my-2 hover:px-6 rounded-lg transition-all duration-200 cursor-pointer border border-black/5 dark:border-white/5 py-5 flex justify-between items-center"
                    >
                        <div className="flex gap-x-4">
                        <i
                            className="flex items-center bg-sky-500/10 rounded-lg text-xl w-12 h-12 text-sky-600 px-3 py-2 fas fa-arrow-left"
                        ></i>
                        <div className="text-left mr-3">
                            <p className="text-lg text-sky-500 dark:text-sky-200">
                            Go Back
                            </p>
                            <p className="text-sm text-black/50 dark:text-white/50">
                            Back to the page you were redirected to here
                            </p>
                        </div>
                        </div>
                        <i className="px-2 fas fa-chevron-right text-zinc-500"></i>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>

    )
}