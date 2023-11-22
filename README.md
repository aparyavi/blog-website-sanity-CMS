# Blog Page
Using an express server to run a Sanity content management system and a React web application.

## Setup


Both applications are being run on the same server. 
In order to achieve this, we have routed the pathnames `"/blog"` and `"/blog/*" to the react single page (`index.html`).
We have then routed any other pathname to the single page (`index.html`) built for the Sanity project.

```javascript
// Bind controllers to routes
routes() {
  // Catch all requests that go to /blog
  this.app.get("/blog", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../blog_react_app/build/index.html")
    );
  });
  // Catch all requests that go to /blog/*
  this.app.get("/blog/*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../blog_react_app/build/index.html")
    );
  });
  // Catch all requests that don't match any route
  this.app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../blog_sanity_cms/build/index.html")
    );
  });
}
```

To be able to access all the pages in each application, we will need to give the (`build`) directory path of both projects to the express server.
```javascript
middlewares() {
  this.app.use(cors());
  this.app.use(express.json());

  // Pick up React index.html file
  this.app.use(
    express.static(path.join(__dirname, "../blog_sanity_cms/build"))
  );
  // Pick up Sanity index.html file
  this.app.use(
    express.static(path.join(__dirname, "../blog_react_app/build"))
  );
}
```

