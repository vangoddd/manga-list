import * as React from "react";
import { withStyles } from "@material-ui/core";
import { useEffect, useState } from "react";

const SauceDetail = (props) => {
  const mangaId = props.match.params.id;

  const [manga, setManga] = useState();

  useEffect(() => {
    const getDetail = async () => {
      const dataFromServer = await getDetailFromServer(mangaId);
      setManga(dataFromServer);
    };

    getDetail();
  }, []);

  const getDetailFromServer = async (mangaId) => {
    const response = await fetch("/api/detail/" + mangaId);
    const data = await response.json();
    return data;
  };

  const upperCase = (text) => {
    const stringText = text.toString();
    const upText = stringText.charAt(0).toUpperCase() + stringText.slice(1);
    return upText;
  };

  if (!manga) {
    return <></>;
  } else {
    return (
      <>
        <hr className='divider'></hr>
        <div className='row justify-content-center mb-4'>
          <div className='col-6'>
            <div className={props.classes.title}>{manga[0].name}</div>
            <div className={props.classes.genre + " my-1"}>
              {upperCase(manga[0].genre)}
            </div>
            <div>
              <a className='text-white' target='_blank' href={manga[0].link}>
                Myanimelist Link
              </a>
            </div>
          </div>

          <div className='row justify-content-center pt-4'>
            <div className='col-12 col-sm-6'>
              <button
                type='submit'
                className='btn w-100 btn-outline-danger white'
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
};

const styles = (theme) => ({
  padding: {
    padding: "60px",
  },
  title: {
    fontSize: "42px",
  },
  genre: {
    fontSize: "24px",
  },
});

export default withStyles(styles)(SauceDetail);
