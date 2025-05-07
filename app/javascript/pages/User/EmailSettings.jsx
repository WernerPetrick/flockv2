import Profile from '../User/Profile'

function EmailSettings() {
  return (
    <div>
      <h1>This is the Email Settings page.</h1>
    </div>
  );
}

export default EmailSettings;

EmailSettings.layout = page => <Profile>{page}</Profile>
