import types from "../../types";
import coordtransform from 'coordtransform';

const initialState = {
  address: {
    location: {
      lat: 0,
      lng: 0
    }
  },
  placeList: []
};


const transform = (latitude = 0, longitude = 0) => {
  let gcj02 = coordtransform.bd09togcj02(longitude, latitude);
  return {
    lng: gcj02[0],
    lat: gcj02[1],
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.location.SET_ADDRESS_INFO:
      

      return Object.assign({}, state, {
        address: Object.assign(action.address, {
          gaode_location: transform(action.address.location.lat, action.address.location.lng)
        })
      });
    case types.location.GET_SERCH_PLACE_LIST:
      return Object.assign({}, state, {
        placeList: action.list
      });
    default:
      return state;
  }



};
