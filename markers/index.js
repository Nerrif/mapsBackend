const markers = {};
class Markers {
  constructor({
    coordinate: { latitude, longitude },
    description,
    region,
    creator,
    expireAt,
  }) {
    this.coordinate = { latitude, longitude };
    this.description = description;
    this.creator = creator;
    this.region = region;
    this.expireAt = expireAt;
  }
}

const addMarker = (marker) => {
  const { region } = marker;
  if (!markers[region]) {
    markers[region] = [];
  }
  const newMarker = { ...marker, createAt: Date.now() };
  markers[region].push(newMarker);
  console.log(markers[region]);
  return markers[region];
};

const removeOldMarkers = () => {
  const now = Date.now();
  const keys = Object.keys(markers);
  keys.forEach(
    (key) =>
      (markers[key] = markers[key].filter(
        (marker) => now - marker.createAt < 30 * 60 * 1000
      ))
  );
  console.log("Old markers remove");
};

const getAllRegionMarkers = (region) => {
  const data = markers[region];
  if (!data) {
    return [];
  }
  return data;
};
module.exports = { Markers, addMarker, getAllRegionMarkers };
