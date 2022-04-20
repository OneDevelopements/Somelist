import Template from "../public/template";

export default Template(function Add(){
    return(
        <div class="p-5 lg:p-10 py-[8rem] lg:py-[10rem] rounded-lg min-h-screen">
        <h1 className='font-bold text-6xl text-violet-500'>Bot Submission</h1>
        <div className='lg:flex my-32 items-center'>
            <div className="mr-6 mb-3 w-full lg:w-60 lg:mb-0">
            <p className="text-lg font-semibold">Bot id</p>
            <p className="mt-1 text-sm text-zinc-400">Your bot's client id. You can get this from the Discord Developer Portal.</p>
            </div>
            <input placeholder="0000000000000" className="w-full bg-[#0B0A15]/70 backdrop-blur-md p-4 text-lg rounded-lg outline focus:outline-violet-500 outline-1 bg-zinc-900/50 outline-zinc-700" type='text'/>
        </div>

        <div className='lg:flex my-32 items-center'>
            <div className="mr-6 mb-3 w-full lg:w-60 lg:mb-0">
            <p className="text-lg font-semibold">Prefix</p>
            <p className="mt-1 text-sm text-zinc-400">What prefix your bot responds to. For example, if your using Slash Commands, place it as '/', or add your own custom prefix.</p>
            </div>
            <input placeholder="/" className="w-full bg-[#0B0A15]/70 backdrop-blur-md p-4 text-lg rounded-lg outline focus:outline-violet-500 outline-1 bg-zinc-900/50 outline-zinc-700" type='text'/>
        </div>
        <div className='lg:flex my-32 items-center'>
            <div className="mr-6 mb-3 w-full lg:w-60 lg:mb-0">
            <p className="text-lg font-semibold">Short description</p>
            <p className="mt-1 text-sm text-zinc-400">Give your bot a short and meaningful summary. This will appear on your bot's card and your bot's page!</p>
            </div>
            <input placeholder="The best and most wonderful bot ever!" className="w-full bg-[#0B0A15]/70 backdrop-blur-md p-4 text-lg rounded-lg outline focus:outline-violet-500 outline-1 bg-zinc-900/50 outline-zinc-700" type='text'/>
        </div>
        <div className='lg:flex my-32 items-center'>
            <div className="mr-6 mb-3 w-full lg:w-60 lg:mb-0">
            <p className="text-lg font-semibold">Long description</p>
            <p className="mt-1 text-sm text-zinc-400">Tell us more about your bot. Give us its features, history, or even something about you. HTML and Markdown is supported.</p>
            </div>
            <textarea resize className="h-44 w-full bg-[#0B0A15]/70 backdrop-blur-md p-4 text-lg rounded-lg outline focus:outline-violet-500 outline-1 bg-zinc-900/50 outline-zinc-700" type='text'></textarea>
        </div>

        <div className='lg:flex my-32 items-center'>
            <div className="mr-6 mb-3 w-full lg:w-60 lg:mb-0">
            <p className="text-lg font-semibold">Tags (select at most 5)</p>
            <p className="mt-1 text-sm text-zinc-400">Which tag best describes your bot?</p>
            </div>
            <input placeholder="/" className="w-full bg-[#0B0A15]/70 backdrop-blur-md p-4 text-lg rounded-lg outline focus:outline-violet-500 outline-1 bg-zinc-900/50 outline-zinc-700" type='text'/>
        </div>

        <div className='lg:flex my-32 items-center'>
            <div className="mr-6 mb-3 w-full lg:w-60 lg:mb-0">
            <p className="text-lg font-semibold">Website (optional)</p>
            <p className="mt-1 text-sm text-zinc-400">Have a website? Rep it off!</p>
            </div>
            <input placeholder={'https://somelist.tk'} className="w-full bg-[#0B0A15]/70 backdrop-blur-md p-4 text-lg rounded-lg outline focus:outline-violet-500 outline-1 bg-zinc-900/50 outline-zinc-700" type='text'/>
        </div>

        <div className='lg:flex my-32 items-center'>
            <div className="mr-6 mb-3 w-full lg:w-60 lg:mb-0">
            <p className="text-lg font-semibold">Github (optional)</p>
            <p className="mt-1 text-sm text-zinc-400">Open sourced? Share your repo here!</p>
            </div>
            <input placeholder={'https://github.com/popqa17/somelist'} className="w-full bg-[#0B0A15]/70 backdrop-blur-md p-4 text-lg rounded-lg outline focus:outline-violet-500 outline-1 bg-zinc-900/50 outline-zinc-700" type='text'/>
        </div>
        </div>
    )
})