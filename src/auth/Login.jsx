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
  const from = location.state?.from || '/'

  const { register, handleSubmit, formState: { errors } } = useForm()

  // 🔹 Standard Login
  const onSubmit = async data => {
    const { email, password } = data
    try {
      const { user } = await signIn(email, password)
      await saveOrUpdateUser({
        name: user.displayName,
        email: user.email,
        image: user.photoURL || null
      })
      toast.success('Login Successful')
      navigate(from, { replace: true })
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  // 🔹 Demo Login
  const handleDemoLogin = async () => {
    const demoEmail = 'demo@loanlink.com'
    const demoPassword = 'Demo1234'
    try {
      const { user } = await signIn(demoEmail, demoPassword)
      await saveOrUpdateUser({
        name: user.displayName || 'Demo User',
        email: user.email,
        image: user.photoURL || null
      })
      toast.success('Demo Login Successful')
      navigate(from, { replace: true })
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  // 🔹 Google Login
  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle()
      await saveOrUpdateUser({
        name: user.displayName,
        email: user.email,
        image: user.photoURL || null
      })
      toast.success('Login Successful')
      navigate(from, { replace: true })
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen py-30 ">
      <div className="w-full max-w-lg shadow-lg rounded-lg p-8 ">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-700">Login</h1>
          <p className="text-xl  mt-2">Welcome back to Loanlink</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter Your Email"
              className="w-full px-4 py-3 border rounded-md focus:outline-green-500"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-md focus:outline-green-500"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-md text-white font-semibold text-lg transition"
          >
            {loading ? <CgSpinnerTwoAlt className="animate-spin m-auto" /> : 'Login'}
          </button>
        </form>

        {/* Demo Login */}
        <button
          onClick={handleDemoLogin}
          className="w-full mt-4 py-3 bg-yellow-500 hover:bg-yellow-600 rounded-md text-white font-semibold text-lg transition"
        >
          {loading ? <CgSpinnerTwoAlt className="animate-spin m-auto" /> : 'Demo Login'}
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="px-3 text-sm text-gray-400">Or continue with</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google */}
        <div
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-3 border py-3 rounded-md cursor-pointer hover:scale-105 transition"
        >
          <FcGoogle size={28} />
          <p className="font-medium text-gray-700 dark:text-gray-200">Continue with Google</p>
        </div>

        {/* Bottom Link */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-300 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-green-600 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
