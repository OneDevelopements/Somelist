import Template from "../public/template";

export default Template(function rules(){
    return(
        <div className="p-5 lg:p-10 py-[10rem] lg:py-[12rem] rounded-lg min-h-screen">
            <h1 className="italic text-sky-600 text-7xl font-bold">BOT RULES</h1>
            <p className="text-1xl font-bold italic text-red-400">* Bots marked as NSFW will only be visible if the user turned off the NSFW filter.</p>
            <h1 className="mt-10 underline italic decoration-4 decoration-sky-600 text-3xl font-bold">General</h1>

            <ol className="mt-3 list-decimal mx-10">
                <li className="text-md my-1 font-medium">Follow the <a className="text-sky-500 font-bold" href='https://discord.com/terms' >Discord Developer TOS</a>. Breaking the TOS can lead to us reporting your bot, and disabling your account.</li>
                <li className="text-md my-1 font-medium">Minimal NSFW. NSFW should not be accessible in channels not marked as NSFW.</li>

            </ol>
            <h1 className="mt-10 underline italic decoration-4 decoration-sky-600 text-3xl font-bold">Page Content</h1>
            <ol className="mt-3 list-decimal mx-10">
                <li className="text-md my-1 font-medium">Your bot's page content should not advertise another bot, or unrelated site.</li>
                <li className="text-md my-1 font-medium">Provide details about your bot. We love seeing detailed, and explanatory descriptions.</li>
                <li className="text-md my-1 font-medium">No scripts. Your bot's page should not include any scripts that can be malicious to the end-user.</li>
                <li className="text-md my-1 font-medium">No NSFW. Unless your bot has been marked as NSFW, your bot's page should <span className='text-sky-500 font-bold'>NOT</span> include NSFW materials.</li>

            </ol>

            <h1 className="mt-10 underline italic decoration-4 decoration-sky-600 text-3xl font-bold">Bot Features</h1>
            <ol className="mt-3 list-decimal mx-10">
                <li className="text-md my-1 font-medium">Your bot should not advertise another bot.</li>
                <li className="text-md my-1 font-medium">Your bot should not be used for malicious reasons, or mass dms.</li>
                <li className="text-md my-1 font-medium">User-Friendly. Your bot should have a help command to ease the usage of your bot.</li>
                <li className="text-md my-1 font-medium">Voting is not a currency. You should not limit features to users who voted, however adding perks is allowed.</li>

            </ol>
        </div>
    )
})