import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const AddSauce = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [link, setLink] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !genre || !link) {
      alert("Please enter valid manga, link, and genre");
      return;
    }

    const lowerCaseGenre = genre.toLowerCase();
    console.log(genre);

    onAdd({ name, lowerCaseGenre, link });

    alert("Manga submitted, thanks for your contribution <3");

    setName("");
    setGenre("");
  };

  return (
    <>
      <hr className='divider'></hr>
      <div className='row justify-content-center'>
        <div className='col-6'>
          <form onSubmit={onSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Name</label>
              <input
                className='form-control form-bar'
                placeholder='Kuzu no honkai'
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <div className='form-text'>Manga name</div>
            </div>
            <div className='mb-3'>
              <label className='form-label'>Genre</label>
              <input
                className='form-control form-bar'
                placeholder='Drama'
                value={genre}
                onChange={(e) => {
                  setGenre(e.target.value);
                }}
              />
              <div className='form-text'>
                Primary genre of the manga (send only one)
              </div>
            </div>
            <div className='mb-3'>
              <label className='form-label'>Link</label>
              <input
                className='form-control form-bar'
                placeholder='https://myanimelist.net/manga/70261/Mushoku_Tensei__Isekai_Ittara_Honki_Dasu'
                value={link}
                onChange={(e) => {
                  setLink(e.target.value);
                }}
              />
              <div className='form-text'>Myanimelist link to the manga</div>
            </div>

            <div className='row'>
              <div className='col-12 col-sm-6'>
                <button
                  type='submit'
                  className='btn w-100 btn-outline-primary white'
                >
                  Submit
                </button>
              </div>
              <div className='col-12 col-sm-6 my-sm-0 my-2'>
                <Link to='/'>
                  <button
                    type='button'
                    className='btn w-100 btn-block btn-outline-danger white'
                  >
                    Back
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddSauce;
