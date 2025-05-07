import Profile from '../User/Profile'

function Submissions() {
  return (
    <div>
      <h1>This is the Submissions page.</h1>
    </div>
  );
}

export default Submissions;

Submissions.layout = page => <Profile>{page}</Profile>
