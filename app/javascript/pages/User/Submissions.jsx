import NewSubmission from '../Submissions/New';
import ShowSubmissions from '../Submissions/Show';
import Profile from '../User/Profile'

function Submissions() {
  return (
    <div>
      <NewSubmission/>
      <hr />
      <ShowSubmissions/>
    </div>
  );
}

export default Submissions;

Submissions.layout = page => <Profile>{page}</Profile>
