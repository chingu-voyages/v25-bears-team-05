import serverAPI from './serverAPI';
import axios from 'axios';
const app = require('express')();
const http = require('http').createServer(app);
const port = 5000;
app.get('/test', function(req: any, res: any) {
  res.send(`Response to GET method on /test route`);
});

beforeAll(done => {
  try {
    http.listen(port, async () => {
      console.log(`Listening on port ${port}`);
      const res = await axios("/test");
      done()
    });
  }
  catch (error) {
    done(error)
  }
});

afterAll(() => {
  http.close()
});

test('{method: "GET", path: "/test"}', async () => {
  const res = await serverAPI({method: "GET", path: "http://localhost:5000/test"});
  expect(res).toBe('Response to GET method on /test route');
});