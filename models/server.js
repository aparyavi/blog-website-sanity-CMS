const express = require("express");
const cors = require("cors");
const path = require("path");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3001;
        this.middlewares();
        this.routes();
    }

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

    listen() {
        this.app.listen(this.port, () => {
            console.log("Server running on port: ", this.port);
        });
    }
}

module.exports = Server;