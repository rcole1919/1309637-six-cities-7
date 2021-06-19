import React from 'react';
import {Reviews} from '../../prop-types';
import Review from '../review/review';

function ReviewList({reviews}) {
  return (
    <>
      <h2 className="reviews__title">Reviews · <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {
          reviews.map((review, i) => (
            <Review key={review.id} review={review} />
          ))
        }
      </ul>
    </>
  );
}

ReviewList.propTypes = {
  reviews: Reviews,
};

export default ReviewList;
