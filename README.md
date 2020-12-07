# [![SyncedUp](./assets/logodark.svg)](https://syncedup.live/) | v25-bears-team-05
A LinkedIn style app for developers | Voyage-25 | https://chingu.io/

## Tech Stack
- React | create-react-app
- Typescript
- axios
## Features
- Local and google login/registation
- User profile 
  - Upload an avatar
  - Edit first and last names
  - Edit job title
- Network
  - Add/remove connections
  - View users connections

## API Repo
This app works in conjunction with a backend server: https://github.com/chingu-voyages/v25-bears-team-05-repo2
## Development setup
1. Clone this repo
1. Create .env file based on the sample.env 
1. Create app/.env file based on the app/sample.env 
    - [Create your Imgur client id here](https://api.imgur.com/oauth2/addclient)
1. `$ npm install`
1. `$ npm run app-install`
1. `$ npm run dev` or `$ npm run dev-win` if you're on windows OS

Clone and setup the API repo above for full functionality 

## Heroku Deployment guide
### Setup
1. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
1. Login
    - `$ heroku login`
1. Create Heroku app 
    - `$ heroku create <your heroku app name>`
    - Or using the [Heroku dashboard](https://dashboard.heroku.com/)
1. Set a git remote named heroku to your Heroku app
    - `$ heroku git:remote -a <your heroku app name>`

### Deploy
1. Set environment varibles on Heroku app (if first time or they've changed)
    - `$ heroku config:set $(<.env) $(<app/.env)`
1. Deploy a branch to heroku master
    - `$ git push heroku <your branch to deploy>:master`
