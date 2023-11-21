## React Node Express App
This project serves as a template to build more complex applications using React and Node js.

### Setup
The code is divided into two parts; back end and front end. The back end main file can be located in
(`index.js`)
where a new Server object is initialized from the Server class located in 
(`models/server.js`)

Run this code to start the server:
```sh
node index.js
```

You should get the response:
```sh
'Server running on port:  3010'
```

The front end code is located in the (`react_app`) directory.

You can start the React app locally by running:
```sh
npm start
```
This window should pop up:

<img width="717" alt="Screenshot 2023-11-20 at 7 41 39 PM" src="https://github.com/aparyavi/react-node-express-app/assets/62215723/30e2c183-e5f6-4176-88f5-b07c9c5121ae">


### Create API Endpoints
New API endpoints can be created in server.js by adding to the paths object:

```javascript
this.app = express();
this.port = process.env.PORT || 3010;
this.paths = {
   response: "/api/response",
   // add endpoints here
};

this.middlewares();
this.routes();
```
After adding the endpoint to paths, the API endpoint should be routed to a file that can handle the API call.
```javascript
this.app.use(this.paths.response, require("../routes/response"));
// add path to file to handle API call

// Catch all requests that don't match any route
this.app.get("*", (req, res) => {
   res.sendFile(
      path.join(__dirname, "../react_app/build/index.html")
   );
});
```

### Client Side
Once the client side is up and running, the connection to the back end is established using `axios` library.

`getResponseFromServer()` is a function in (`src/App.js`) that uses `axios` to get a simple response from the server.
```javascript
async function getResponseFromServer() {
   // API call to /api/response endpoint
   const result = await axios.get(config.server + 'api/response')
   // set response using React Hooks
   setResponse(result.data)
}
```
(`src/config.js`) can be modified to change the API from localhost to any other source.
```javascript
const config = {
    server: "http://localhost:3010/",
};

export default config;
```

### Deployment
To deploy this application, we need to first build the front end by running (`npm run build`) which will consolidate all of the front end code into the (`react_app/build`) directory.

Next, we need to tell our back end server how to load the client application inside the (`react_app/build`) directory.

This is done in (`models/server.js`):
```javascript
middlewares() {
   this.app.use(cors());
   this.app.use(express.json());

   // Pick up React index.html file
   this.app.use(
      express.static(path.join(__dirname, "../react_app/build"))
   );
}

// Bind controllers to routes
routes() {
   this.app.use(this.paths.response, require("../routes/response"));
   // Catch all requests that don't match any route
   this.app.get("*", (req, res) => {
      res.sendFile(
         path.join(__dirname, "../react_app/build/index.html")
      );
   });
}
```
