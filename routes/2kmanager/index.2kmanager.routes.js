const managerRoutes = [
    { path: "/2k/wrestlers", router: require("./wrestler.routes") },
    { path: "/2k/blog", router: require("./blog.routes") },
    { path: "/2k/championships/reigns", router: require("./championship_reigns.routes") },
];

module.exports = { managerRoutes };
