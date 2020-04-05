This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts.

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
POST http://<domain>/api/players/login
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
POST http://<domain>/api/players/register
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

#In Game API 

-Get user details

Add Bearer token to header
```
GET http://<domain>/api/players/me/details

token is pass through the redirection of game.

Sample response

https://game.kenoblast.com?token=${token}

const config = {
    headers: { Authorization: `Bearer ${token}` }
};
Axios.get('http://<domain>/api/players/me/details',config)
    .then(console.log).catch(console.log);
```


-BET API

Add Bearer token to header
```
GET http://<domain>/api/bet

token is pass through the redirection of game.

Sample response

let data = {
    "ballSelected": [
        1,
        2,
        3,
        4,
        80
    ],
    "betAmount": 1,
    "id": <playerID>
}

const config = {
    headers: { Authorization: `Bearer ${token}` }
};
Axios.post('http://<domain>/api/bet',data,config)
    .then(console.log).catch(console.log);


