# Night Vision Data

 Night Vision Data is a web app that will mostly work with Governments data to make informations more Open and Presentable to citizens and society so that they can clearly understand what’s happening under the hood.
 This plateform will help 'unjailing' the data. A sort of collaborative data crowdsourcing.

 * People will find data in the format of PDF or Image ... and they will collaborate to make it in an exploitable format
 * We will start by creating a crowdsourcing Plateform for the Tunisian municipal election of 06-05-2018 and we will try to make it as generic as possible to extend the crowdsourcing to different other data.
 
## Welcome !

Thank you so much for stopping by! We're Looking forward to collaborate with you whether you're from a technical or non technical background . Please feel free to add comments and questions.
## Contributing

Thanks for your interest in contributing to Night Vision Data! There are many ways to contribute. To get started, take a look at [CONTRIBUTING.md](CONTRIBUTING.md).

## Participation Guidelines

This project adheres to  [Mozilla Community Participation Guidelines](https://www.mozilla.org/en-US/about/governance/policies/participation/). By participating, you are expected to uphold this code.

## How to install
1. Install mongo db on your machine or provide a link to a hosted instance
2. Open mongo db 
3. Import the data of the election lists in the database :
    * Go to  `./data` and execute `mongoimport --db night-vision-data --collection lists --type json  --file  ./Ariana.json --jsonArray`
    * You can also add another gov `mongoimport --db night-vision-data --collection lists --type json  --file  ./Beja.json --jsonArray`
    * we would be able to add all the lists at once when the file is ready
4. Start the backend server (node.js) go to `./backend` and type `npm start`
5. Start the front-end (React - webpack) go to `./ frontend ` and type `npm start`
6. Open the browser ` localhost:3000`
## Deploy
1. Host the Rest api on a server
2. Change the config file server link under `./frontend/src/components/config.js` 
3. whange `webpack.config-build` to `webpack.config` and instead of `npm start ` run `webpack`
    * the bundle file will be generated under `./frontend/dist/static`

## Licence
[MIT](LICENSE)
