import Profile from '../User/Profile'

function SeenBirds() {
  return (
    <div>
      <h1>This is the Seen Birds page.</h1>
    </div>
  );
}

export default SeenBirds;

SeenBirds.layout = page => <Profile>{page}</Profile>
