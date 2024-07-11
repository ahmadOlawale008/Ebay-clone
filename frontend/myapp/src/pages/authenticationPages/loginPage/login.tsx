import React, { useRef, useState } from 'react'
import Button from '../../../components/Button/button'
import TextInput from '../../../components/Input/input'
import { Link, useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'
import { toast } from 'sonner'
import { axiosInstance } from '../../../api/axiosInstance'
import { SignInFormType } from '../auth'
import { isAxiosError } from 'axios'
import { ClipLoader } from 'react-spinners'
const LoginPage = () => {
  const [formContent, setFormContent] = useState<SignInFormType>({email: "", password: ""})
  const [errorMessage, setErrorMessage] = useState("")
  const [formIsLoading, setIsFormLoading] = useState(false)
  const navigate = useNavigate()

  const handleFormRegistrationForm = (e: React.FormEvent) => {
    e.preventDefault()
    setIsFormLoading(true)
    const formData = new FormData()
    formData.append("email", formContent.email.trim())
    formData.append("password", formContent.password)

    axiosInstance.post("auth/api/token/", formData).then(res=>{
      if (res.status === 200){
        toast.success("Login successful")
        setTimeout(()=>{
          navigate("/")
        }, 3000)
      }
    }).catch((error)=>{
      console.log(error, "Login Error")
      if(isAxiosError(error)){
        if (error.response?.data.hasOwnProperty("Authentication_status") && error.response?.data.Authentication_status === "Failed"){
          setErrorMessage(error.response.data.error)
        }
      }
    }).finally(() => {
      setIsFormLoading(false)
    })
  }
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const element = (e.target as HTMLInputElement)
    const element_name = element.name
    setFormContent(prev => ({...prev, [element_name.substring(5)]: element.value.trim() }))
    setErrorMessage("")
  }
  const loginWithGoogle = useGoogleLogin({
    scope: "openid profile email",
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse)
    },
    onNonOAuthError: ({ type }) => {
      if (type === 'popup_closed') {
        toast.error("Popup closed.", { position: 'bottom-center', duration: 2000 });
      } else if (type === 'popup_failed_to_open') {
        toast.error("Google Authentication failed to open. This issue might be on our end. Please try again later or sign up manually.", { position: 'bottom-center', duration: 2000 });
      }
    },

    onError: (errorResponse) => {
      console.log(errorResponse, "B")
      toast.error(errorResponse.error, { position: "bottom-center", duration: 2000 })
    }
  })
  return (
    <div className='mt-4'>
      <div className="text-start">
        <h4 className='text-3xl text-neutral-900 my-1 font-bold'>Login Page</h4>
      </div>
      <div className="group-help-authorization text-[15px] font-normal">
        <span>Don't have an account with us?</span>
        <span className='ml-1'><Link to="/signup" className=' underline text-blue-600 underline-offset-1 font-bold'>sign up</Link></span>
      </div>
      <div className='form-group'>
        {!!errorMessage && <div>
          <span className='text-red-500 text-sm'><i className="fa-solid mr-1 fa-circle-exclamation"></i>{errorMessage}</span>
        </div>}
        <form className='*:mt-3 mt-3' onSubmit={(e) => handleFormRegistrationForm(e)} method='post' action="">
          <div className='*:my-2'>
            <div className="">
              <TextInput onChange={(e)=>handleFormChange(e)} value={formContent.email} name='form_email' label='Email' size='small' required baseClassName='text-sm' type='email' variant='outlined' id='first_name_input' placeholder='Email or Phone Number' />
            </div>
            <div className="">
              <TextInput onChange={(e)=>handleFormChange(e)} value={formContent.password} name='form_password' label='Password' size='small' required baseClassName='text-sm' type='password' variant='outlined' id='first_name_input' placeholder='Password' />
            </div>
          </div>
          <div className="form-signup-submit">
            <Button disabled={formIsLoading} variant='filled' fullWidth color='primary'> {formIsLoading && <ClipLoader size={15} color='black' />}Submit</Button>
          </div>
        </form>
        <div className='mt-3 forgotten-password-login'>
          <a href='#forgotten-password' className='tracking-wide text-sm text-blue-800 font-bold'>Forgot Password?</a>
        </div>
      </div>
      <div className='continue-with-googlea9oa flex flex-col items-center justify-center'>
        <div className='continue-with-divider my-7 relative w-full'>
          <div className="horizontal-text-divider">
            <span className='max-lg:bg-white bg-slate-50 px-1'>or</span>
          </div>
        </div>
        <div className="inline-flex gap-x-3 items-center justify-center w-full">
          <Button baseClassName='continue-with-googlebtn' variant='outlined' onClick={() => loginWithGoogle()} color='primary'>
            <svg className='size-6' width="800px" height="800px" viewBox="0 -31.5 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
              <g>
                <path d="M58.1818182,192.049515 L58.1818182,93.1404244 L27.5066233,65.0770089 L0,49.5040608 L0,174.59497 C0,184.253152 7.82545455,192.049515 17.4545455,192.049515 L58.1818182,192.049515 Z" fill="#4285F4">
                </path>
                <path d="M197.818182,192.049515 L238.545455,192.049515 C248.203636,192.049515 256,184.224061 256,174.59497 L256,49.5040608 L224.844415,67.3422767 L197.818182,93.1404244 L197.818182,192.049515 Z" fill="#34A853">
                </path>
                <polygon fill="#EA4335" points="58.1818182 93.1404244 54.0077618 54.4932827 58.1818182 17.5040608 128 69.8676972 197.818182 17.5040608 202.487488 52.4960089 197.818182 93.1404244 128 145.504061">
                </polygon>
                <path d="M197.818182,17.5040608 L197.818182,93.1404244 L256,49.5040608 L256,26.2313335 C256,4.64587897 231.36,-7.65957557 214.109091,5.28587897 L197.818182,17.5040608 Z" fill="#FBBC04">
                </path>
                <path d="M0,49.5040608 L26.7588051,69.5731646 L58.1818182,93.1404244 L58.1818182,17.5040608 L41.8909091,5.28587897 C24.6109091,-7.65957557 0,4.64587897 0,26.2313335 L0,49.5040608 Z" fill="#C5221F">
                </path>
              </g>
            </svg>
          </Button>
          <Button variant='outlined' color='primary'>
            <svg width="800px" height="800px" className='size-6' viewBox="0 -4 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
              <title>Twitter-color</title>
              <desc>Created with Sketch.</desc>
              <defs>
              </defs>
              <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Color-" transform="translate(-300.000000, -164.000000)" fill="#00AAEC">
                  <path d="M348,168.735283 C346.236309,169.538462 344.337383,170.081618 342.345483,170.324305 C344.379644,169.076201 345.940482,167.097147 346.675823,164.739617 C344.771263,165.895269 342.666667,166.736006 340.418384,167.18671 C338.626519,165.224991 336.065504,164 333.231203,164 C327.796443,164 323.387216,168.521488 323.387216,174.097508 C323.387216,174.88913 323.471738,175.657638 323.640782,176.397255 C315.456242,175.975442 308.201444,171.959552 303.341433,165.843265 C302.493397,167.339834 302.008804,169.076201 302.008804,170.925244 C302.008804,174.426869 303.747139,177.518238 306.389857,179.329722 C304.778306,179.280607 303.256911,178.821235 301.9271,178.070061 L301.9271,178.194294 C301.9271,183.08848 305.322064,187.17082 309.8299,188.095341 C309.004402,188.33225 308.133826,188.450704 307.235077,188.450704 C306.601162,188.450704 305.981335,188.390033 305.381229,188.271578 C306.634971,192.28169 310.269414,195.2026 314.580032,195.280607 C311.210424,197.99061 306.961789,199.605634 302.349709,199.605634 C301.555203,199.605634 300.769149,199.559408 300,199.466956 C304.358514,202.327194 309.53689,204 315.095615,204 C333.211481,204 343.114633,188.615385 343.114633,175.270495 C343.114633,174.831347 343.106181,174.392199 343.089276,173.961719 C345.013559,172.537378 346.684275,170.760563 348,168.735283" id="Twitter">
                  </path>
                </g>
              </g>
            </svg>
          </Button>
          <Button variant='outlined' color='primary'>
            <svg className='size-6' width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="#3B5998" fillRule="evenodd" d="M9.94474914,22 L9.94474914,13.1657526 L7,13.1657526 L7,9.48481614 L9.94474914,9.48481614 L9.94474914,6.54006699 C9.94474914,3.49740494 11.8713513,2 14.5856738,2 C15.8857805,2 17.0033128,2.09717672 17.3287076,2.13987558 L17.3287076,5.32020466 L15.4462767,5.32094085 C13.9702212,5.32094085 13.6256856,6.02252733 13.6256856,7.05171716 L13.6256856,9.48481614 L17.306622,9.48481614 L16.5704347,13.1657526 L13.6256856,13.1657526 L13.6845806,22" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
