import React from 'react'
import Button from '../../../components/Button/button'
import TextInput from '../../../components/Input/input'

const SignUpPage = () => {
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
        <form method='post' action="">
          <div className='grid-cols-3 grid-rows-3'>
            <div className="">
              <label htmlFor="first_name_input" className='text-sm font-light text-neutral-800'>First Name</label>
              <TextInput id='first_name_input' placeholder='First Name' icon={<svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
              </svg>} />
            </div>
            <div className="">
              <label htmlFor="first_name_input" className='text-sm font-light text-neutral-800'>First Name</label>
              <TextInput variant='filled' id='first_name_input' placeholder='First Name' icon={<svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
              </svg>} />
            </div>
          </div>
          <div className="form-signup-submit">
            <Button fullWidth color='primary'>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUpPage
