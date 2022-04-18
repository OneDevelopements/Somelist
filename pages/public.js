import Template from '../public/template';

function Public(){
    return(
        <div className='flex items-center h-screen '>
            <div className='w-screen text-center'>
            <p className='text-6xl font-bold italic'>Please wait</p>
            <p className='mt-6 text-lg font-semi-bold text-black/70 dark:text-white/70'>Do not leave this page.</p>
            </div>
        </div>
    );
}

export default Template(Public)