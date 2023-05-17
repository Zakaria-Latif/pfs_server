# TeamForge GraphQl Api Docs

Welcome to the documentation for our GraphQL API. This API allows you to perform various operations related to player, matches, messages... management, including user authentication.

## Before we deep dive into the docs here are the entities the API exposes

### Player Entity

_A Player is an entity that represents an individual who participates in sports matches and belongs to one or more groups. Players can be associated with matches through a MatchToPlayer entity, and can belong to groups through a GroupToPlayer entity. The Player entity contains information such as the player's name, age, gender, and any other relevant details._

| Field Name        | Type       | Description                                             |
| ----------------- | ---------- | ------------------------------------------------------- |
| id                | Int        | Unique identifier for the player                        |
| username          | String     | The player's username                                   |
| password          | String     | The player's password                                   |
| email             | String     | The player's email                                      |
| location          | String     | The player's location                                   |
| isVerified        | Boolean    | Indicates if the player's email has been verified       |
| verificationToken | String     | A token used for email verification                     |
| resetToken        | String     | A token used for password reset                          |
| resetExpiration   | Date       | The expiration date for the reset token                  |
| description       | String     | A short description of the player                        |
| playerStatisticsId| Int        | The ID of the associated PlayerStatistics entity         |
| playerStatistics  | PlayerStatistics | The associated PlayerStatistics entity           |
| groups            | [GroupToPlayer] | An array of the player's GroupToPlayer entities     |
| createdGroups            | [Group] | An array of the groups to whome the player is admin or creator     |
| createdMatches    | [Match]    | An array of the player's created Match entities          |
| matchToPlayers    | [MatchToPlayer] | An array of the player's MatchToPlayer entities     |
| messages          | [Message]  | An array of the player's Message entities                |
| createdAt         | Date       | The date the player was created                          |
| updatedAt         | Date       | The date the player was last updated                     |

### PlayerStatistics Entity

_PlayerStatistics refers to the statistical data that is collected and associated with a particular player in a sports game or competition. It can include data points such as goals scored, assists, minutes played, shots taken, and other relevant metrics. PlayerStatistics are used to evaluate the performance of players and to make informed decisions about strategies and team compositions._

| Field Name    | Type   | Description                                                     |
| ------------- | ------ | --------------------------------------------------------------- |
| id            | Int    | Unique identifier for the player statistics                     |
| rate          | Float  | The player's rate (default value is 0)                          |
| matchesNumber | Int    | The number of matches played by the player (default value is 0) |
| position      | String | The player's position (default value is "Attack")               |
| playerId      | Int    | The ID of the associated Player entity                          |
| player        | Player | The associated Player entity                                    |
| createdAt     | Date   | The date the player statistics were created                     |
| updatedAt     | Date   | The date the player statistics were last updated                |

### Match Entity

_Match refers to a scheduled game or competition between two teams or individuals. In our system, it is represented by the Match entity which includes details such as the date and time of the match, the location, and the participating teams/players. The Match entity is related to other entities in our system such as Player and MatchToPlayer to record details such as the players who participated in the match and their performance statistics._

| Field Name    | Type            | Description                                         |
| ------------- | --------------- | --------------------------------------------------- |
| id            | Int             | Unique identifier for the match entity              |
| location      | String          | The location where the match is being played        |
| name          | String          | The name of the match                               |
| time          | Date            | The date and time when the match is scheduled       |
| playersNumber | Int             | The number of players needed for the match          |
| prize         | String          | The prize for the match                             |
| duration      | Float           | The duration of the match                           |
| creatorId     | Int             | The ID of the associated creator Player entity      |
| creator       | Player          | The associated creator Player entity                |
| players       | [MatchToPlayer] | The associated MatchToPlayer entities for the match |
| createdAt     | Date            | The date the match was created                      |
| updatedAt     | Date            | The date the match was last updated                 |

### Message Entity

_A message represents a single communication sent by a user within a group. It contains the content of the message, the user who sent it, and the group it was sent to. Messages are associated with a group using a many-to-one relationship._

| Field Name | Type    | Description                                     |
| ---------- | ------- | ----------------------------------------------- |
| id         | Int     | The ID of the message                           |
| message    | String  | The content of the message                      |
| groupId    | Int     | The ID of the associated group entity           |
| group      | Group   | The group that the message belongs to           |
| senderId   | Int     | The ID of the associated sender Player entity   |
| sender     | Player  | The player that sent the message                |
| isRead     | Boolean | Whether the message has been read               |
| createdAt  | Date    | The timestamp when the message was created      |
| updatedAt  | Date    | The timestamp when the message was last updated |

### MatchToPlayer Entity

_This entity represents the relationship between a `Match` and a `Player`, with additional data such as the player's position and rating for that particular match._

| Field Name | Type   | Description                                        |
| ---------- | ------ | -------------------------------------------------- |
| id         | Int    | Unique identifier for the match-to-player entity   |
| rate       | Float  | The player's rating for the match                  |
| position   | String | The player's position in the match                 |
| playerId   | Int    | The ID of the associated player entity             |
| player     | Player | The associated player entity                       |
| matchId    | Int    | The ID of the associated match entity              |
| match      | Match  | The associated match entity                        |
| createdAt  | Date   | The timestamp when the match-to-player was created |
| updatedAt  | Date   | The timestamp when the match-to-player was updated |

### GroupToPlayer Entity

_GroupToPlayer is an entity that represents the relationship between a Group and a Player. It stores the ID of the Group and Player entities as foreign keys, as well as the timestamps for when the GroupToPlayer entity was created and last updated. The GroupToPlayer entity has a one-to-many relationship with the Group entity and a many-to-one relationship with the Player entity._

| Field Name | Type   | Description                                                        |
| ---------- | ------ | ------------------------------------------------------------------ |
| id         | Int    | The ID of the GroupToPlayer                                        |
| playerId   | Int    | The ID of the associated player entity                             |
| player     | Player | The associated player entity                                       |
| groupId    | Int    | The ID of the associated group entity                              |
| group      | Group  | The associated group entity                                        |
| createdAt  | Date   | The timestamp representing when the GroupToPlayer was created      |
| updatedAt  | Date   | The timestamp representing when the GroupToPlayer was last updated |

## Group Entity

_A Group is an entity that represents a collection of players who are participating together in a game or a tournament. It contains a name attribute that identifies the group, and is associated with a collection of GroupToPlayer entities that map players to the group. It also has a collection of Message entities, which contain messages sent between the players within the group._

| Field | Type | Description |
| --- | --- | --- |
| id | Int | The ID of the group |
| name | String | The name of the group |
| creator | Player | the creator or admin of the group|
| players | [GroupToPlayer] | The list of players in the group |
| messages | [Message] | The list of messages sent in the group |
| createdAt | Date | The timestamp representing when the group was created |
| updatedAt | Date | The timestamp representing when the group was last updated |

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

```
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
```

The login query takes a loginInput object, which should contain the player's username and password. Upon successful login, the query returns a JWT token (accessToken) and the player object, which includes the player's username and statistics, such as their rating.

## Player Management

### Retrieving Players

To retrieve a list of players, you can use the following GraphQL query:

```
query {
  players(paginationInput: {skip: 0, take: 10}) {
    id,
    username,
    playerStatistics{
      rate
    }
  }
}
```

The players query takes a paginationInput object, which specifies how many players to retrieve and where to start. The query returns a list of players, including their ID, username, and rating.

### To retrieve a single player, you can use the following GraphQL query

```
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
```

The player query takes a id parameter, which specifies the ID of the player to retrieve. The query returns a single player, including their username, rating, and any associated messages.

### To retrieve a single player with Matchs and Groups, you can use the following GraphQL query

```
query getPlayerMatchsGroups{
  player(id:14) {
    id
    username,
    email,
    matchToPlayers{
      match{
        id
        location
        playersNumber
      }
      playedMatch{
        id
        location
        time
      }
      plannedMatch{
        id 
        location
        time
      }
    }
    groupToPlayers{
      group{
        id
        name
      }
    }
  }
}
```

### To retrieve a single player with Created Matchs and Groups, you can use the following GraphQL query

```
query getPlayerCreatedMatchsGroups{
  player(id:7) {
    id
    username,
    email,
    createdMatches{
      id
      location
      playersNumber
    }
    createdGroups{
      id
      name
    }
  }
}
```

### Creating players

To create a new player, you can use the following GraphQL mutation:

```
mutation createPlayer{
    createPlayer(createPlayerInput:{
      username:"user",
      password:"123456",
      email:"user@user.com",
      location:"Marrakech",
      description:"Description",
    }){
    id
    username
    password
    email
  }
}
```

The createplayer mutation takes a createplayerInput object, which specifies the details of the new player to create. Upon successful creation, a PlayerStaistics is created(rate:0,matchsNumber:0,position:Attack),the mutation returns the content of the new player.

### Updating players

To update a new player, you can use the following GraphQL mutation:

```
mutation updatePlayer{
   updatePlayer(updatePlayerInput:{
      id:4760,
      username:"edit Name",
      email:"edit@email.com",
      password:"123456"
      location:"Lcoation Edit",
      description:"Description Edit"
    }){
   id
     username
  }
}
```

The updateplayer mutation takes a updateplayerInput object, which specifies the details of the player to update. Upon successful update, the mutation returns the content of the new player.

### Deleting Players

To delete a player, you can use the following GraphQL mutation:

```
mutation {
  removePlayer(id: 863) {
    username
  }
}
```

The removePlayer mutation takes an id parameter, which specifies the ID of the player to delete. Upon successful deletion, the mutation returns the player's username.

## playerStatistic Management

### Retrieving playerStatistics

To retrieve a list of playerStatistics, you can use the following GraphQL query:

```
query {
  playerStatistics(paginationInput: {skip: 0, take: 10}) {
    id,
    rate
    matchesNumber
    position
  }
}
```

The playerStatistics query takes a paginationInput object, which specifies how many playerStatistics to retrieve and where to start. The query returns a list of playerStatistics.

### To retrieve a single playerStatistic, you can use the following GraphQL query

```
query {
  playerStatistic(id:267) {
    id,
    rate
    matchesNumber
    position
  }
}
```

The playerStatistic query takes a id parameter, which specifies the ID of the playerStatistic to retrieve. The query returns a single playerStatistic.

### Updating playerStatistics

To update a new playerStatistic, you can use the following GraphQL mutation:

```
mutation updateStatistics{
   updatePlayerStatistic(updatePlayerStatisticInput:{
      id:6859,
      rate:1,
      matchesNumber:1,
      position:"Defender"
    }){
   id
     rate
    matchesNumber
  }
}
```

The updateplayerStatistic mutation takes a updateplayerStatisticInput object, which specifies the details of the playerStatistic to update. Upon successful update, the mutation returns the content of the new playerStatistic.

## Match Management

### Retrieving Matches

To retrieve a list of matches, you can use the following GraphQL query:

```
query {
  matches(paginationInput:{skip: 1, take:10}) {
    name,
    location,
    time
  }
}
```

The matches query takes a paginationInput object, which specifies how many matches to retrieve and where to start. The query returns a list of matches, including their name, location, and time.

### To retrieve a single match, you can use the following GraphQL query

```
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
```

The match query takes an id parameter, which specifies the ID of the match to retrieve. The query returns a single match, including its name, location, ID, and creator information.

### Retrieving ONe Match With Players

To retrieve a single match With Players, you can use the following GraphQL query:

```
query getMatchPlayers{
  match(id:2) {
    id
    name,
    location,
    time
    players{
      player{
        id
        username
        email
      }
    }
  }
}
```

Or to get the player u can use this query:

```
query members{
  members(id: 9){
    username,
    id,
    location
  }
}
```

to get you matches(the matches you are created):

```
query myMatches{
  myMatches(paginationInput:{skip: 1, take:16}){
    id,
    name,
    location,
    time,
    duration,
    creator{
      username
    },
    players{
      player{
        username,
      }
    }
    }
}


```

### Searching for Matches & Players

To search for matches|players based on certain criteria, you can use the following GraphQL queries:

```
query searchMatches{
  searchMatches(searchMatchInput: {
    minDuration: 0,
    maxDuration: 2,
    dateFrom: "2020-01-05T07:54:03.000Z",
    dateTo: "2025-01-05T07:54:03.000Z",
    searchTerm: "Lenojslsk"
  }){
    id,
    name,
    location,
    time,
    duration,
    creator{
      username
    },
    players{
      player{
        username,
      }
    }
  }
}



query searchPlayer{
  searchPlayers(searchPlayerInput: {
    position: "Defender",
    searchTerm: "leno",
    minRate: 1
  }){
     id,
    username,
    location,
    description,
    createdAt,
    playerStatistics{
      rate,
      matchesNumber,
      position,
      
    }
  }
    
}
```

### Creating Matches

To create a new match, you can use the following GraphQL mutation:

```
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
```

The createMatch mutation takes a createMatchInput object, which specifies the details of the new match to create. Upon successful creation, the mutation returns the name of the new match.

### Deleting Matches

To delete a match, you can use the following GraphQL mutation:

```
mutation {
  removeMatch(id: 2) {
    name
  }
}
```

The removeMatch mutation takes an id parameter, which specifies the ID of the match to delete. Upon successful deletion, the mutation returns the name of the deleted match.

## Group Management

### Retrieving Groups

To retrieve a list of groups, you can use the following GraphQL query:

```
query {
  groups(paginationInput:{skip: 1, take:10}) {
    name
  }
}
```

The groups query takes a paginationInput object, which specifies how many groups to retrieve and where to start. The query returns a list of groups, including their name.

### Retrieving One Group

To retrieve one group, you can use the following GraphQL query:

```
query {
  group(id:2) {
    id
    name
  }
}
```

The group query takes a id parameter, which specifies the ID of the group to retrieve. The query returns a single group, including their name.

### Retrieving One Group With Players

To retrieve a single group With Players, you can use the following GraphQL query:

```
query getGroupPlayers{
  group(id:3) {
    id
    name,
    players{
      player{
        id
        username
        email
      }
    }
  }
}
```

### Creating Groups

To create a new group, you can use the following GraphQL mutation:

```
mutation createGroup{
   createGroup(createGroupInput:{
      name:"La Clique Celitics Glazco"
    }){
   id
     name
    createdAt
    updatedAt
  }
}
```

The createGroup mutation takes a createGroupInput object, which specifies the details of the new group to create. Upon successful creation, the mutation returns the name of the new group.

### Updating Groups

To update a new group, you can use the following GraphQL mutation:

```
mutation updateGroup{
   updateGroup(updateGroupInput:{
      id:16,
      name:"La Clique Celtic Edit",
    }){
   id
     name
  }
}
```

The updateGroup mutation takes a updateGroupInput object, which specifies the details of the group to update. Upon successful update, the mutation returns the name of the new group.

### Deleting Groups

To delete a group, you can use the following GraphQL mutation:

```
mutation removeGroupe{
   removeGroup(id: 16){
    id
    name
  }
}
```

The removeGroupe mutation takes an id parameter, which specifies the ID of the group to delete. Upon successful deletion, the mutation returns the name of the deleted group.

## Message Management

### Retrieving Messages

To retrieve a list of messages, you can use the following GraphQL query:

```
query {
  messages(paginationInput:{skip: 1, take:10}) {
    id
    message
  }
}
```

The messages query takes a paginationInput object, which specifies how many messages to retrieve and where to start. The query returns a list of messages, including their content.

### Retrieving One Message

To retrieve one message, you can use the following GraphQL query:

```
query {
  message(id:2) {
    id
    message
  }
}
```

The message query takes a id parameter, which specifies the ID of the message to retrieve. The query returns a single message, including their content.

### Creating Messages

To create a new message, you can use the following GraphQL mutation:

```
mutation createMessage{
   createMessage(createMessageInput:{
      message:"Hello World",
      groupId:2,
      senderId:3108,
      isRead:false
    }){
   id
     message
  }
}
```

The createmessage mutation takes a createmessageInput object, which specifies the details of the new message to create. Upon successful creation, the mutation returns the content of the new message.

### Created Messages Subscription

To subscribe to a created message, you can use the following GraphQL Subscription:

```
subscription MessageAdded{
  messageCreated{
    id
    message
    isRead
    groupId
    senderId
  }
}
```

The MessageAdded Subscription,returns the created message.

### Updating Messages

To update a new message, you can use the following GraphQL mutation:

```
mutation updateMessage{
   updateMessage(updateMessageInput:{
      id:50,
      message:"Hello World Edit last",
      groupId:1,
      senderId:3948,
      isRead:true
    }){
   id
     message
  }
}
```

The updatemessage mutation takes a updatemessageInput object, which specifies the details of the message to update. Upon successful update, the mutation returns the content of the new message.

### Updated Messages Subscription

To subscribe to an updated message, you can use the following GraphQL Subscription:

```
subscription MessageUpdated{
  messageUpdated{
    id
    message
    isRead
    groupId
    senderId
  }
}
```

The MessageAdded Subscription,returns the created message.

### Deleting Messages

To delete a message, you can use the following GraphQL mutation:

```
mutation removeMessage{
   removeMessage(id: 54){
    id
    message
  }
}
```

The removemessagee mutation takes an id parameter, which specifies the ID of the message to delete. Upon successful deletion, the mutation returns the content of the deleted message.

### Deleted Messages Subscription

To subscribe to a deleted message, you can use the following GraphQL Subscription:

```
subscription MessageRemoved{
  messageremoved{
    id
    message
    isRead
    groupId
    senderId
  }
}
```

The MessageRemoved Subscription,returns the deleted message.

## GroupToPlayer Management

### Creating GroupToPlayers

To create a new GroupToPlayer, you can use the following GraphQL mutation:

```
mutation createGroupToPlayer{
    createGroupToPlayer(createGroupToPlayerInput:{
      playerId:1,
      groupId:10
    }){
     playerId
      groupId
  }
  }
```

The createGroupToPlayer mutation takes a createGroupToPlayerInput object, which specifies the details of the new GroupToPlayer to create. Upon successful creation, the mutation returns the name of the new GroupToPlayer.

### Updating GroupToPlayers

To update a new GroupToPlayer, you can use the following GraphQL mutation:

```
mutation udapteGroupToPlayer{
    updateGroupToPlayer(updateGroupToPlayerInput:{
      id:1,
      playerId:1,
      groupId:10
    }){
     playerId
      groupId
  }
  }
```

The updateGroupToPlayer mutation takes a updateGroupToPlayerInput object, which specifies the details of the GroupToPlayer to update. Upon successful update, the mutation returns the name of the new GroupToPlayer.

### Deleting GroupToPlayers

To delete a GroupToPlayer, you can use the following GraphQL mutation:

```
mutation removeGroupToPlayer{
    removeGroupToPlayer(id:16){
     playerId
      groupId
  }
  }
```

The removeGroupToPlayere mutation takes an id parameter, which specifies the ID of the GroupToPlayer to delete. Upon successful deletion, the mutation returns the name of the deleted GroupToPlayer.

## MatchToPlayer Management

### Creating MatchToPlayers

To create a new MatchToPlayer, you can use the following GraphQL mutation:

```
mutation createMatchToPlayer{
    createMatchToPlayer(createMatchToPlayerInput:{
      rate:0,
      position:"Attack",
      playerId:1,
      matchId:10
    }){
     id
     matchId
     playerId
  }
  }
```

The createMatchToPlayer mutation takes a createMatchToPlayerInput object, which specifies the details of the new MatchToPlayer to create. Upon successful creation, the mutation returns the name of the new MatchToPlayer.

### Updating MatchToPlayers

To update a new MatchToPlayer, you can use the following GraphQL mutation:

```
mutation updateMatchToPlayer{
    updateMatchToPlayer(updateMatchToPlayerInput:{
      id:1,
      rate:0,
      position:"Attack",
      playerId:1,
      matchId:14
    }){
     id
     matchId
     playerId
  }
  }
```

The updateMatchToPlayer mutation takes a updateMatchToPlayerInput object, which specifies the details of the MatchToPlayer to update. Upon successful update, the mutation returns the name of the new MatchToPlayer.

### Deleting MatchToPlayers

To delete a MatchToPlayer, you can use the following GraphQL mutation:

```
mutation removeMatchToPlayer{
    removeMatchToPlayer(id:16){
     id
     matchId
     playerId
  }
  }
```

The removeMatchToPlayere mutation takes an id parameter, which specifies the ID of the MatchToPlayer to delete. Upon successful deletion, the mutation returns the name of the deleted MatchToPlayer.

## Notification Management

### Retrieving Notifications

To retrieve a list of Notifications By Recipient id, you can use the following GraphQL query:

```
query {
  getNotificationsByRecipient(recipientId: 2) {
    id
    type
    title
    message
    isRead
    recipientId
  }
}
```

The Notifications query takes an recipient id,returns a list of Notifications, including their content.

### Retrieving Unread Notifications

To retrieve a list of Unread Notifications By Recipient id, you can use the following GraphQL query:

```
query {
  getUnreadNotificationsByRecipient(recipientId: 1) {
    id
    type
    title
    message
    isRead
  }
}
```

The Notifications query takes an recipient id,returns a list of Notifications, including their content.

### Creating Notifications

To create a new Notification, you can use the following GraphQL mutation:

```
mutation {
  createNotification(createNotificationInput: {
    type: "MESSAGE",
    title: "Notification Title",
    message: "Notification Message",
    recipientId: 2
  }) {
    id
    type
    message
    recipient{
      id
      username
      email
    }
  }
}
```

The createNotification mutation takes a createNotificationInput object, which specifies the details of the new Notification to create. Upon successful creation, the mutation returns the content of the new Notification.

### Created Notifications Subscription

To subscribe to a created Notification, you can use the following GraphQL Subscription:

```
subscription {
  notificationCreated{
    id
    title
    message
    isRead
    type
    recipient{
      id
      username
      email
    }
  }
}
```

The NotificationAdded Subscription,returns the created Notification.

### Deleting Notifications

To delete a Notification, you can use the following GraphQL mutation:

```
mutation {
  deleteNotification(notificationId: 3) {
    id
    type
    title
    message
    isRead
    recipient {
      id
      username
    }
  }
}
```
The deleteNotification mutation takes an id parameter, which specifies the ID of the Notification to delete. Upon successful deletion, the mutation returns the content of the deleted Notification.

## Mark a notification as read:

```
mutation markNotificationAsRead{
  markNotificationAsRead(notificationId: 2){
    id,
    type,
    title,
    message,
    recipientId,
    isRead
  }
}
```

## Request Management

### Retrieving One Request

To retrieve one Request, you can use the following GraphQL query:

```
query {
  request(id:6){ 
    id
    isAccepted
    creator {
      id
      username
    }
    match {
      id
      location
      playersNumber
    }
    recipient {
      id
      username
    }
  }
}

```

The Request query takes a id parameter, which specifies the ID of the Request to retrieve. The query returns a single Request, including their content.

### Creating Requests

To create a new Request, you can use the following GraphQL mutation:

```
mutation {
  createRequest(
    createRequestInput: {
      creatorId: 1
      matchId: 1
    }
  ) {
    id
    isAccepted
    creator {
      id
      username
    }
    match {
      id
      name
      playersNumber
    }
    recipient {
      id
      username
    }
  }
}
```

The createRequest mutation takes a createRequestInput object, which specifies the details of the new Request to create. Upon successful creation, the mutation returns the content of the new Request.

### Updating Requests

To update a new Request, you can use the following GraphQL mutation:

```
mutation {
  updateRequest(
    updateRequestInput: {
      id: 1
      creatorId: 3
      matchId: 3
    }
  ) {
    id
    isAccepted
    creator {
      id
      username
    }
    match {
      id
      name
      playersNumber
    }
    recipient {
      id
      username
    }
  }
}
```

The updateRequest mutation takes a updateRequestInput object, which specifies the details of the Request to update. Upon successful update, the mutation returns the content of the new Request.

### Deleting Requests

To delete a Request, you can use the following GraphQL mutation:

```
mutation {
  removeRequest(id: 1) {
    id
    isAccepted
    creator {
      id
      username
    }
    match {
      id
      name
      playersNumber
    }
    recipient {
      id
      username
    }
  }
}
```

The removeRequeste mutation takes an id parameter, which specifies the ID of the Request to delete. Upon successful deletion, the mutation returns the content of the deleted Request.

### Retrieving Requests By Creator Id

To retrieve a list of Requests By Creator Id, you can use the following GraphQL query:

```
query {
  requestsByCreatorId(id: 2) {
    id
    isAccepted
    match {
      id
      name
    }
    recipient {
      id
      username
    }
  }
}
```

### Retrieving Requests By Match Id

To retrieve a list of Requests By Match Id, you can use the following GraphQL query:

```
query {
  requestsByMatchId(id: 2) {
    id
    isAccepted
    creator {
      id
      username
    }
    recipient {
      id
      username
    }
  }
}
```

### Accepting Match Request

To accept a match Request, you can use the following GraphQL query:

```
mutation {
  acceptMatchRequest(id: 5) {
    id
    isAccepted
    creator {
      id
      username
    }
    match {
      id
      location
      playersNumber
    }
    recipient {
      id
      username
    }
  }
}
  ```

### Refusing Match Request

To refuse a match Request, you can use the following GraphQL query:

```
mutation {
  refuseMatchRequest(id: 5) {
    id
    isAccepted
    creator {
      id
      username
    }
    match {
      id
      name
    }
    recipient {
      id
      username
    }
  }
}
  ```
  
## Invitation Management

### Retrieving One Invitation

To retrieve one Invitation, you can use the following GraphQL query:

```
query {
  invitation(id:6){ 
    id
    isAccepted
    creator {
      id
      username
    }
    match {
      id
      location
      playersNumber
    }
    recipient {
      id
      username
    }
  }
}

```

The Invitation query takes a id parameter, which specifies the ID of the Invitation to retrieve. The query returns a single Invitation, including their content.

### Creating Invitations

To create a new Invitation, you can use the following GraphQL mutation:

```
mutation {
  createInvitation(
    createInvitationInput: {
      matchId:3,
      recipientId:3,
    }
  ) {
    id
    isAccepted
    creator {
      id
      username
    }
    match {
      id
      name
      playersNumber
    }
    recipient {
      id
      username
    }
  }
}

```

The createInvitation mutation takes a createInvitationInput object, which specifies the details of the new Invitation to create. Upon successful creation, the mutation returns the content of the new Invitation.

### Updating Invitations

To update a new Invitation, you can use the following GraphQL mutation:

```
mutation {
  updateInvitation(
    updateInvitationInput: {
      id: 1
      matchId:2
      recipientId:2
    }
  ) {
    id
    isAccepted
    creator {
      id
      username
    }
    match {
      id
      location
    }
    recipient {
      id
      username
    }
  }
}

```

The updateInvitation mutation takes a updateInvitationInput object, which specifies the details of the Invitation to update. Upon successful update, the mutation returns the content of the new Invitation.

### Deleting Invitations

To delete a Invitation, you can use the following GraphQL mutation:

```
mutation {
  removeInvitation(id: 1) {
    id
    isAccepted
    creator {
      id
      username
    }
    match {
      id
      location
      playersNumber
    }
    recipient {
      id
      username
    }
  }
}

```

The removeInvitatione mutation takes an id parameter, which specifies the ID of the Invitation to delete. Upon successful deletion, the mutation returns the content of the deleted Invitation.

### Retrieving Invitations By Recipient Id

To retrieve a list of Invitations By Recipient Id, you can use the following GraphQL query:

```
query {
  invitationsByRecipientId(id: 3) {
    id
    isAccepted
    creator {
      id
      username
    }
    match {
      id
      location
      playersNumber
    }
  }
}

```

### Retrieving Invitations By Creator Id

To retrieve a list of Invitations By Creator Id, you can use the following GraphQL query:

```
query {
  invitationsByCreatortId(id: 3) {
    id
    isAccepted
    creator {
      id
      username
    }
    match {
      id
      location
      playersNumber
    }
  }
}

```

### Retrieving Invitations By Match Id

To retrieve a list of Invitations By Match Id, you can use the following GraphQL query:

```
query {
  invitationByMatchId(id: 3) {
    id
    isAccepted
    creator {
      id
      username
    }
    recipient {
      id
      username
    }
  }
}

```

### Accepting Match Invitation

To accept a match Invitation, you can use the following GraphQL query:

```
mutation {
  acceptInvitation(id: 9) {
    id
    isAccepted
    match {
      id
      name
      playersNumber
    }
    recipient {
      id
      username
    }
  }
}
  ```

### Refusing Match Invitation

To refuse a match Invitation, you can use the following GraphQL query:

```
mutation {
  refuseInvitation(id: 7) {
    id
    isAccepted
    match {
      id
      name
      playersNumber
    }
    recipient {
      id
      username
    }
  }
}
  ```

## Calendar Management

### Retrieving One Calendar

To retrieve one Calendar, you can use the following GraphQL query:

```
query {
  calendar(Id: 9) {
    id
    player{
      username
      matchToPlayers{
        match{
          location
          time
        }
      }
    }
  }
}
```

The Calendar query takes a id parameter, which specifies the ID of the Calendar to retrieve. The query returns a single Calendar, including their name.


### Retrieving One Calendar By Player Id

To retrieve one Calendar, you can use the following GraphQL query:

```
query {
  calendarByPlayerId(playerId: 9) {
    id
    player{
      username
      matchToPlayers{
        match{
          location
          time
        }
      }
    }
  }
}
```

The Calendar query takes a id parameter, which specifies the ID of the Calendar to retrieve. The query returns a single Calendar, including their name.

### Creating Calendars

To create a new Calendar, you can use the following GraphQL mutation:

```
mutation {
  createCalendar(createCalendarInput:{playerId:10}) {
   	id
		playerId
    player{
      username
      matchToPlayers{
        match{
          location
          time
        }
      }
    }
  }
}
```

The createCalendar mutation takes a createCalendarInput object, which specifies the details of the new Calendar to create. Upon successful creation, the mutation returns the name of the new Calendar.

### Updating Calendars

To update a new Calendar, you can use the following GraphQL mutation:

```
mutation {
  updateCalendar(updateCalendarInput:{id:1,playerId:10}) {
   	id
    player{
      username
      matchToPlayers{
        match{
          location
          time
        }
      }
    }
  }
}
```

The updateCalendar mutation takes a updateCalendarInput object, which specifies the details of the Calendar to update. Upon successful update, the mutation returns the name of the new Calendar.

### Deleting Calendars

To delete a Calendar, you can use the following GraphQL mutation:

```
mutation {
  removeCalendar(id:1) {
   	id
    player{
      username
      matchToPlayers{
        match{
          location
          time
        }
      }
    }
  }
}
```

The removeCalendare mutation takes an id parameter, which specifies the ID of the Calendar to delete. Upon successful deletion, the mutation returns the name of the deleted Calendar.
