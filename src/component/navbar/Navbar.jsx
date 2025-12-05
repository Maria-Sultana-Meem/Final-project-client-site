import { AiOutlineMenu } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import useAuth from '../../hooks/useAuth'
import logoImg from '../../assets/logo.jpeg'
import { toast } from 'react-hot-toast'

const Navbar = () => {
  const { user, logOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

  // Apply theme
  useEffect(() => {
    const html = document.querySelector('html')
    html.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const handleTheme = checked => setTheme(checked ? 'dark' : 'light')

  // Logout with toast
  const handleLogout = async () => {
    try {
      await logOut()
      toast.success('Logout Successful')
    } catch (err) {
      toast.error('Logout Failed')
      console.log(err)
    }
  }

  return (
    <nav className="fixed w-full bg-green-600 z-10 shadow-sm transition-colors duration-300">
      <div className="w-10/12 mx-auto flex justify-between items-center py-4">

        {/* Logo */}
        <Link to="/" className='flex items-center'>
          <img src={logoImg} alt="loanlink" className='w-16 rounded-full'/>
          <h1 className="text-3xl font-bold ml-2">Loanlink</h1>
        </Link>

       
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-blue-500 dark:hover:text-blue-400 font-semibold">Home</Link>
          <Link to="/all-loans" className="hover:text-blue-500 dark:hover:text-blue-400 font-semibold">All-Loans</Link>
          <Link to="/about" className="hover:text-blue-500 dark:hover:text-blue-400 font-semibold">About Us</Link>
              <Link to="/contact" className="hover:text-blue-500 dark:hover:text-blue-400 font-semibold">Contact</Link>
          {!user && (
            <>
              
              <Link to="/login" className="hover:text-blue-500 dark:hover:text-blue-400 font-semibold">Login</Link>
              <Link to="/register" className="hover:text-blue-500 dark:hover:text-blue-400 font-semibold">Register</Link>
            </>
          )}
          {user && (
            <>
              <Link to="/dashboard" className="hover:text-blue-500 dark:hover:text-blue-400 font-semibold">Dashboard</Link>
              <img
                src={user.photoURL || ''}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={handleLogout}
                className="hover:text-red-500 dark:hover:text-red-400 font-semibold"
              >
                Logout
              </button>
            </>
          )}
          {/* Theme toggle */}
          <input
            type="checkbox"
            checked={theme === 'dark'}
            onChange={e => handleTheme(e.target.checked)}
            className="toggle ml-4"
          />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden relative">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 p-2 border border-neutral-200 dark:border-gray-700 rounded-full cursor-pointer"
          >
            <AiOutlineMenu className="text-gray-900 dark:text-white" size={20} />
            {user && (
              <img
                src={user.photoURL || ''}
                alt="profile"
                className="w-8 h-8 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            )}
          </div>

          {isOpen && (
            <div className="absolute right-0 top-12 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden text-sm transition-colors duration-300">
              <Link to="/" className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold">Home</Link>
              <Link to="/all-loans" className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold">All-Loans</Link>
              <Link to="/about" className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold">About Us</Link>
                  <Link to="/contact" className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold">Contact</Link>
              {!user ? (
                <>
                  
                  <Link to="/login" className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold">Login</Link>
                  <Link to="/register" className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold">Register</Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold">Dashboard</Link>
                  <div
                    onClick={handleLogout}
                    className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold cursor-pointer"
                  >
                    Logout
                  </div>
                </>
              )}
              {/* Mobile theme toggle */}
              <div className="px-4 py-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <span className="text-gray-900 dark:text-white font-semibold">Dark Mode</span>
                  <input
                    type="checkbox"
                    checked={theme === 'dark'}
                    onChange={e => handleTheme(e.target.checked)}
                    className="toggle"
                  />
                </label>
              </div>
            </div>
          )}
        </div>

      </div>
    </nav>
  )
}

export default Navbar
