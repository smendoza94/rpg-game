const router = require("express").Router();
const apiRoutes = require("./api");
const htmlRoutes = require("./html/html-routes");

// add prefix of '/api' to all the api routes imported from the 'api' directory
router.use("/api", apiRoutes);
// home html pages for front end routes imported
router.use("/", htmlRoutes);

router.use((req, res) => {
  res.status(404).send("<h1>๐404 Error๐</h1>");
});

module.exports = router;
