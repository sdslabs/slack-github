slack-GitHub
============
>A webhook for GitHub that posts to your slack chat using an Incoming Webhook integration in slack.

How to use
==========
* clone the repository : `git clone git@github.com:sdslabs/slack-github.git`
* add remote for your heroku application address `git remote add git@heroku.com:YOUR-APP-NAME.git`
* add heroku config variables..

>URL variable is required 

`$ heroku config:set URL=Your-Slack-Incoming-Webhook-Url`

> `optional variables`

>USERNAME (username, who you want to send messages in chat, ex. bot)

>CHANNEL (channel in slack client for messages, ex. general)

* deploy the application to heroku.
* Add Your heroku app's address to your GitHub repo's Webhook Settings.

![image][1]


*YAY!! ..you are done..*
<hr>


>[slack-GitHub] is built with love at [SDSLabs]

License
=======
Licenced under MIT Licence. Feel free to contribute.



  [slack-GitHub]: https://github.com/sdslabs/slack-github
  [SDSLabs]: https://twitter.com/sdslabs


  [1]: http://drp.io/files/533d793974db4.png
