import { useState, useEffect } from 'react'
import { router, Link } from '@inertiajs/react';
import Header from "../components/Header";
import css from './Explore.module.css'

function Explore({ currentBird = null, randomBird = null, previousBird = null, nextBird = null }) {
  const [loading, setLoading] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);
  
  useEffect(() => {
    console.log('Explore component received props:', {
      currentBird: currentBird ? { id: currentBird.id, name: currentBird.common_name } : null,
      randomBird: randomBird ? { id: randomBird.id, name: randomBird.common_name } : null,
      previousBird: previousBird ? { id: previousBird.id, name: previousBird.common_name } : null,
      nextBird: nextBird ? { id: nextBird.id, name: nextBird.common_name } : null
    });
  }, [currentBird, randomBird, previousBird, nextBird]);

  const fetchRandomBird = () => {
    setLoading(true);
    router.visit('/explore?random=true', {
      method: 'get',
      onFinish: () => setLoading(false)
    });
  }

  const fetchNextBird = (id) => {
    setLoading(true);
    router.visit(`/explore/${id}`, {
      method: 'get',
      onFinish: () => setLoading(false)
    });
  }

  const fetchPreviousBird = (id) => {
    setLoading(true);
    router.visit(`/explore/${id}`, {
      method: 'get',
      onFinish: () => setLoading(false)
    });
  }

  const birdToShow = currentBird || randomBird;

  return (
    <>
      <Header />
      <section class="hero is-success mt-2 mr-5">
        <div class="hero-body ">
          <p class="title">Explore Birds</p>
          <p class="subtitle">From backyard favorites to rare finds</p>
        </div>
      </section>

      
      <div className="container is-flex is-flex-direction-column is-align-items-center mt-5">
        <div className="field is-grouped">
          <div className="control">
            <div className={`dropdown ${dropdownActive ? 'is-active' : ''}`}>
              <div className="dropdown-trigger">
                <button
                  className="button"
                  aria-haspopup="true"
                  aria-controls="dropdown-menu"
                  type="button"
                  onClick={() => setDropdownActive(!dropdownActive)}
                >
                  <span>Select Bird Species</span>
                  <span className="icon is-small">
                    <i className="fas fa-angle-down" />
                  </span>
                </button>
              </div>
              <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                  <a href="#" className="dropdown-item"> Bird Species 1 </a>
                  <a href="#" className="dropdown-item"> Bird Species 2 </a>
                  <a href="#" className="dropdown-item is-active"> Bird Species 3 </a>
                  <a href="#" className="dropdown-item"> Bird Species 4 </a>
                </div>
              </div>
            </div>
          </div>

          <div className="control is-flex is-align-items-center">
            <span style={{ padding: '0 0.75rem' }}>or</span>
          </div>

          <div className="control">
            <input className="input" type="text" placeholder="Search Bird" />
          </div>

          <div className="control">
            <button className="button is-info" type="button">
              Search
            </button>
          </div>
        </div>

        <div className="mt-3">
          <button
            className={`button ${loading ? 'is-loading' : ''}`}
            type="button"
            onClick={fetchRandomBird}
            disabled={loading}
          >
            Random Bird
          </button>
        </div>
      </div>

      {birdToShow ? (
        <div className="container mt-5">
          <div className="columns">
            <div className="column">
              <figure className='image'>
                <img src={birdToShow.image_url} alt={birdToShow.common_name} className={`${css.birdimg}`} />
              </figure>
            </div>
            <div className="column box">
              <h4 className='has-text-centered title'>About the <span>{birdToShow.common_name}</span></h4>
              <hr />
              <p>Scientific Name: <span className='is-italic'>{birdToShow.scientific_name}</span></p>
              <p>Species: {birdToShow.species}</p>
              <p>Habitat: {birdToShow.habitat}</p>
              <p>Size: {birdToShow.size}</p>
              <p>{birdToShow.description }</p>
            </div>
          </div>
          <div className="mt-4 is-flex is-justify-content-space-between">
            <button
              className={`button ${previousBird ? '' : 'is-static'} ${loading ? 'is-loading' : ''}`}
              onClick={() => previousBird && fetchPreviousBird(previousBird.id)}
              disabled={!previousBird || loading}
              type='button'
            >
              Previous Bird
            </button>
            <button
              className={`button ${nextBird ? '' : 'is-static'} ${loading ? 'is-loading' : ''}`}
              onClick={() => nextBird && fetchNextBird(nextBird.id)}
              disabled={!nextBird || loading}
              type='button'
            >
              Next Bird
            </button>
          </div>
        </div>
      ) : (
        <div className="container mt-5 has-text-centered">
          <div className="box p-6">
            <p className="is-size-5 mb-4">Click the "Random Bird" button to discover a bird!</p>
            <figure className="image is-128x128 is-inline-block">
              <img src="https://picsum.photos/128/128?grayscale" alt="Placeholder" />
            </figure>
          </div>
        </div>
      )}
    </>
  )
}

export default Explore;