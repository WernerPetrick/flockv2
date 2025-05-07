import { Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Header from "../components/Header";
import EditBird from './Modals/EditBird';

function Show({ bird, edit_mode = false }) {
  const [isModalOpen, setIsModalOpen] = useState(edit_mode);
  
  useEffect(() => {
    if (edit_mode) {
      setIsModalOpen(true);
    }
  }, [edit_mode]);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this bird?')) {
      router.delete(`/birds/${bird.id}`, {
        onSuccess: () => {
          alert('Bird was successfully deleted');
          window.location.href = '/birds';
        },
        onError: () => {
          alert('There was an error deleting the bird.');
        }
      });
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <Link href="/birds" className="button is-link mb-4">Back to Birds</Link>
        <h1 className="title">{bird.common_name}</h1>
        {bird.image_url && <img src={bird.image_url} alt={bird.common_name} />}
        <p><strong>Scientific Name:</strong> {bird.scientific_name}</p>
        <p><strong>Description:</strong> {bird.description}</p>
        <p><strong>Habitat:</strong> {bird.habitat}</p>
        <p><strong>Size:</strong> {bird.size}</p>
      </div>
      <div className="buttons is-flex is-justify-content-center mt-5 mb-5">
        <button className="button is-warning" onClick={openModal} type='button'>Edit</button>
        <button onClick={handleDelete} className="button is-danger" type='button'>Delete</button>
      </div>
      {isModalOpen && <EditBird bird={bird} closeModal={closeModal} />} 
    </>
  );
}

export default Show;