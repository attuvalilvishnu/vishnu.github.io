const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Set static path
const pa = `${__dirname}/client`;
app.use(express.static(pa));

app.use(bodyParser.json());

const publicVapidKey =
  "BLghsAja6MICF7vS2ID9oSdMzBVo4P5wXrwnL_OI-gr_y5lbWApm8D3jwHu6TUq-L_NEdxeREk9p2ananBpz9Kw";
const privateVapidKey = "8NqUUXsRKe6b0hn-U4GaYVe4yCyU6Iml_SgpRIlWIZs";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body.pushSubscription;
  const type = req.body.type;

  // Send 201 - resource created
  res.status(201).json({});
  let payload = '';
  console.log(type);
  // Create payload
  if (type === 'home') {
    payload = JSON.stringify(
      { title: "Push notification for home", body: 'Notified by home page' }
    );
  } else{
    payload = JSON.stringify(
      { title: "Push notification for about", body: 'Notified by about page' }
    );
  }
  /*else if (type === 'about') {
    payload = JSON.stringify(
      { title: "Push notification for about", body: 'Notified by about page' }
    );
  }*/


  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.log(err));
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
