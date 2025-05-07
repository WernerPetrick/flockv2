import { useForm } from '@inertiajs/react'
import Header from '../components/Header'

function SignUp() {
  const { data, setData, post, processing, errors } = useForm({
    user: {
      email: '',
      password: ''
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post('/sign_up', data)
  }

  return (
    <>
      <Header/>
      <section className="section is-flex is-justify-content-center is-align-items-center" style={{ minHeight: '80vh' }}>
        <div className="box" style={{ maxWidth: '400px', width: '100%' }}>
          <h1 className="title has-text-centered mb-5">Create an Account</h1>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label" htmlFor='email'>Email</label>
              <div className="control">
                <input
                  id="email"
                  className={`input ${errors.email ? 'is-danger' : ''}`}
                  type="email"
                  value={data.user.email}
                  onChange={(e) => setData('user.email', e.target.value)}
                  required
                  placeholder="tweety@birds.com"
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
                  value={data.user.password}
                  onChange={(e) => setData('user.password', e.target.value)}
                  required
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="help is-danger">{errors.password}</p>}
            </div>

            <div className="field mt-5">
              <div className="control">
                <button type="submit" className={`button is-dark is-fullwidth ${processing ? 'is-loading' : ''}`} disabled={processing}>
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default SignUp
