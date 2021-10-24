# React-Native FaunaDB

A React-Native sample application that uses FaunaDB serverless architecture.

## What is FaunaDB?

https://fauna.com/

FaunaDB is a very powerful database-as-a-service that offers functionalities that allows you to create an app without needing to have a backend, you won't need to build an AWS infrastructure or something similar, you just need FaunaDB.

## Compelling reasons to have a backend

This are some reasons you might want to have a lambda function (or cloudflare worder or whatever you want) on the side.

- **EMAILS**, when needing to do things like veriying user's email address or sending a forgot password code.
- **Notifications**, when you want to send some kind of notification (or a combination of such) like Push notification and WebSocket.

## Geting started with this example

1. Copy `.env.example` to `.env`.
2. Create a database.
3. Generate another key with role `GuestRules` -- to `guestToken` in the `.env` file.
4. Upload the `fauna/schema.graphql` on the dashboard -- this will create the collections and the graphql queries.
5. Run commands on `.fql` files in `fauna/resources` by copy-pasting them on the dashboard -- there is a tool for managing migrations but it doesn't work nicely with graphql https://github.com/fauna-labs/fauna-schema-migrate/issues/49
6. Manually create a new user, see command below -- Because I did not implement a register, you can use the **Guest** role to be able to do that similar to login.
7. Run `yarn && cd ios && pod install && cd .. && yarn start`
8. Run the app in your emulator or device.

**Create first user**

```js
Create(
  Collection("User"),
  {
    data: {
      email: "test@email.com",
      name: "Test 1"
    },
    credentials: {
      password: "password"
    }
  }
);
```
