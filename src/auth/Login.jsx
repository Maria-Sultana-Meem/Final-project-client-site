import { Link, useLocation, useNavigate } from 'react-router'
import { FcGoogle } from 'react-icons/fc'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { CgSpinnerTwoAlt } from 'react-icons/cg'
import useAuth from '../hooks/useAuth'



const Login = () => {
  const {signIn, signInWithGoogle, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state || '/'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async data => {
    const { email, password } = data
    try {
      await signIn(email, password)
      toast.success('Login Successful')
      navigate(from, { replace: true })
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      toast.success('Login Successful')
      navigate(from, { replace: true })
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  return (
    <div className='flex pt-30 justify-center items-center min-h-screen bg-white'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Login</h1>
          <p className='text-sm text-gray-400'>Welcome back to PlantNet</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          {/* Email */}
          <div>
            <label htmlFor='email' className='block mb-2 text-sm'>
              Email Address
            </label>
            <input
              type='email'
              id='email'
              placeholder='Enter Your Email Here'
              className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Please enter a valid email address.',
                },
              })}
            />
            {errors.email && (
              <p className='text-red-500 text-xs mt-1'>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor='password' className='text-sm mb-2'>
              Password
            </label>
            <input
              type='password'
              id='password'
              placeholder='*******'
              autoComplete='current-password'
              className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
            {errors.password && (
              <p className='text-red-500 text-xs mt-1'>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type='submit'
              className='bg-lime-500 w-full rounded-md py-3 text-white'
            >
              {loading ? (
                <CgSpinnerTwoAlt className='animate-spin m-auto' />
              ) : (
                'Login'
              )}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 bg-gray-300'></div>
          <p className='px-3 text-sm text-gray-500'>Or continue with</p>
          <div className='flex-1 h-px sm:w-16 bg-gray-300'></div>
        </div>

        {/* Google Login */}
        <div
          onClick={handleGoogleSignIn}
          className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 cursor-pointer rounded-md'
        >
          <FcGoogle size={28} />
          <p>Continue with Google</p>
        </div>

        <p className='px-6 text-sm text-center text-gray-400'>
          Don't have an account?{' '}
          <Link
            to='/register'
            className='hover:underline hover:text-lime-500 text-gray-600'
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
