## Setup
```
git clone https://github.com/poniraq/express-typescript-setup.git

cd express-typescript-setup
npm install
```

## Init

Check *src/config/database.js* for db [configuration](http://docs.sequelizejs.com/manual/installation/getting-started.html#setting-up-a-connection)

This example is configured to run with postgres. Follow the [instructions](http://docs.sequelizejs.com/manual/installation/getting-started.html#setting-up-a-connection) in Sequelize docs to configure the project for a different database.

after db is setup, migrate with `npm run migrate:up`

## Start
```
npm run build
NODE_PATH=dist npm start
```