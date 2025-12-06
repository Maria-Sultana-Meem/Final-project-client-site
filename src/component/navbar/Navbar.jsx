import { AiOutlineMenu } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router'
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

  const handleLogout = async () => {
    try {
      await logOut()
      toast.success('Logout Successful')
    } catch (err) {
      toast.error('Logout Failed')
      console.log(err)
    }
  }

 
  const activeClass = "text-white border-b-2 border-white font-semibold"
  const normalClass = "hover:text-blue-200 dark:hover:text-blue-300 font-semibold"

  return (
    <nav className="fixed w-full bg-green-600 z-10 shadow-sm transition-colors duration-300">
      <div className="w-10/12 mx-auto flex justify-between items-center py-4">

        {/* Logo */}
        <NavLink to="/" className='flex items-center'>
          <img src={logoImg} alt="loanlink" className='w-16 rounded-full'/>
          <h1 className="text-3xl font-bold ml-2">Loanlink</h1>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? activeClass : normalClass}
          >
            Home
          </NavLink>
          <NavLink
            to="/all-loans"
            className={({ isActive }) => isActive ? activeClass : normalClass}
          >
            All Loans
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => isActive ? activeClass : normalClass}
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => isActive ? activeClass : normalClass}
          >
            Contact
          </NavLink>

          {!user ? (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) => isActive ? activeClass : normalClass}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) => isActive ? activeClass : normalClass}
              >
                Register
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => isActive ? activeClass : normalClass}
              >
                Dashboard
              </NavLink>
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
            <AiOutlineMenu className="text-white dark:text-white" size={20} />
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
              <NavLink
                to="/"
                className={({ isActive }) => isActive ? activeClass + ' block px-4 py-3' : normalClass + ' block px-4 py-3'}
              >
                Home
              </NavLink>
              <NavLink
                to="/all-loans"
                className={({ isActive }) => isActive ? activeClass + ' block px-4 py-3' : normalClass + ' block px-4 py-3'}
              >
                All Loans
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) => isActive ? activeClass + ' block px-4 py-3' : normalClass + ' block px-4 py-3'}
              >
                About Us
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) => isActive ? activeClass + ' block px-4 py-3' : normalClass + ' block px-4 py-3'}
              >
                Contact
              </NavLink>

              {!user ? (
                <>
                  <NavLink
                    to="/login"
                    className={({ isActive }) => isActive ? activeClass + ' block px-4 py-3' : normalClass + ' block px-4 py-3'}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className={({ isActive }) => isActive ? activeClass + ' block px-4 py-3' : normalClass + ' block px-4 py-3'}
                  >
                    Register
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) => isActive ? activeClass + ' block px-4 py-3' : normalClass + ' block px-4 py-3'}
                  >
                    Dashboard
                  </NavLink>
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
