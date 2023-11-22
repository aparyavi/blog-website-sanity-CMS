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

### React Blog
This is a simple React application that fetches data from the Sanity CMS and displays it for the client. To become more familiar with React you can look at the resources available on [React Js website](https://legacy.reactjs.org/docs/hello-world.html) as well as other sources on the internet.

To get into the project directory run the following:
```sh
cd blog_react_app
```
Next, you will need to install all the dependencies listed in (`packag.json`) by running the following:
```sh
npm i
```

You can start your project locally by running:
```sh
npm start
```

There is a (`sanity_config.js`) file in the (`./src`) directory where you will need to put your Sanity projectId and production title:
```javascript
export default {
    projectId: 'your-project-id',
    dataset: 'dataset-name',
    useCdn: true, // set to `false` to bypass the edge cache
    apiVersion: '2023-11-21', // use current date (YYYY-MM-DD) to target the latest API version
    // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
}
```

In the (`App.js`) file we have routes to two pages which are the home page and the individual blog pages.
```html
<Router>
  <Routes>
    <Route exact path='/blog' element={<Home />} />
    <Route exact path='/blog/:id' element={<Blog />} />
  </Routes>
</Router>
```

Both the home page and the individual blog pages fetch data from the Sanity CMS using the (`@sanity/client`) module.

The functions for fetching blog posts from Sanity are located in the (`sanity_client.js`) file inside the (`./src`) directory.
Function for getting individual blogs is as follows:
```javascript
export async function getPost(id) {
    const posts = await client.getDocument(id)
    const author = await client.getDocument(posts.author._ref)
    const category = await client.getDocument(posts.categories[0]._ref)
    return [posts, author, category]
}
```
Function for fetching all of the blog posts is as follows: 
```javascript
export async function getPosts() {
    const posts_temp = []
    const posts = await client.fetch(
        `*[_type == "post"]`
    )
    for (let index = 0; index < posts.length; index++) {
        const post = posts[index];

        const author = await client.getDocument(post.author._ref)
        const category = await client.getDocument(post.categories[0]._ref)
        posts_temp.push({
            ...post,
            author: author,
            category: category.title
        })
    }
    return posts_temp
}
```

Once you have finished setting up your project you can run the following to be able to access the project from your express server:
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

