import { useForm, Head, Link } from '@inertiajs/react';
import { useState } from 'react';

function NewSubmission({ errors }) {
  const { data, setData, post, processing, progress, recentlySuccessful, reset } = useForm({
    submission: {
      photos: [],
      submitted_common_name: '',
      notes: '',
      location: '',
    }
  });
  const [previews, setPreviews] = useState([]); 

  function handleSubmit(e) {
    e.preventDefault();
    post('/submissions', {
      forceFormData: true,
      onSuccess: () => {
        reset();
        setPreviews([]);
      },
    });
  }

  function handleFileChange(e) {
    const files = Array.from(e.target.files).slice(0, 5);
    setData('submission.photos', files);
    setPreviews(files.map(file => URL.createObjectURL(file)));
  }

  return (
    <>
      <Head title="Submit Bird Photo" />
      <div className="container mt-5">
        <h1 className="title">Submit a Bird Photo</h1>

        {recentlySuccessful && (
          <div className="notification is-success">
            Submission successful! It is now awaiting review.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label" htmlFor="photos">Photos (up to 5)</label>
            <div className="control">
              <input
                className="input"
                type="file"
                id="photos"
                multiple
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/jpg"
              />
            </div>
            {errors?.['submission.photos'] && <p className="help is-danger">{errors['submission.photos']}</p>}
            {errors?.photos && !errors['submission.photos'] && <p className="help is-danger">{errors.photos}</p>}

            <div className="is-flex is-flex-wrap-wrap">
              {previews.map((src, index) => (
                <figure className="image is-128x128 mt-2 mr-2" key={data.submission.photos[index]?.name || index}>
                  <img src={src} alt={`Preview ${index + 1}`} />
                </figure>
              ))}
            </div>

            {progress && (
              <progress className="progress is-primary mt-2" value={progress.percentage} max="100">
                {progress.percentage}%
              </progress>
            )}
          </div>

          <div className="field">
            <label className="label" htmlFor="submitted_common_name">Common Name (if known)</label>
            <div className="control">
              <input
                className="input"
                type="text"
                id="submitted_common_name"
                value={data.submission.submitted_common_name}
                onChange={(e) => setData('submission.submitted_common_name', e.target.value)}
              />
            </div>
            {errors?.['submission.submitted_common_name'] && <p className="help is-danger">{errors['submission.submitted_common_name']}</p>}
          </div>

          <div className="field">
            <label className="label" htmlFor="location">Location (e.g., City, Park)</label>
            <div className="control">
              <input
                className="input"
                type="text"
                id="location"
                value={data.submission.location}
                onChange={(e) => setData('submission.location', e.target.value)}
              />
            </div>
            {errors?.['submission.location'] && <p className="help is-danger">{errors['submission.location']}</p>}
          </div>

          <div className="field">
            <label className="label" htmlFor="notes">Notes</label>
            <div className="control">
              <textarea
                className="textarea"
                id="notes"
                value={data.submission.notes}
                onChange={(e) => setData('submission.notes', e.target.value)}
              />
            </div>
            {errors?.['submission.notes'] && <p className="help is-danger">{errors['submission.notes']}</p>}
          </div>

          <div className="field is-grouped mt-5">
            <div className="control">
              <button className="button is-link " type="submit" disabled={processing}>
                {processing ? 'Submitting...' : 'Submit Photos'}
              </button>
            </div>
            <div className="control">
              <Link href="/submissions" className="button is-light">Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewSubmission;