const managerRoutes = [
    { path: "/2k/wrestlers", router: require("./wrestler.routes") },
    { path: "/2k/blog", router: require("./blog.routes") },
    { path: "/2k/auth", router: require("./auth.routes") },
];

module.exports = { managerRoutes };
