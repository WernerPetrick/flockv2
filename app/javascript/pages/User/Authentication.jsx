import Profile from '../User/Profile'

function Authentication() {
  return (
    <div>
      <h1>This is the Authentication page.</h1>
    </div>
  );
}

export default Authentication;

Authentication.layout = page => <Profile>{page}</Profile>
