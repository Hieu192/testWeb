import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 100 }, // Tăng lên 100 user trong 30s
    { duration: '1m', target: 100 },  // Giữ mức tải 100 user trong 1 phút
    { duration: '30s', target: 0 },   // Giảm dần về 0 user
  ],
};

export default function () {
  http.get('http://host.docker.internal:3000/api/v1/sheet/101'); // Thay bằng API của bạn
  sleep(1);
}
