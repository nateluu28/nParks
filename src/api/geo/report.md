```
const sortObjectsByLatLong = ({
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
```

The Cyclomatic Complexity is 7.

Halstead’s Metrics Are:

| operator | count |
| -------- | ----- |
| return   | 6     |
| ()       | 18    |
| {}       | 26    |
| -        | 1     |
| :        | 14    |
| ,        | 12    |
| ;        | 11    |
| =        | 5     |
| =>       | 2     |
| []       | 8     |
| `||`     | 2     |
| if       | 4     |
| const    | 5     |
| !        | 6     |

n1 = 14
N1 = 120

| operand              | count |
| -------------------- | ----- |
| sortObjectsByLatLong | 1     |
| field                | 5     |
| objects              | 2     |
| lat                  | 13    |
| referenceLat         | 3     |
| long                 | 13    |
| referenceLong        | 3     |
| a                    | 3     |
| b                    | 3     |
| a_lat                | 2     |
| a_long               | 2     |
| b_lat                | 2     |
| b_long               | 2     |
| a_dist               | 2     |
| b_dist               | 2     |
| getDistance          | 2     |
| -1                   | 2     |

n2 = 19
N2 = 38
