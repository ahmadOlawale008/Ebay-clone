import React, { useRef, useState } from 'react'
import Button from '../../../components/Button/button'
import TextInput from '../../../components/Input/input'

const LoginPage = () => {
  const handleFormRegistrationForm = (e: React.FormEvent) => {
    e.preventDefault()
  }
  const [showPassword, setPasswordState] = useState(false)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  return (
    <div>
      <div>
        <div className="text-2xl my-1 font-semibold text-start">
          <h4>Login Page</h4>
        </div>
        <div className="group-help-authorization text-base">
          <span>If you have not created an account with us</span>
          <span className='ml-1'><a href="/signup" className=' underline underline-offset-1 font-semibold'>sign up</a></span>
        </div>
        <div className='form-group'>
          <form onSubmit={(e) => handleFormRegistrationForm(e)} method='post' action="">
            <div className='mt-4 mb-6 grid grid-cols-1 gap-y-5'>
              <div className="">
                <TextInput required baseClassName='text-sm' type='email' variant='outlined' id='first_name_input' placeholder='Email or Phone Number' />
              </div>
              <div className="">
                <TextInput required baseClassName='text-sm' type='password' variant='outlined' id='first_name_input' placeholder='Password' />
              </div>
            </div>
            <div className="form-signup-submit">
              <Button variant='filled' fullWidth color='primary'>Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
