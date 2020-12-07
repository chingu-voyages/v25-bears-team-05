require('dotenv').config();
const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const path = require('path');
const port = process.env.PORT || 5000;
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const isProduction = !(process.env.NODE_ENV && process.env.NODE_ENV.match("development"));

const apiUrl = !isProduction ? process.env.DEV_API_SERVICE_URL : process.env.API_SERVICE_URL;

// redirect http traffic to https 
if (isProduction) {
  app.enable('trust proxy');
  app.use(function(request, response, next) {
    !request.secure && response.redirect("https://" + request.headers.host + request.url);
    next();
  });
}

const corsOptions = {
  origin: apiUrl,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204,
  credentials: true
};

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.use('/api', createProxyMiddleware({
  target: apiUrl,
  changeOrigin: true,
  pathRewrite: {
    [`^/api`]: '',
  },
  auth: process.env.CLIENT_API_PASS,
}));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/app/build")));
  app.get("*", (req, res, next) => {
    res.sendFile(path.join(__dirname + "/app/build/index.html"));
  });
} else {
  app.get("*", (req, res, next) => {
    res.sendFile(path.join(__dirname + "/app/public/index.html"));
  });
}

http.listen(port, () => {
    console.log(`Listening on port ${port}`);
});