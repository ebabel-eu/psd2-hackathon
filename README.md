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

## Run for development
```
npm run debug
```

In development, API available on http://localhost:3000 by default.

## Run for production
```
export PORT=80
npm start
```

## Starting point
To see more endpoints, start with a `GET` request on `/api/v1`

## Signup to the API by registering your new app
You need to create your own app, which will give you access to your own set of default, generated data. You can then work with that data without affecting other apps as long as you keep using your appID.

### POST /api/v1/apps
Create a new app. Response will return if this was successful and what the appID is. New apps are enabled by default.

## Database design
Customers table
-	ID (primary key)
-	Name
-	DateOfBirth
-	PsdShare (Boolean to indicate willingness to participate in PSD II)

Loans table
-	ID (primary key)
-	CustomerID (foreign key for Customers table, ID column)
-	Balance

Transactions table
-	ID (primary key)
-	LoanID (foreign key for Loans table, ID column)
-	Date
-	Amount (can be negative or positive)
