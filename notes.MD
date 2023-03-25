DEPLOYING to HEROKU

$ npm install -g heroku
$ heroku create
// Created: https://lit-crag-58882.herokuapp.com/ | https://git.heroku.com/lit-crag-58882.git
$ heroku open // opened newly created heroku app in browser
$ git remote -v // now we have origin and heroku

$ heroku create -a face-reco-backend-86 // i decided to create app with custom name
$ git remote -v // but here we still have lit-crag-58882, not the newly created app

$ heroku apps:destroy --app lit-crag-58882 --confirm lit-crag-58882
$ git remote add heroku https://git.heroku.com/face-reco-backend-86.git
// We deleted not neede app and added new app instead

$ git push heroku main
$ heroku open // error - let's see logs

$ heroku logs --tail
// Error "sh: 1: nodemon: not found"
// Solution: modified package.json:

  "scripts": {
      "start": "node server.js",
      "start:dev": "nodemon server.js"
    }
// We continue using nodemon in local development environment, but not during production on the Heroku server.

$ git add .
$ git commit -m "scripts in package.json modified to run nodemon only in local dev environment"

// push to github and heroku, and open:
// blank page and hanging loading...
// Logs: "Error R10 (Boot timeout) -> Web process failed to bind to $PORT within 60 seconds of launch"
// Solution: modify server.js:
    app.listen(process.env.PORT || 3000, () => ...) 

// add, commit and push

