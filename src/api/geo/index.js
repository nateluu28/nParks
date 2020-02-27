import { getDistance } from "geolib";

export const sortObjectsByLatLong = ({
  field,
  objects,
  lat: referenceLat,
  long: referenceLong
}) => {
  return objects.sort((a, b) => {
    if (!a[field]) {
      return 1;
    }

    if (!b[field]) {
      return -1;
    }

    const { lat: a_lat, long: a_long } = a[field];
    const { lat: b_lat, long: b_long } = b[field];

    if (!a_lat || !a_long) {
      return 1;
    }

    if (!b_lat || !b_long) {
      return -1;
    }

    const a_dist = getDistance(
      { latitude: referenceLat, longitude: referenceLong },
      { latitude: a_lat, longitude: a_long }
    );

    const b_dist = getDistance(
      { latitude: referenceLat, longitude: referenceLong },
      { latitude: b_lat, longitude: b_long }
    );

    return a_dist - b_dist;
  });
};
