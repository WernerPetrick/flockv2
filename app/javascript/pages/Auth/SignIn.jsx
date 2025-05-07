import { useForm } from '@inertiajs/react'
import { Link } from '@inertiajs/react'
import Header from '../components/Header'

function SignIn() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/sign_in', {
      session: {
        email: data.email,
        password: data.password,
      },
      remember: data.remember,
    });
  };

  return (
    <>
      <Header/>
      <section className="section is-flex is-justify-content-center is-align-items-center" style={{ minHeight: '80vh' }}>
        <div className="box" style={{ maxWidth: '400px', width: '100%' }}>
          <h1 className="title has-text-centered">Sign In</h1>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label" htmlFor='email'>Email</label>
              <div className="control">
                <input
                  id="email"
                  className={`input ${errors.email ? 'is-danger' : ''}`}
                  type="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  required
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && <p className="help is-danger">{errors.email}</p>}
            </div>

            <div className="field">
              <label className="label" htmlFor='password'>Password</label>
              <div className="control">
                <input
                  id="password"
                  className={`input ${errors.password ? 'is-danger' : ''}`}
                  type="password"
                  value={data.emailpassword}
                  onChange={(e) => setData('password', e.target.value)}
                  required
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="help is-danger">{errors.password}</p>}
            </div>

            <div className="">
              <label className="">
                <input 
                  type="checkbox" 
                  className=""
                  checked={data.remember}
                  onChange={(e) => setData('remember', e.target.checked)}
                />
                <span className="">Remember me</span>
              </label>
              <Link href="/passwords/new" className="text-sm text-indigo-600 hover:text-indigo-500"> Forgot password?</Link>
            </div>

            <div className="field mt-5">
              <div className="control">
                <button type="submit" className={`button is-success is-fullwidth ${processing ? 'is-loading' : ''}`} disabled={processing}>
                  Sign In
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default SignIn
