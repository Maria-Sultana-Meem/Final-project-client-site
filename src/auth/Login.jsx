import { Link, useLocation, useNavigate } from 'react-router'
import { FcGoogle } from 'react-icons/fc'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { CgSpinnerTwoAlt } from 'react-icons/cg'
import useAuth from '../hooks/useAuth'
import { saveOrUpdateUser } from '../utilis'

const Login = () => {
  const { signIn, signInWithGoogle, loading } = useAuth()
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
    const {user} = await signIn(email, password)
     await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      })
      toast.success('Login Successful')
      navigate(from, { replace: true })
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
    const {user} = await signInWithGoogle()
    await saveOrUpdateUser({
            name: user?.displayName,
            email: user?.email,
            image: user?.photoURL || null,
            
          })
      
      toast.success('Login Successful')
      navigate(from, { replace: true })
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen  py-30">
      <div className="w-full max-w-xl  rounded-lg shadow-lg shadow-green-300 p-6 sm:p-10 transition-colors duration-300">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold ">Login</h1>
          <p className="text-2xl text-green-500  mt-2">Welcome back to Loanlink</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm ">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email Here"
              className="w-full px-4 py-3 rounded-md  border   focus:outline-green-500"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Please enter a valid email address.',
                },
              })}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-2 text-sm ">Password</label>
            <input
              type="password"
              id="password"
              placeholder="*******"
              autoComplete="current-password"
              className="w-full px-4 py-3 rounded-md b border border-gray-300  dark:text-white focus:outline-green-500"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:scale-105 hover:bg-green-600 text-white py-3 rounded-md text-lg transition-all duration-300"
            >
              {loading ? <CgSpinnerTwoAlt className="animate-spin m-auto" /> : 'Login'}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px "></div>
          <p className="px-3 text-sm ">Or continue with</p>
          <div className="flex-1 h-px "></div>
        </div>

        {/* Google Login */}
        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center  items-center gap-3 border  py-3 rounded-md cursor-pointer hover:scale-105 transition-transform duration-200"
        >
          <FcGoogle size={28} />
          <p className=" font-medium">Continue with Google</p>
        </div>

        {/* Bottom Link */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-300 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 dark:text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
