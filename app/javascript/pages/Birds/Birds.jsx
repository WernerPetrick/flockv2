import { useState } from 'react';
import { Link } from '@inertiajs/react'
import Header from "../components/Header";
import AddBird from './Modals/AddBird';

function Birds({birds}){

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Header />
      <div className="buttons has-addons is-right pr-3 mt-5">
        <button className="button is-primary " type="button" onClick={openModal}>Add Bird</button>
      </div>

      <div className="is-flex is-justify-content-center pr-3 mt-5">
        <div className="field is-grouped">
          <p className="control is-expanded">
            <input className="input" type="text" placeholder="Search Birds"/>
          </p>
          <p className="control">
            <button className="button is-info" type='button'>
              Search
            </button>
          </p>
        </div>
      </div>
      {isModalOpen && <AddBird closeModal={closeModal} />} 
      <div className="container is-flex is-justify-content-center mt-5">
        <table className="table is-bordered is-hoverable">
          <thead>
            <tr>
              <th>Image</th>
              <th>Common Name</th>
              <th>Scientific Name</th>
              <th>Description</th>
              <th>Habitat</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            {birds.map((bird) => (
              <tr key={bird.id}>
                <td>
                  {bird.image_url ? (
                    <img src={bird.image_url} alt={bird.common_name} style={{ width: '100px', height: 'auto' }} />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td>
                  <Link href={`/birds/${bird.id}`} className="has-text-link">
                    {bird.common_name}
                  </Link>
                </td>
                <td>{bird.scientific_name}</td>
                <td>{bird.description}</td>
                <td>{bird.habitat}</td>
                <td>{bird.size}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </>
  )
}

export default Birds;