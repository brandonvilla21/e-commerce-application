# E commerce app
### Front-end application based on React + NextJS + TypeScript + Apollo Server + Material UI

## Installation guide

### 1. Install dependencies
Run this command in order to install the dependencies
```sh
$ yarn
```
or alternatively...
```sh
$ npm install
```
### 2. Create an `.env` file

| Env variable　　　　　　　　　　　　　| Description 　　　　　　　　| Example |
| :--  | :--         | :--         |
| `GRAPHQL_URL` | This is the endpoint to the GraphQL server. | GRAPHQL_URL=http://localhost:4000/

### 3. Run the application

This next command will start a server by default on port [3000](http://localhost:3000)
```sh
$ npm run dev
```

## Rendering order. Understanding the resolution order of the Next.js application
These are the running orders, depending who is rendering the application.
  #### On the server:
  1. app.getInitialProps
  2. page.getInitialProps
  3. document.getInitialProps
  4. app.render
  5. page.render
  6. document.render
  
  #### On the server with error:
  1. document.getInitialProps
  2. app.render
  3. page.render
  4. document.render
  
  #### On the client
  1. app.getInitialProps
  2. page.getInitialProps
  3. app.render
  4. page.render
