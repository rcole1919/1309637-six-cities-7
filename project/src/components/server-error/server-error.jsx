import React from 'react';
import Header from '../header/header';
import './server-error.css';

function ServerError() {
  return (
    <div className="page page--server-error">
      <Header />
      <main className="page__main page__main--server-error">
        <div className="server-error__img-wrapper">
          <h1>500!!!! Server exploded</h1>
          <img width={760} height={400} src="https://i.imgur.com/CQ7wEIB.jpg" alt="Server Error" />
        </div>
      </main>
    </div>
  );
}

export default ServerError;
