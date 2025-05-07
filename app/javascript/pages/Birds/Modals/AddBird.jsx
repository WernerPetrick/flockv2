import { useForm } from '@inertiajs/react'

function AddBird({ closeModal }) {
  const { data, setData, post } = useForm({
    bird: {
      common_name: '',
      scientific_name: '',
      description: '',
      habitat: '',
      size: '',
      image: null,
    }
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setData(name, files ? files[0] : value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/birds', {
      onSuccess: () => closeModal(),
      onError: (errors) => {
        console.error("Error submitting form:", errors);
      },
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
          <p className="modal-card-title">Add New Bird</p>
          <button className="delete" aria-label="close" onClick={closeModal}type='button'/>
        </header>
        <section className="modal-card-body">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label" htmlFor="common_name">Common Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  id="common_name"
                  name="common_name"
                  value={data.common_name}
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
                  value={data.scientific_name}
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
                  value={data.description}
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
                  value={data.habitat}
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
                  value={data.size}
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
          <button className="button is-success" type="submit" onClick={handleSubmit}>Save bird</button>
          <button className="button" type="button" onClick={closeModal}>Cancel</button>
        </footer>
      </div>
    </div>
  );
}

export default AddBird;