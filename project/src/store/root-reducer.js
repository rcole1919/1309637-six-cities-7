import {combineReducers} from 'redux';
import {main} from './main/main';
import {user} from './user/user';
import {room} from './room/room';
import {favorite} from './favorite/favorite';

export const NameSpace = {
  MAIN: 'MAIN',
  USER: 'USER',
  ROOM: 'ROOM',
  FAVORITE: 'FAVORITE',
};

export default combineReducers({
  [NameSpace.MAIN]: main,
  [NameSpace.USER]: user,
  [NameSpace.ROOM]: room,
  [NameSpace.FAVORITE]: favorite,
});
