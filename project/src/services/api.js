import axios from 'axios';

const BACKEND_URL = 'https://7.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

const HttpCode = {
  SERVER_ERROR: 500,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
};

export const createAPI = (onUnauthorized, onNotFound, onServerError) => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    const {response} = err;

    if (response.status === HttpCode.UNAUTHORIZED) {
      onUnauthorized();
    }

    if (response.status === HttpCode.NOT_FOUND) {
      onNotFound();
    }

    if (response.status === HttpCode.SERVER_ERROR) {
      onServerError();
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);
  api.interceptors.request.use((config) => {
    config.headers['x-token'] = localStorage.getItem('token') ?? '';
    return config;
  });

  return api;
};

export const adaptOfferToClient = (offer) => {
  const adaptedOffer = Object.assign(
    {},
    offer,
    {
      bedrooms: offer.bedrooms,
      city: {
        location: {
          latitude: offer.city.location.latitude,
          longitude: offer.city.location.longitude,
          zoom: offer.city.location.zoom,
        },
        name: offer.city.name,
      },
      description: offer.description,
      goods: offer.goods,
      host: {
        avatarUrl: offer.host.avatar_url,
        id: offer.host.id,
        isPro: offer.host.is_pro,
        name: offer.host.name,
      },
      id: offer.id,
      images: offer.images,
      isFavorite: offer.is_favorite,
      isPremium: offer.is_premium,
      location: {
        latitude: offer.location.latitude,
        longitude: offer.location.longitude,
        zoom: offer.location.zoom,
      },
      maxAdults: offer.max_adults,
      previewImage: offer.preview_image,
      price: offer.price,
      rating: offer.rating,
      title: offer.title,
      type: offer.type,
    },
  );

  delete adaptedOffer.is_favorite;
  delete adaptedOffer.is_premium;
  delete adaptedOffer.max_adults;
  delete adaptedOffer.preview_image;

  return adaptedOffer;
};

export const adaptUserToClient = (user) => {
  const adaptedUser = Object.assign(
    {},
    user,
    {
      avatarUrl: user.avatar_url,
      email: user.email,
      id: user.id,
      isPro: user.is_pro,
      name: user.name,
    },
  );

  delete adaptedUser.avatar_url;
  delete adaptedUser.is_pro;

  return adaptedUser;
};

export const adaptReviewToClient = (review) => {
  const adaptedReview = Object.assign(
    {},
    review,
    {
      comment: review.comment,
      id: review.id,
      rating: review.rating,
      date: review.date,
      user: {
        avatarUrl: review.user.avatar_url,
        id: review.user.id,
        isPro: review.user.is_pro,
        name: review.user.name,
      },
    },
  );

  return adaptedReview;
};
