
export const LocationApi = {
  geocoder: {
    mock:true,
    mockUrl:`http://api.map.baidu.com/geocoder/v2/`,
    method: "GET"
  },
  place: {
    mock:true,
    mockUrl:`http://api.map.baidu.com/place/v2/suggestion`,
    method: "GET"
  }
};
