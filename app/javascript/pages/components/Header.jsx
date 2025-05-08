import { Link, usePage} from '@inertiajs/react'
import { Inertia } from '@inertiajs/inertia'
import Flock from '../../assets/flock.png'
import css from './Header.module.css'

function Header() {
  const { props } = usePage()
  const currentUser = props.current_user

  const handleSignOut = (e) => {
    e.preventDefault()
    Inertia.delete('/sign_out')
  }

  return (
    <>
      <nav className="navbar" aria-label="main navigation">
        <div className="navbar-brand">
          <Link href="/Index" className="navbar-item">
            <figure className={`${css.logo} image`}>
              <img src={Flock} alt="Flock Text Logo" />
            </figure>
          </Link>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link href="/" className="navbar-item">
              Home
            </Link>

            <Link href="/About" className="navbar-item">
              About
            </Link>

            <Link href="/explore" className="navbar-item">
              Explore Birds
            </Link>

            <Link href="/Knowledge" className="navbar-item">
              Knowledge Center
            </Link>

            {currentUser?.admin && (
            <Link href="/birds" className="navbar-item">
              Manage Birds
            </Link>
          )}
          </div>

          <div className="navbar-end">
            {currentUser ? (
              <>
                <Link href="/profile" className="button mr-4">Profile</Link>
                <button
                  onClick={handleSignOut}
                  className="navbar-item button is-danger is-outlined"
                  type='button'
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <div className='navbar-item'>
                  <Link href="/sign_up" className="button is-dark">Sign Up</Link>
                  <Link href="/sign_in" className="button is-light">Sign In</Link>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
