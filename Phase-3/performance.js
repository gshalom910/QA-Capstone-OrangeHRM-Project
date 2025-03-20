import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  cloud: {
    // Project: QA Capstone Project
    projectID: 3753013,
    name: "Test (07/03/2025-23:22:56)",
  },
  scenarios: {
    ramping_load: {
      executor: "ramping-arrival-rate",
      startRate: 10,
      timeUnit: "1s",
      preAllocatedVUs: 20,
      maxVUs: 100,
      stages: [
        { target: 50, duration: "1s" },
        { target: 50, duration: "2s" },
        { target: 20, duration: "2s" },
      ],
    },
  },
  thresholds: {
    http_req_duration: ["p(95)<8000"], // 95% of requests < 8s
    http_req_duration: ["avg<2000"], // Average response time < 200s
    http_req_failed: ["rate<0.01"], // Error rate < 1%
    http_reqs: ["rate>10"], // througput req per sec
  },
};

const BASE_URL =
  "https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate";

const users = JSON.parse(open("./login.json"));

export default function () {
  const user = users[Math.floor(Math.random() * users.length)];

  let payload = JSON.stringify({
    username: user.username,
    password: user.password,
  });

  let params = {
    headers: { "Content-Type": "application/json" },
  };

  let res = http.post(BASE_URL, payload, params);

  check(res, {
    "Login successful (200)": (r) => r.status === 200,
    "Response time < 8000s": (r) => r.timings.duration < 8000,
  });

  sleep(1);
}
