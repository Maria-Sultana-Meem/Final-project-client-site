import { Link, useLocation, useNavigate } from 'react-router'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { CgSpinnerTwoAlt } from 'react-icons/cg'
import useAuth from '../hooks/useAuth'
import { imageUpload, saveOrUpdateUser } from '../utilis'

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'

  const { register, handleSubmit, formState: { errors } } = useForm()

  
  const onSubmit = async data => {
    const { name, image, email, password, role } = data
    const imageFile = image[0]

    // Password validation
    if (!/[A-Z]/.test(password)) return toast.error('Password must contain an uppercase letter')
    if (!/[a-z]/.test(password)) return toast.error('Password must contain a lowercase letter')
    if (password.length < 6) return toast.error('Password must be at least 6 characters')

    try {
      const imageURL = imageFile ? await imageUpload(imageFile) : null
      const result = await createUser(email, password)
      await saveOrUpdateUser({ name, email, image: imageURL, role })
      await updateUserProfile(name, imageURL)

      toast.success('Signup Successful')
      navigate(from, { replace: true })
      console.log(result)
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  // 🔹 Demo Signup
  const handleDemoSignup = async () => {
    const demoEmail = 'demo@loanlink.com'
    const demoPassword = 'Demo1234'
    const demoName = 'Demo User'
    try {
      const result = await createUser(demoEmail, demoPassword)
      await saveOrUpdateUser({
        name: demoName,
        email: demoEmail,
        image: null,
        role: 'borrower',
      })
      await updateUserProfile(demoName, null)

      toast.success('Demo Signup Successful')
      navigate(from, { replace: true })
      console.log(result)
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  //  Google SignUp
  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle()
      await saveOrUpdateUser({
        name: user.displayName,
        email: user.email,
        image: user.photoURL || null,
        role: 'borrower',
      })
      toast.success('Signup Successful')
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
          <h1 className="text-4xl font-bold text-green-700">Register</h1>
          <p className="text-xl  mt-2">Welcome to Loanlink</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="w-full px-4 py-3 border rounded-md focus:outline-green-500"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          {/* Role */}
          <div>
            <label className="block mb-1 text-sm font-medium">Role</label>
            <select
              className="w-full px-4 py-3 border rounded-md"
              {...register('role', { required: 'Role is required' })}
            >
              <option value="borrower">Borrower</option>
              <option value="manager">Manager</option>
            </select>
            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
          </div>

          {/* Image */}
          <div>
            <label className="block mb-1 text-sm font-medium">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full py-3 border border-dashed border-green-400 rounded cursor-pointer"
              {...register('image')}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium">Email Address</label>
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
              placeholder="******"
              className="w-full px-4 py-3 border rounded-md focus:outline-green-500"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-semibold text-lg"
          >
            {loading ? <CgSpinnerTwoAlt className="animate-spin m-auto" /> : 'Continue'}
          </button>
        </form>

        {/* Demo Signup Button */}
        <button
          onClick={handleDemoSignup}
          className="w-full mt-4 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md font-semibold text-lg"
        >
          {loading ? <CgSpinnerTwoAlt className="animate-spin m-auto" /> : 'Demo Signup'}
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

        
        <p className="text-center text-sm text-gray-500 dark:text-gray-300 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-green-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
