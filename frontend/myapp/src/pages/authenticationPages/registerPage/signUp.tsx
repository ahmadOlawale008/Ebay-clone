import React, { FormEvent, useEffect, useReducer, useRef, useState } from 'react'
import Button from '../../../components/Button/button'
import TextInput from '../../../components/Input/input'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'
import { FormType } from '../auth'
import { axiosInstance } from '../../../api/axiosInstance'
import axios, { Axios, AxiosError, isAxiosError } from 'axios'

const SignUpPage = () => {
  const [formState, setFormState] = useState({ first_name: "", last_name: "", email: "", password: "", confirm_password: "" })
  const [formErrors, setFormErrorsState] = useState<FormType>({})

  const handleFormRegistrationForm = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("first_name", formState.first_name.trim())
    formData.append("last_name", formState.last_name.trim())
    formData.append("email", formState.email.trim())
    formData.append("password", formState.password.trim())
    formData.append("confirm_password", formState.confirm_password.trim())
    axiosInstance.post("/auth/signup/", formData, { headers: { "Content-Type": "application/json" }}).then(response => {
      console.log(response, "Login successful")
      if (response.status === 400 && response.hasOwnProperty("response")) {

      }
    }).catch((error) => {
      console.log(error, "Login failed");
      if(isAxiosError(error)){
        const responseData = error.response?.data
        let updatedFormErrors: FormType = {}
        Object.keys(responseData).forEach((field)=>{
          updatedFormErrors[field as keyof FormType] = responseData[field]
        })
        setFormErrorsState(updatedFormErrors)

      }
    })
  }
useEffect(()=>{console.log(formErrors)})
  const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {
    const element = (e.target as HTMLInputElement)
    const element_name = element.name
    setFormState({ ...formState, [element_name.substring(5)]: element.value })
  }
  const [showPassword, setPasswordState] = useState(false)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  return (
    <div>
      <div className="text-start">
        <h4 className='text-3xl text-neutral-900 my-1 font-bold'>Sign Up Page</h4>
      </div>
      <div className="group-help-authorization text-base font-normal">
        <span>If you have an account with us</span>
        <span className='ml-1'><Link to="/login" className=' underline text-blue-600 underline-offset-1 font-bold'>sign in</Link></span>
      </div>
      <div className='form-group'>
        <form onChange={(e) => handleFormChange(e)} onSubmit={(e) => handleFormRegistrationForm(e)} method='post' action="">
          <div className='grid-cols-2 mt-2 mb-6 grid  justify-center gap-x-2 gap-y-0 grid-rows-3'>
            <div className="">
              <TextInput size='small' error={!!formErrors.first_name} helperText={formErrors?.first_name} required type='text' baseClassName='text-sm' label='First Name' name='form_first_name' variant='outlined' id='first_name_input' placeholder='First Name' />
            </div>
            <div className="">
              <TextInput size='small' error={!!formErrors.last_name} helperText={formErrors?.last_name} required type='text' baseClassName='text-sm' label='Last Name' name='form_last_name' variant='outlined' id='last_name_input' placeholder='Last Name' iconPosition='end' />
            </div>
            <div className="col-span-2">
              <TextInput size='small' error={!!formErrors.email} helperText={formErrors?.email} required label='Email' baseClassName='text-sm' variant='outlined' name='form_email' id='email_input' placeholder='Email' type='email' />
            </div>
            <div className="col-span-2">
              <TextInput size='small' error={!!formErrors.password} helperText={formErrors?.password} name='form_password' required ref={passwordRef} label='Password' baseClassName='text-sm' type='password' variant='outlined' id='password_input' placeholder='Password' iconPosition='end'
                icon={!showPassword ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-6 cursor-pointer">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
                } />
              <div onClick={() => {
                if (showPassword) {
                  passwordRef.current?.setAttribute("type", "password")
                } else {
                  passwordRef.current?.setAttribute("type", "text")
                }
                setPasswordState(!showPassword)
              }} className='float-right'>
                <span className='underline select-none text-sm underline-offset-2 cursor-pointer'>{showPassword ? "Hide" : "Show"}</span>
              </div>
            </div>
            <div className="col-span-2">
              <TextInput size='small' error={!!formErrors.confirm_password} helperText={formErrors?.confirm_password} required label='Confirm password' name='form_confirm_password' type='password' baseClassName='text-sm' variant='outlined' id='confirm_password_input' placeholder='Confirm Password' />
            </div>
          </div>
          <div className="inline-flex flex-nowrap items-center">
            <input type="checkbox" name="form_remember_me" id="login-checkbox516" className='size-4' />
            <label htmlFor="login-checkbox516" className='ml-2 text-sm'>Remember me</label>
          </div>
          <div className="form-signup-submit">
            <Button variant='filled' fullWidth color='primary'>Submit</Button>
          </div>
        </form>
        <div className='continue-with-divider my-7 relative w-full'>
          <div className="horizontal-text-divider">
            <span className='max-lg:bg-white bg-slate-50 px-1'>or</span>
          </div>
        </div>
        <div className="inline-flex gap-x-3 items-center justify-center w-full">
          <Button variant='outlined' color='primary'>
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
export default SignUpPage
