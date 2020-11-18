import serverAPI from './serverAPI';
import { deleteCookie, setCookie } from '../../utils/cookie-parser';

/* hack to make node server work in jsdom
// https://stackoverflow.com/questions/42677387/jest-returns-network-error-when-doing-an-authenticated-request-with-axios/43020260#43020260
*/
const path=require('path');
const lib=path.join(path.dirname(require.resolve('axios')),'lib/adapters/http');
const httpPatch=require(lib);

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
      done()
    });
    setCookie('userid', '12345', 9999);
    setCookie('jwt', '12345', 9999);
  }
  catch (error) {
    done(error);
  }
});

afterAll(() => {
  deleteCookie('userid');
  deleteCookie('jwt');
  http.close();
});

test('{method: "GET", path: "/test"}', async () => {
  const res = await serverAPI({method: "GET", path: "http://localhost:5000/test", additionalConfigs: {adapter: httpPatch}});
  expect(res.data).toBe('Response to GET method on /test route');
});