import { Link } from '@inertiajs/react'
import Header from "../components/Header"

function Profile({children}){
  return (
    <>
      <Header />
      <div className="columns pl-3 mt-3">
        <div className="column is-one-fifth">
          <aside className="menu">
            <p className="menu-label">General</p>
            <ul className="menu-list">
              <li><Link href="/profile/seen-birds">Seen Birds</Link></li>
              <li><Link href="/profile/wishlist">Wishlist</Link></li>
            </ul>
            <p className="menu-label">Administration</p>
            <ul className="menu-list">
              <li><Link href="/profile/email-settings">Email Settings</Link></li>
              <li><Link href="/profile/authentication">Authentication</Link></li>
            </ul>
            <p className="menu-label">Flock Settings</p>
            <ul className="menu-list">
              <li><Link href="/profile/submissions">Submissions</Link></li>
            </ul>
          </aside>
        </div>
        <div className="column">
          {children}
        </div>
      </div>
    </>
  )
}

export default Profile