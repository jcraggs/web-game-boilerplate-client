# Deploying an the client end with Netlify

## 1) Add a '\_redirects' file (if not already present)

Add a file, `_redirects` (no file extension) to your `public` directory.
This file should contain a single line: `/* /index.html 200`.
This is telling Netlify "if a request comes in to _any_ endpoint on our base url - serve our index.html page and give a 200 status".
We put this in the `public` directory to ensure that Webpack includes this file in the production build of the app.

## 2) Create a Build Version

`npm run build`

This script uses Webpack and Babel to "bundle" your code into a few uglified files that can be read by most modern browsers.
Take a look inside - but don't change anything.

## 3) Create a Netlify Account

Visit: https://www.netlify.com/

## Install Netfify's CLI

`npm install netlify-cli -g`

## Deploy to a Draft URL

`netlify deploy`

- Authorise Netlify with GitHub, following the prompts in the browser.
- Select `Create & configure a new site`.
- Provide your choice of site name.
- Select your personal account.
- Provide a deploy path. This needs to point to your build directory and should be `./build`.

Your draft version should now be deployed on a url, e.g. `https://5c13ab16055b9be1725868e6--your-site-name.netlify.com`.
Test it out, make sure that everything is working as expected.

## Deploy a Production Version

`netlify deploy --prod`
Specify your build path again.
This will deploy the site to your actual specified url: `https://your-site-name.netlify.com`.

## Redeployment

1. Create an updated build version of your code:

```bash
npm run build
```

2. Deploy to a draft url:

```bash
netlify deploy
```

3. Deploy to your production url:

```bash
netlify deploy --prod
```

After running the `netlify deploy` or `netlify deploy --prod` commands you will be prompted for a publish directory, this should be `./build`.
