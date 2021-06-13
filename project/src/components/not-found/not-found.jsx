import React from 'react';
import Header from '../header/header';
import './not-found.css';

function NotFound() {
  return (
    <div className="page page--not-found">
      <Header />
      <main className="page__main page__main--not-found">
        <div className="not-found__img-wrapper">
          <img width={760} height={400} src="https://cdn.searchenginejournal.com/wp-content/uploads/2020/08/404-pages-sej-5f3ee7ff4966b-760x400.png" alt="Page not found" />
        </div>
      </main>
    </div>
  );
}

export default NotFound;
