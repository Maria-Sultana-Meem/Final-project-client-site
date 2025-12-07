import { Link, useLocation, useNavigate } from 'react-router'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { imageUpload, saveOrUpdateUser } from '../utilis'
import useAuth from '../hooks/useAuth'
import { CgSpinnerTwoAlt } from 'react-icons/cg'

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state || '/'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async data => {
    const { name, image, email, password } = data
    const imageFile = image[0]

    // Password Validation
    if (!/[A-Z]/.test(password)) return toast.error('Password must contain an Uppercase letter')
    if (!/[a-z]/.test(password)) return toast.error('Password must contain a Lowercase letter')
    if (password.length < 6) return toast.error('Password must be at least 6 characters')

    try {
      const imageURL = await imageUpload(imageFile)
      const result = await createUser(email, password)
       await saveOrUpdateUser({ name, email, image: imageURL })
      await updateUserProfile(name, imageURL)

      toast.success('Signup Successful')
      navigate(from, { replace: true })
      console.log(result)
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
     const {user}= await signInWithGoogle()
      
      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL || null,
        
      })
      toast.success('Signup Successful')
      navigate(from, { replace: true })
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen shadow-green-200 py-30">
      <div className="w-full max-w-xl shadow-green-300 shadow-lg rounded-lg p-6">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold">Register</h1>
          <p className="text-2xl text-green-500 mt-2">Welcome to Loanlink</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">

          {/* Name */}
          <div>
            <label className="block mb-2 text-sm font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="w-full px-4 py-3 rounded-md  border border-gray-300"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          {/* Role */}
          <div>
            <label className="block mb-2 text-sm font-medium">Role</label>
            <select
              className="w-full px-4 py-3 rounded-md border border-gray-300"
              {...register('role', { required: 'Role is required' })}
            >
              <option value="borrower">Borrower</option>
              <option value="manager">Manager</option>
            </select>
            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
          </div>

          {/* Image */}
          <div>
            <label className="block mb-2 text-sm font-medium">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full py-3  border border-dashed border-green-400 rounded cursor-pointer"
              {...register('image')}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium">Email Address</label>
            <input
              type="email"
              placeholder="Enter Your Email"
              className="w-full px-4 py-3 rounded-md  border border-gray-300"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="******"
              className="w-full px-4 py-3 rounded-md bg-gray-200 border border-gray-300"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button type="submit" className="w-full bg-green-500 hover:scale-105 text-white py-3 rounded-md text-lg">
            {loading ? <CgSpinnerTwoAlt className="animate-spin m-auto" /> : 'Continue'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="px-3 text-sm text-gray-400">Register with social accounts</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google Sign In */}
        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center hover:scale-105 items-center gap-3 border border-gray-300 py-3 rounded-md cursor-pointer"
        >
          <FcGoogle size={30} />
          <p className="text-gray-700 font-medium">Continue with Google</p>
        </div>

        {/* Bottom Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-green-600 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Register
