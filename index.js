let express = require('express');
let app = express();
let cors = require('cors');

app.use(cors({optionsSuccessStatus: 200}));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/:date', (req, res) => {
  try {
    let utc = getUTC(req.params.date);
    let unix = getUNIX(req.params.date);
    res.json({unix: unix, utc: utc})
  } catch (e) {
    res.json({error: 'Invalid Date'});
  }
});

getUTC = date => {
  if (!date) {
    return new Date().toUTCString();
  }
  let timestamp = Number(date);
  if (timestamp) {
    return new Date(timestamp).toUTCString();
  }
  let utc = new Date(date);
  if (utc.getTime()) {
    return utc.toUTCString();
  }
  throw 'Invalid';
}

getUNIX = date => {
  if (!date) {
    return Date.now();
  }
  let timestamp = Number(date);
  if (timestamp) {
    return timestamp;
  }
  let unix = Date.parse(date);
  if (unix) {
    return unix;
  }
  throw 'Invalid';
}

app.listen(3000, () => console.log('server started on port 3000'));