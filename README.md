## E commerce app - NextJS + TypeScript + Apollo Server + Material UI

### Rendering order. Understanding the resolution order of the Next.js application
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