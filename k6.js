import http from 'k6/http';
import { check, sleep } from "k6";

export const options = {
  vus: 100,
  duration: '10s',
};

function() => {
  const random = Math.floor(Math.random() * (10000000 - 9000000) + 9000000);
  http.get(`http://localhost:3003/homes/${random}/nearbyHomes`);
}

const random = Math.floor(Math.random() * (10000000 - 9000000) + 9000000);

export default() => {
  const res = http.get(`http://localhost:3003/homes/500/nearbyHomes`);
  check(res, {
    'status was 200': r => r.status === 200,
    'transaction time OK': r => r.timings.duration < 200,
  });
  sleep(1);
};
