import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  cloud: {
    // Project: QA Capstone Project
    projectID: 3753013,
    name: "Test (09/03/2025-02:35:21)",
  },
  scenarios: {
    constant_rate_test: {
      executor: "constant-arrival-rate",
      rate: 50,
      timeUnit: "1s",
      duration: "5s",
      preAllocatedVUs: 5,
      maxVUs: 100,
    },
  },
  thresholds: {
    http_req_duration: ["p(95)<8000"], // 95% of requests < 8s
    http_req_duration: ["avg<3000"], // Average response time < 2s
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
