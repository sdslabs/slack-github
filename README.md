slack-GitHub
============
>A webhook for GitHub that posts to your slack chat using an Incoming Webhook integration in slack.

How to use
==========
1. clone the repository : **git clone git@github.com:sdslabs/slack-github.git**
2. add remote for your heroku application address **git remote add git@heroku.com:YOUR-APP-NAME.git**
3. add heroku config variables..
>(URL variable is required) 
$ heroku config:set URL=Your-Slack-Incoming-Webhook-Url
(USERNAME and CHANNEL variables are optional)
4. deploy the application to heroku.
5. Add Your heroku app's address to your GitHub repo's Webhook Settings.

![image][1]


*YAY!! ..you are done..*
<hr>


[slack-GitHub] is built with love at [SDSLabs]


  [slack-GitHub]: https://github.com/sdslabs/slack-github
  [SDSLabs]: https://twitter.com/sdslabs


  [1]: http://drp.io/files/533d793974db4.png