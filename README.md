# RevoGains - About this Web App...

I created this app to calculate my capital gains on trading between euros and cryptocurrencies on my revolut account.

The app requires to download the statements from revolut for ever since the first transaction, 
and for all currencies accounts (one file per currency account).  
The statements needs to be downloaded as a csv file and uploaded in the app on the Files page.

Once the files uploaded, the app will attempt to match all the transactions 
and calculate the gains on each sale of non-euro currencies.  
The gains are calculated on the basses of first in first out.

# Live App

If you just want to run the web apps, it is deployed at https://revogain.audaxland.net.

# Run the app

To run the app, you can clone the repo and start it locally using

```
git clone https://github.com/audaxland/revogains.git
cd revogains
npm i
npm start
```


