import React, {useState} from 'react';

function ReviewForm() {
  const RATING_TITLES = [
    'perfect',
    'good',
    'not bad',
    'badly',
    'terribly',
  ];
  const [data, setData] = useState({
    rating: 0,
    review: '',
  });

  const handleFieldChange = (evt) => {
    const {name, value} = evt.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATING_TITLES.map((el, i) => (
          <React.Fragment key={RATING_TITLES[i]}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              defaultValue={RATING_TITLES.length - i}
              id={`${RATING_TITLES.length - i}-stars`}
              type="radio"
              onChange={handleFieldChange}
            />
            <label htmlFor={`${RATING_TITLES.length - i}-stars`} className="reviews__rating-label form__rating-label" title={el}>
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        maxLength="50"
        placeholder="Tell how was your stay, what you like and what can be improved" defaultValue={''}
        onChange={handleFieldChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
