import EazeSalesLogo from '../../assets/icons/eazeSalesLogo/eazeSalesLogo'
import "./authentication-style.css"
import { Outlet } from 'react-router-dom'
const AuthenticationWrapper = () => {
    return (
        <div className='authentication-wra8ai p-12'>
            <div className="auth-card grid grid-cols-2 rounded-xl overflow-hidden bg-slate-50 min-h-screen">
                <div className="card-part-group-1 col-span-1">
                </div>
                <div className="card-part-group-2 col-span-1 p-8">
                    <div className="web-icon inline-flex justify-end w-full">
                        <a href="/">
                            {<EazeSalesLogo className='size-8' />}
                        </a>
                    </div>
                    <div className="page-greetings">
                        <h3 className='text-lg font-medium text-neutral-400 text-start '>Welcome Back</h3>
                    </div>
                    <div className="authentication-form-group">
                       <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AuthenticationWrapper
