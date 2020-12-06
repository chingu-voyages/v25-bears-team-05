require('dotenv').config();
const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const path = require('path');
const port = process.env.PORT || 5000;
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const apiUrl = process.env.NODE_ENV === "development" ? process.env.DEV_API_SERVICE_URL : process.env.API_SERVICE_URL;

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