var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// app.get("/api/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });


module.exports = router;
