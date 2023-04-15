const cors = require("cors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();

const indexRouter = require("./routes/index.routes");
const { managerRoutes } = require("./routes/2kmanager/index.2kmanager.routes");

const loadRoutes = (routes) => {
    routes.forEach((route) => {
        app.use(route.path, route.router);
    });
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
loadRoutes(managerRoutes);

module.exports = app;
