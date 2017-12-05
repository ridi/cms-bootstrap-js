# Ridibooks CMS Bootstrap - Node.js

[![Greenkeeper badge](https://badges.greenkeeper.io/ridi/cms-bootstrap-js.svg)](https://greenkeeper.io/)

## Setup

- Add host `127.0.0.1 admin.dev.ridi.com`
- `make build`
- Open a new console and run CMS server on Docker
  - `make cms-up`
- In the previouse console, migrate the sample DB.
  - `make migrate-samples`
- Run the example: `npm run server`
- `open http://admin.dev.ridi.com/example/home`
