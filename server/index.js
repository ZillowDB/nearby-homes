const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const homes = require('./routes/api/homes');

const app = express();
const port = process.env.PORT || 3003;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use('/', homes);

app.listen(port, () => {
  console.log(`server is running at: http://localhost:${port}`);
});
