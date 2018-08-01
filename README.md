## Setup
```
git clone https://github.com/poniraq/express-typescript-setup.git

cd express-typescript-setup
npm install
```

## Configure

Check *src/config/database.js* for db [configuration](http://docs.sequelizejs.com/manual/installation/getting-started.html#setting-up-a-connection)

This example is configured to run with postgres. Follow the [instructions](http://docs.sequelizejs.com/manual/installation/getting-started.html#setting-up-a-connection) in Sequelize docs to configure the project for a different database.

## Setup DB
```
npx sequelize db:create
npm run migrate:up
```

## Start
```
npm run build
npm start
```

## Postman
There is a postman collection "Protect.postman_collection.json" in the project directory.
It should be provided with an environment to function properly.