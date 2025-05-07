import Header from "./components/Header"
import'./Index.css'
import Flamingo from '../assets/flamingo.png'
import Binoculars from '../assets/binoculars-icon.png'
import Silhouette from '../assets/bird-silhouette.png'
import BirdCollage from '../assets/bird-collage.png'

function Index() {
  return (
    <>
      <Header />
      <section className="section">
        <div className="container">
          <div className="bento-grid">
            <div className="box box1">
              <figure className="image is-4by3">
                <img src={Flamingo} alt="Flamingo in the water Noir-style" />
              </figure>
              <p className="has-text-centered is-size-3">Bird of the week</p>
            </div>
            <div className="box box2">
              <figure className="image is-2by1">
                <img src={Binoculars} alt="Binoculars" />
              </figure>
              <div className="has-text-centered">
                <button className="button is-primary" type="button">Find Birds in your area</button>
              </div>
            </div>
            <div className="box box4">
              <figure className="image is-4by3">
                <img src={Silhouette} alt="Bird Silhouette" />
              </figure>
              <p className="has-text-centered is-size-5">Spotted something special? Share your sighting!</p>
            </div>
            <div className="box box5">
              <h1>FLOCK</h1>
            </div>
            <div className="box box6">
              <div className="columns is-vcentered">
                <div className="column is-narrow">
                  <figure className="image is-512x512">
                    <img src={BirdCollage} alt="Bird Collage" />
                  </figure>
                </div>
                <div className="column">
                  <p className="title is-5">Submit Your Photographs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Index