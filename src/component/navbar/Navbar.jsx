import { AiOutlineMenu } from 'react-icons/ai';
import { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router';
import useAuth from '../../hooks/useAuth';
import logoImg from '../../assets/logo.jpeg';
import { toast } from 'react-hot-toast';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Apply theme
  useEffect(() => {
    const html = document.querySelector('html');
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleTheme = (checked) => setTheme(checked ? 'dark' : 'light');

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success('Logout Successful');
    } catch (err) {
      toast.error('Logout Failed');
      console.log(err);
    }
  };

  const activeClass = "text-white border-b-2 border-white font-semibold";
  const normalClass = "hover:text-blue-200 dark:hover:text-blue-300 font-semibold";

  return (
    <nav className="fixed w-full bg-green-600 z-10 shadow-sm transition-colors duration-300">
      <div className="w-10/12 mx-auto flex justify-between items-center py-4">

        {/* Logo */}
        <NavLink to="/" className='flex items-center'>
          <img src={logoImg} alt="loanlink" className='w-16 rounded-full' />
          <h1 className="text-3xl font-bold ml-2">Loanlink</h1>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {['/', '/all-loans', '/about', '/contact'].map((path, idx) => {
            const labels = ['Home', 'All Loans', 'About Us', 'Contact'];
            return (
              <NavLink
                key={idx}
                to={path}
                className={({ isActive }) => isActive ? activeClass : normalClass}
              >
                {labels[idx]}
              </NavLink>
            );
          })}

          {!user ? (
            <>
              <NavLink to="/login" className={({ isActive }) => isActive ? activeClass : normalClass}>Login</NavLink>
              <NavLink to="/register" className={({ isActive }) => isActive ? activeClass : normalClass}>Register</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? activeClass : normalClass}>Dashboard</NavLink>
              <img src={user.photoURL || ''} alt="profile" className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
              <button onClick={handleLogout} className="hover:text-red-500 dark:hover:text-red-400 font-semibold">Logout</button>
            </>
          )}

          
          <label className="flex items-center gap-2 ml-4 cursor-pointer">
            
            <input type="checkbox" checked={theme === 'dark'} onChange={e => handleTheme(e.target.checked)} className="toggle" />
          </label>
        </div>

        
        <div className="md:hidden relative" ref={menuRef}>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 p-2 border border-neutral-200 dark:border-gray-700 rounded-full cursor-pointer"
          >
            <AiOutlineMenu className=" dark:text-black" size={20} />
            {user && (
              <img src={user.photoURL || null} alt="profile" className="w-8 h-8 rounded-full object-cover" referrerPolicy="no-referrer" />
            )}
          </div>

          {isOpen && (
            <div className="absolute right-0 top-12 w-56 bg-green-400 dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden text-sm transition-colors duration-300 z-50">
              {/* Links */}
              {['/', '/all-loans', '/about', '/contact'].map((path, idx) => {
                const labels = ['Home', 'All Loans', 'About Us', 'Contact'];
                return (
                  <NavLink
                    key={idx}
                    to={path}
                    className={({ isActive }) =>
                      (isActive ? activeClass : normalClass) + ' block px-4 py-3 text-black dark:text-white'
                    }
                  >
                    {labels[idx]}
                  </NavLink>
                );
              })}

              {!user ? (
                <>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      (isActive ? activeClass : normalClass) + ' block px-4 py-3 text-black dark:text-white'
                    }
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      (isActive ? activeClass : normalClass) + ' block px-4 py-3 text-black dark:text-white'
                    }
                  >
                    Register
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      (isActive ? activeClass : normalClass) + ' block px-4 py-3 text-black dark:text-white'
                    }
                  >
                    Dashboard
                  </NavLink>
                  <div
                    onClick={handleLogout}
                    className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold cursor-pointer text-black dark:text-white"
                  >
                    Logout
                  </div>
                </>
              )}

           
              <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 mt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={theme === 'dark'}
                    onChange={(e) => handleTheme(e.target.checked)}
                    className="toggle"
                  />
                 
                </label>
              </div>

            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
