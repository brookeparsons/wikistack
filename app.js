const express = require('express');
const morgan = require('morgan');
const app = express();
const wikipageLayout = require('./views/wikipage');
const { db, Page, User} = require('./models');

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

//serve up a static file
app.use(morgan("dev"));
app.use(express.static(__dirname + "/stylesheets"));

//sync our models to the db
const init = async ()=> {
  await Page.sync();
  await User.sync();

  //app obj now listening on our localhost port 3000
  const PORT = 3000;
  app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
})
}
init();

//landing page res
app.get('/', (req, res) => {
  res.send('Hello World');
})
