# TeamForge GraphQl Api Docs

Welcome to the documentation for our GraphQL API. This API allows you to perform various operations related to player, matches, messages... management, including user authentication.

## Authentication
To access protected routes in your GraphQL API, you need to authenticate first. The API supports authentication using JWT tokens.

### Signup
To sign up a new player, you can use the following GraphQL mutation:

```
mutation {
  signup(signUpInput: {
    email: "SaulGoodMannF@gmail.uk",
    username: "JamesBND",
    password: "jessyPinkman12342"
  }){
    accessToken,
    player{
      playerStatistics{
        rate
      }
    }
  }
}
```

The signup mutation takes a signUpInput object, which should contain the new player's email, username, and password. Upon successful signup, the mutation returns a JWT token (accessToken) and the player object, which includes the player's statistics, such as their rating.


### Login
To log in a player, you can use the following GraphQL query:

query {
  login(loginInput: {
    username: "JamesBND",
    password: "jessyPinkman12342"
  }){
    accessToken,
    player{
      username,
      playerStatistics{
        rate
      }
    }
  }
}

The login query takes a loginInput object, which should contain the player's username and password. Upon successful login, the query returns a JWT token (accessToken) and the player object, which includes the player's username and statistics, such as their rating.

## Player Management

### Retrieving Players
To retrieve a list of players, you can use the following GraphQL query:

query {
  players(paginationInput: {skip: 0, take: 10}) {
    id,
    username,
    playerStatistics{
      rate
    }
  }
}

The players query takes a paginationInput object, which specifies how many players to retrieve and where to start. The query returns a list of players, including their ID, username, and rating.

### To retrieve a single player, you can use the following GraphQL query:

query {
  player(id: 267) {
    username,
    playerStatistics{
      rate,
      player{
        username,
        messages{
          message
        }
      }
    }
  }
}

The player query takes a id parameter, which specifies the ID of the player to retrieve. The query returns a single player, including their username, rating, and any associated messages.

### Deleting Players
To delete a player, you can use the following GraphQL mutation:

mutation {
  removePlayer(id: 863) {
    username
  }
}

The removePlayer mutation takes an id parameter, which specifies the ID of the player to delete. Upon successful deletion, the mutation returns the player's username.

## Match Management

### Retrieving Matches
To retrieve a list of matches, you can use the following GraphQL query:

query {
  matches(paginationInput:{skip: 1, take:10}) {
    name,
    location,
    time
  }
}

The matches query takes a paginationInput object, which specifies how many matches to retrieve and where to start. The query returns a list of matches, including their name, location, and time.

### To retrieve a single match, you can use the following GraphQL query:

query {
  match(id: 2) {
    name,
    location,
    id,
    creator{
      username,
      playerStatistics{
        rate,
        player{
          username
        }
      }
    }
  }
}

The match query takes an id parameter, which specifies the ID of the match to retrieve. The query returns a single match, including its name, location, ID, and creator information.

### Searching for Matches
To search for matches based on certain criteria, you can use the following GraphQL query:

query {
  search(searchMatchInput: {
    minDuration: 2,
    maxDuration: 10,
    dateFrom: "2023-06-16T10:12:01.000Z",
    dateTo: "2024-02-16T10:31:00.000Z"
  }) {
    location,
    name,
    id
  }
}

The search query takes a searchMatchInput object, which specifies the criteria to search for matches based on. The query returns a list of matches that match the specified criteria.

### Creating Matches
To create a new match, you can use the following GraphQL mutation:

mutation {
  createMatch(createMatchInput: {
    location: "Central Park",
    name: "Sunday Football Match",
    time: "2023-05-01T14:30:00.000Z",
    playersNumber: 10,
    prize: "$100",
    duration: 2.5,
    creatorId: 267
  }) {
    name
  }
}

The createMatch mutation takes a createMatchInput object, which specifies the details of the new match to create. Upon successful creation, the mutation returns the name of the new match.

### Deleting Matches
To delete a match, you can use the following GraphQL mutation:

mutation {
  removeMatch(id: 2) {
    name
  }
}

The removeMatch mutation takes an id parameter, which specifies the ID of the match to delete. Upon successful deletion, the mutation returns the name of the deleted match.
