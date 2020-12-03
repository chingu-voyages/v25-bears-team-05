require('dotenv').config();
const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const path = require('path');
const port = process.env.PORT || 5000;

const { createProxyMiddleware } = require('http-proxy-middleware');
console.log(process.env.API_SERVICE_URL)
app.use('', createProxyMiddleware({
  target: process.env.API_SERVICE_URL,
  changeOrigin: true
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