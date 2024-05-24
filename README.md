<h1 align="center"><b>RsnFilter</b> <img src="https://i.ibb.co/0J89TrT/rsn-bot-1.png" width="30" style="border-radius: 50%; margin-bottom: -5px"></h1>
<p align="center"><i>Advanced NSFW Image Detection Package</i></p>

<p align="center"> <a href="https://www.digitalocean.com/?refcode=52756eb13d44&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge"><img width=200 height=90 src="https://web-platforms.sfo2.cdn.digitaloceanspaces.com/WWW/Badge%203.svg" alt="DigitalOcean Referral Badge" /></a> </p>

A comprehensive NSFW image detection npm package, equipped with advanced algorithms to ensure the safety and integrity of online platforms by swiftly identifying and filtering explicit content

## Installation

**Installation**

```bash
npm i rsn-filter
```

# APIKEY

Discord : [https://discord.gg/r5QWdKfQxr](https://discord.gg/r5QWdKfQxr)

Join discord server and create account with **/new** slash command and get your apikey with **/key** slash command for free!

## Usage Filter

```javascript
const { RsnFilter } = require("rsn-filter");

const rsnfilter = new RsnFilter("rsnai_××××××××××××××××××××××");

(async () => {
  const imageUrl = "";
  
  try {
    const response = await rsnfilter.filter(imageUrl);
        
    if (response.result === true) {
      console.log(response.message);
    }
        
    if (response.result === false) {
      console.log(response.message);
    }
  } catch (error) {
    console.error("RsnFilter Error:", error);
  }
})();
```