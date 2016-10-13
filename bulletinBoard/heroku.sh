git init
git add .
git commit -m "update"
heroku git:remote -a announceit
git push heroku master -f
heroku open
