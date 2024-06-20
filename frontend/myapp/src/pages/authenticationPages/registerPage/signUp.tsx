import React, { useRef, useState } from 'react'
import Button from '../../../components/Button/button'
import TextInput from '../../../components/Input/input'

const SignUpPage = () => {
  const handleFormRegistrationForm = (e: React.FormEvent) => {
    e.preventDefault()
  }
  const [showPassword, setPasswordState] = useState(false)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  return (
    <div>
      <div className="text-2xl my-1 font-semibold text-start">
        <h4>Sign Up Page</h4>
      </div>
      <div className="group-help-authorization">
        <span>If you have an account</span>
        <span className='ml-1'><a href="/login" className=' underline underline-offset-1 font-semibold'>sign in</a></span>
      </div>
      <div className='form-group'>
        <form onSubmit={(e) => handleFormRegistrationForm(e)} method='post' action="">
          <div className='grid-cols-2 mt-2 mb-6 grid items-center justify-center gap-x-2 gap-y-0 grid-rows-3'>
            <div className="">
              <TextInput type='text' baseClassName='text-sm' label='First Name' variant='outlined' id='first_name_input' placeholder='First Name' />
            </div>
            <div className="">
              <TextInput type='text' baseClassName='text-sm' label='Last Name' variant='outlined' id='last_name_input' placeholder='Last Name' iconPosition='end' />
            </div>
            <div className="col-span-2">
              <TextInput label='Email' baseClassName='text-sm' variant='outlined' id='email_input' placeholder='Email' type='email' />
            </div>
            <div className="col-span-2">
              <TextInput ref={passwordRef} label='Password' baseClassName='text-sm' type='password' variant='outlined' id='last_name_input' placeholder='First Name' iconPosition='end'
                icon={!showPassword ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-6 cursor-pointer">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
                } />
              <div onClick={() => {
                if(showPassword){
                  passwordRef.current?.setAttribute("type", "password")
                }else{
                  passwordRef.current?.setAttribute("type", "text")
                }
                setPasswordState(!showPassword)
              }} className='float-right'>
                <span className='underline select-none underline-offset-2 cursor-pointer'>{showPassword ? "Hide" : "Show"}</span>
                </div>
            </div>
            <div className="col-span-2">
              <TextInput label='Confirm password' type='password' baseClassName='text-sm' variant='outlined' id='last_name_input' placeholder='First Name' />
            </div>
          </div>
          <div className="form-signup-submit">
            <Button variant='filled' fullWidth color='primary'>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUpPage
