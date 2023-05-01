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
