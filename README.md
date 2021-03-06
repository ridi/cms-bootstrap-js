# Ridibooks CMS Bootstrap - Node.js

A node.js example project for CMS-SDK.

This example uses docker images provided by [cms-docker-compose](https://github.com/ridi/cms-docker-compose). Learn more details about the docker images in the link.

## Requirements

- composer
- docker

## Setup

1. `make install`
1. `make cms-up` will start docker containers.
1. Wait for several seconds until the conainers startup.
1. `make cms-db` for sample db migration. If it fails, try again in a few seconds.
1. `npm start` will run the sample code.
1. `make cms-down` for shutting down the containers.

## APIs

See [here](https://github.com/ridi/cms-sdk/tree/2.x/lib/thrift-idl) for all available APIs.
