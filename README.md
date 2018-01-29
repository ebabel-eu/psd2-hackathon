# psd2-hackathon
This Node.js API provides data to help developers innovate with loans. Suggestions on ideas to dig: Payment Services Directive II (PSD II or PSD 2), point of sale integration, and any related topic.

## Install

### Node.js dependencies
```
npm install
```

### PostgreSQL database
One of the methods of installing PostgreSQL in Ubuntu is to use the Ubuntu Software application.

For a [first time installation](POSTGRESQL) of PostgreSQL on your Ubuntu machine, see further instructions.

## Environment variables
For this API to work, it needs environment variables to be set server-side. These values are kept server-side and not sent to any client. Each server has its own values based on the PostgreSQL installation made on that particular server.

Note the typical port for PostgreSQL is 5432.

```
export POSTGRES_USERNAME=[your PostgreSQL username gets saved in your environment variables here]
export POSTGRES_PASSWORD=[set the password of that user here and it stays server-side]
export POSTGRES_PORT=[set the port of your PostgreSQL server, made available on localhost on your server]
```

The API also needs to have a specific port setup, which typically is port 80 to publish the API to the world.

```
export PORT=80
```

## Run for development
```
npm run debug
```

In development, API available on http://localhost:3000 by default.

## Run for production
```
npm start
```

Note: on most PostgreSQL installations, the default POSTGRES_PORT environment variable should be set to 5432.

## Starting point
To see more endpoints, start with a `GET` request on `/api/v1`

## Signup to the API by registering your new app
You need to create your own app, which will give you access to your own set of default, generated data. You can then work with that data without affecting other apps as long as you keep using your appID.

### POST /api/v1/apps
Create a new app. Response will return if this was successful and what the appID is. New apps are enabled by default.

## Database design
`apps` table
- id (primary key)
- name
- author
- contact
- enabled
- created

`banks` table
- id (primary key)
- name
- enabled

`customers` table
-	id (primary key)
-	name
- bankid (for Banks table, id column)
-	psd2share (Boolean to indicate willingness to participate in PSD II)

`loans` table
-	id (primary key)
-	customerid (for Customers table, id column)
-	balance

`transactions` table
-	id (primary key)
-	loanid (for Loans table, id column)
-	timestamp
-	amount (can be negative or positive)
