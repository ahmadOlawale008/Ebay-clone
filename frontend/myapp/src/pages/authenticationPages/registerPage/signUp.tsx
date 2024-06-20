import React from 'react'
import Button from '../../../components/Button/button'
import TextInput from '../../../components/Input/input'

const SignUpPage = () => {
  const handleFormRegistrationForm = (e: React.FormEvent) => {
    e.preventDefault()
  }
  return (
    <div>
      <div className="text-2xl my-1 font-semibold text-start">
        <h4>Sign Up Page</h4>
      </div>
      <div className="group-help-authorization">
        <span>If you have an account</span>
        <span className='ml-1'><a href="/login" className=' underline underline-offset-1 font-semibold'>sign in</a></span>
      </div>
      <div className='form-group mt-5'>
        <form onSubmit={(e)=>handleFormRegistrationForm(e)} method='post' action="">
          <div className='grid-cols-2 my-6 grid items-center justify-center gap-4 grid-rows-3'>
            <div className="">
              <TextInput label='First Name' variant='outlined' id='first_name_input' placeholder='First Name'  />
            </div>
            <div className="">
              <TextInput label='Last Name' variant='outlined' id='last_name_input' placeholder='Last Name' iconPosition='end'/>
            </div>
            <div className="col-span-2">
              <TextInput helperText='ql1l11o11o1' variant='outlined' id='email_input' placeholder='Email' type='email' />
            </div>
            <div className="">
              <TextInput variant='outlined' id='last_name_input' placeholder='First Name' icon={<svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
              </svg>} />
            </div>
            <div className="">
              <TextInput variant='outlined' id='last_name_input' placeholder='First Name' icon={<svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
              </svg>} />
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
