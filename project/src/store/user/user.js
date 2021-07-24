import {AuthorizationStatus} from '../../const';
import {createReducer} from '@reduxjs/toolkit';
import {requireAuthorization, signOut, setUser} from '../action';

const initialState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  user: null,
};

export const user = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(signOut, (state) => {
      state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      state.user = null;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    });
});
