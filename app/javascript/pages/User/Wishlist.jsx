import Profile from '../User/Profile'

function Wishlist() {
  return (
    <div>
      <h1>This is the Wishlist page.</h1>
    </div>
  );
}

export default Wishlist;

Wishlist.layout = page => <Profile>{page}</Profile>
