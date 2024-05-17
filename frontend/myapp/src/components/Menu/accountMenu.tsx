import SettingsIcon from "../../assets/icons/settingsIcon"
import UserIcon from "../../assets/icons/userIcon"
import {motion} from "framer-motion"
const AccountMenu = () => {
    return (
        <div className="absolute top-0 translate-x-[-13px] shadow-xl translate-y-[30px] rounded-lg z-20 right-0 bg-slate-200 min-w-[350px]  py-5">
            <div className="w-full mx-auto  items-center">
                <div className="w-full flex flex-col gap-y-4 justify-center mx-auto">
                    <span className='border ring-2 ring-slate-300 inline-flex items-center justify-center m-auto size-16 rounded-full bg-slate-500 p-1 '>
                        <UserIcon className='size-16 content-[1] relative cursor-pointer fill-white' />
                    </span>
                    <div className="text-center tracking-wide block">
                        <p className="text-center text-lg ">
                            @user
                        </p>
                        <small className="text-base">
                            user12@gmail.com
                        </small>
                    </div>
                </div>
                <div className="my-3">
                    <div className="px-2 items-center gap-x-3 flex bg-slate-300 py-3">
                        <SettingsIcon className="size-8 fill-slate-400" />
                        <div className="">
                            Settings
                        </div>
                    </div>
                    <hr />
                    <div className="px-2 items-center gap-x-3 flex bg-slate-300 py-3">
                        <SettingsIcon className="size-8 fill-slate-400" />
                        <div className="">
                            Settings
                        </div>
                    </div>
                    <div className="px-2 items-center gap-x-3 flex bg-slate-300 py-3">
                        <motion.div className="capsule-login size-16 rounded-full flex items-center justify-center bg-slate-700">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
                            </svg>
                        </motion.div>
                    </div>
                </div>
                <div className="capsule w-full cursor-pointer  rounded-full mt-6 bg-slate-300">
                    <motion.div className="capsule-login size-16 rounded-full flex items-center justify-center bg-slate-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
                        </svg>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default AccountMenu
