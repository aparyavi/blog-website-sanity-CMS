# Blog Page
Using an express server to run a Sanity content management system and a React web application.

## Setup
This project consists of two main directories, one hosting the Sanity CMS and the other hosting the React application.

### Sanity CMS
If you don't have a Sanity project created, you can follow the instructions [here](https://www.sanity.io/docs/create-a-sanity-project) and start your Sanity project.
Otherwise, if you already have a project created, you can copy your projectId and your dataset name onto (`./blog_sanity_cms/sanity.config.js`) and (`./blog_sanity_cms/sanity.cli.js`).
To get into the project directory run the following:
```sh
cd blog_sanity_cms
```
(`./blog_sanity_cms/sanity.config.js`)
```javascript
export default defineConfig({
  name: 'default',
  title: 'blog_sanity_cms',

  projectId: 'your-project-id',
  dataset: 'dataset-name',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
```
(`./blog_sanity_cms/sanity.cli.js`)
```javascript
export default defineCliConfig({
  api: {
    projectId: 'your-project-id',
    dataset: 'dataset-name'
  }
})
```

Next, you need to install all the dependencies by running:
```sh
npm i
sanity install
```

Now you can start your Sanity project locally on port 3333 by running:
```sh
npm run dev
```

You can customize your Sanity Studio by following the instructions on [here](https://www.sanity.io/docs/customization).

Once you are done with your project customization you can run the following to be able to access the sanity project from your express server:
```sh
npm run build
```


### Express Server
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

