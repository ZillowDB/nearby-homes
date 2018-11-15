# Project Name

> Project description

## Related Projects

  - https://github.com/team-frontend/image-carousel
  - https://github.com/team-frontend/detailed-part
  - https://github.com/team-frontend/mortgage-calculator

## Table of Contents

1. [Usage](#Usage)
2. [Getting Started](#getting-started)
3. [Requirements](#requirements)
4. [Development](#development)
5. [API Endpoints](#api)


## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- MySQL 5.7.23

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```
Create the database `neighborhood` by executing this file from the command line by typing:

```sh
mysql -u root < database/schema.sql 
```

Start the server with:
```sh
npm start
```

Start your application with:
```sh
npm run dev
```

## Running Tests

This project is [Jest](https://mochajs.org) and [Enzyme](https://airbnb.io/enzyme/) based test You can run them by `npm run test:watch`

## API Documentation

##### Public End Points

| Endpoint      | Method        | Description  |
| ------------- |:-------------:| -----:|
| `/nearbyHomes/homes/:home` | GET| Get info of nearby homes of a home |
| `/nearbyHomes/home/:home` | PUT | Update info of a home |
| `/nearbyHomes/homes/:home` | DELETE | Delete info of nearby homes of a home |
| `/homes` | POST | Create info of nearby homes of a home |



