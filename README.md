This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the development:

Run Server:

### `npm run server` / `yarn server`

Open [http://localhost:5000](http://localhost:5000) to view if its running.

Run Client:

### `npm run dev` / `yarn dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


API endponts for game (since this is still on development), we may improve our approache
```
http://<domain>/api/players/login
```
```
PARAMS
{
	"player" : {
		"email" : <clientemail>, (String)
		"password": <clientpass> (String)
	}
}
```

```
http://<domain>/api/players/register
```

```
PARAMS
{
	"player" : {
		"name": {
            "firstName": <client firstname>, (String)
            "middleName": <client middlename>, (String),
            "lastName":  <client lastname>, (String),
        },
        "address": {
            "street":  <client street>, (String),
            "unitNo": <client unitNo>, (String),
            "city": <client city>, (String),
            "province": <client province>, (String),
            "country": <client country>, (String),
            "postalCode": <client postalCode>, (String)
        },
        "password": <client password>, (String),
        "balance": <client balance>, (Number),
        "currency": <client balance>, (String default to USD for now),
        "email": <client currency>, (String),
        "username": <client username>, (String),
        "phone": <client phone>, (String),
        "affiliate": <client affiliate>, (ID),
	}
}
```



