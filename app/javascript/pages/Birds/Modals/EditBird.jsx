import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

function EditBird({ bird, closeModal }) {
  const { data, setData, put, processing, wasSuccessful, reset } = useForm({
    bird: {
      common_name: bird.common_name,
      scientific_name: bird.scientific_name,
      description: bird.description,
      habitat: bird.habitat,
      size: bird.size,
      image: null
    }
  });

  useEffect(() => {
    if (wasSuccessful) {
      closeModal();
    }
  }, [wasSuccessful, closeModal]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (files) {
      setData(`bird.${name}`, files[0]);
    } else {
      setData(`bird.${name}`, value || '');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();    
    put(`/birds/${bird.id}`, data, {
      preserveScroll: true,
      forceFormData: true,
    });
  };

  return (
    <div className="modal is-active">
      <div
        className="modal-background"
        onClick={closeModal}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            closeModal();
          }
        }}
        role="button"
        tabIndex="0"
      />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Edit Bird</p>
          <button className="delete" aria-label="close" onClick={closeModal} type='button'/>
        </header>
        <section className="modal-card-body">
          <form onSubmit={handleSubmit}>
            {/* Form fields remain the same */}
            <div className="field">
              <label className="label" htmlFor="common_name">Common Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  id="common_name"
                  name="common_name"
                  value={data.bird.common_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="field">
              <label className="label" htmlFor="scientific_name">Scientific Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  id="scientific_name"
                  name="scientific_name"
                  value={data.bird.scientific_name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="description">Description</label>
              <div className="control">
                <textarea
                  className="textarea"
                  id="description"
                  name="description"
                  value={data.bird.description}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="habitat">Habitat</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  id="habitat"
                  name="habitat"
                  value={data.bird.habitat}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="size">Size</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  id="size"
                  name="size"
                  value={data.bird.size}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="image">Image</label>
              <div className="control">
                <input
                  className="input"
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </section>
        <footer className="modal-card-foot">
          <button 
            className="button is-success" 
            type="submit" 
            onClick={handleSubmit}
            disabled={processing}
          >
            {processing ? 'Saving...' : 'Save changes'}
          </button>
          <button className="button" type="button" onClick={closeModal}>Cancel</button>
        </footer>
      </div>
    </div>
  );
}

export default EditBird;