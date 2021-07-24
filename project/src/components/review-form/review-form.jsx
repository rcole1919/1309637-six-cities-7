import React, {useState, useRef} from 'react';
import {MIN_REVIEW_LENGTH, MAX_REVIEW_LENGTH, AuthorizationStatus} from '../../const';
import {connect} from 'react-redux';
import {uploadReview} from '../../store/api-actions';
import PropTypes from 'prop-types';
import {getAuthorizationStatus} from '../../store/user/selectors';
import {getLoadedReviewStatus} from '../../store/room/selectors';

function ReviewForm({id, onUploadReview, isReviewUploaded, authorizationStatus}) {
  const RATING_TITLES = [
    'perfect',
    'good',
    'not bad',
    'badly',
    'terribly',
  ];
  const [state, setState] = useState({
    rating: 0,
    review: '',
    isDisabled: false,
  });

  const reviewRef = useRef();
  const ratingRefs = useRef([]);

  const handleFieldChange = (evt) => {
    const {name, value} = evt.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setState((prevState) => ({
      ...prevState,
      isDisabled: prevState.rating !== 0 && prevState.review.length >= MIN_REVIEW_LENGTH && prevState.review.length <= MAX_REVIEW_LENGTH,
    }));
  };

  const clearForm = () => {
    if (authorizationStatus === AuthorizationStatus.AUTH) {
      reviewRef.current.value = '';
      ratingRefs.current[RATING_TITLES.length - state.rating].checked = false;
      setState({
        ...state,
        review: '',
        rating: 0,
        isDisabled: true,
      });
    }
  };

  const handleSubmitFrom = (evt) => {
    evt.preventDefault();
    onUploadReview(id, {
      comment: state.review,
      rating: state.rating,
    }, clearForm);
  };

  return (
    <form className="reviews__form form" onSubmit={handleSubmitFrom}>
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
              ref={(ref) => ratingRefs.current.push(ref)}
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
        placeholder="Tell how was your stay, what you like and what can be improved" defaultValue={''}
        onChange={handleFieldChange}
        ref={reviewRef}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!state.isDisabled || !isReviewUploaded}>Submit</button>
      </div>
    </form>
  );
}

ReviewForm.propTypes = {
  id: PropTypes.string.isRequired,
  onUploadReview: PropTypes.func.isRequired,
  isReviewUploaded: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  isReviewUploaded: getLoadedReviewStatus(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onUploadReview(id, uploadingReview, clearForm) {
    dispatch(uploadReview(id, uploadingReview, clearForm));
  },
});

export {ReviewForm};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
