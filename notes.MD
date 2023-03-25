**Deploying to Heroku**

$ npm install -g heroku  
$ heroku create  
_Created: https://lit-crag-58882.herokuapp.com/ | https://git.heroku.com/lit-crag-58882.git_  
$ heroku open -- _opened newly created heroku app in browser_  
$ git remote -v -- _now we have origin and heroku_  

$ heroku create -a face-reco-backend-86 -- _I decided to create app with custom name_  
$ git remote -v -- _But here we still have lit-crag-58882, not the newly created app_

$ heroku apps:destroy --app lit-crag-58882 --confirm lit-crag-58882  
$ git remote add heroku https://git.heroku.com/face-reco-backend-86.git  
_We deleted not needed app and added new app instead_

$ git push heroku main  
$ heroku open -- _error - let's see logs_

$ heroku logs --tail  
_Error "sh: 1: nodemon: not found"_
_Solution: modified package.json:_  
`"scripts": {
      "start": "node server.js",
      "start:dev": "nodemon server.js"
    }`  
_We continue using nodemon in local development environment, but not during production on the Heroku server._

$ git add .  
$ git commit -m "scripts in package.json modified to run nodemon only in local dev environment"  

_push to github and heroku, and open:_  
_blank page and hanging loading..._  
_Logs: "Error R10 (Boot timeout) -> Web process failed to bind to $PORT within 60 seconds of launch"_  
_Solution: modify server.js:_  
    _app.listen(process.env.PORT || 3000, () => ...)_

Add, commit, push and open:  
It starts, goes with route  
  _app.get('/', (req, res) => {...})_  
Receives respond with message and shows it, but in logs we see error "connect ECONNREFUSED 127.0.0.1:5432", because it was a local connection to our database.





**Connecting to Postgres on Heroku**
 
 1. On Heroku add Postgres to our App

 2. Connect to db  
 _https://devcenter.heroku.com/articles/heroku-postgresql_  
 _https://devcenter.heroku.com/articles/managing-heroku-postgres-using-cli_

 `heroku addons`    to check if DB is already connected (in our case yes)  
 `heroku pg:info`    some info about connected database  
 `heroku pg:psql`    connecting to our "postgresql-concave-33478"

 3. Create tables
 _Go to pgAdmin and copy queries from history_  

 `CREATE TABLE login (
	id serial PRIMARY KEY,
	hash varchar(100) NOT NULL,
	email text UNIQUE NOT NULL
 );`

 `CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100),
	email TEXT UNIQUE NOT NULL,
	entries BIGINT DEFAULT 0,
	joined TIMESTAMP NOT NULL
 );`

 `\d`    check created tables  
 `\q`    quit psql session

4. Modify connection details inside our _server.js_  
_https://devcenter.heroku.com/articles/connecting-heroku-postgres#connecting-in-node-js_  

  `connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }`




