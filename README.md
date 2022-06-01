# XRPL random rAddress (wallet) generator

A Javascript based script that randomly generates XRPL accounts that contain keywords provided by the user in settings.json file.

The generated account format is `r...`

This program uses worker threads ie. similar to multi-threading in other languages. You can spawn as many workers as you like in parallel depending upon how much load your computer can take.

The tool will spit out the results in output.json file and the terminal, you can disable this in settings.json.

Results will be an array of accounts in output.json file:

```
[{
        "publicKey": "ED...",
        "privateKey": "ED...",
        "classicAddress": "r...",
        "seed": "s..."
},
{
        "publicKey": "ED...",
        "privateKey": "ED...",
        "classicAddress": "r...",
        "seed": "s..."
},
{
        "publicKey": "ED...",
        "privateKey": "ED...",
        "classicAddress": "r...",
        "seed": "s..."
}]
```

## How to run this program?

1. Make sure you that **nodejs** and **npm** or **yarn** is installed ([Node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)).
2. Download the repository (using `git clone` or by directly downloading the zip file)
3. Open the folder in vscode or any other editor of your choice
4. Open terminal/commandline
4. Run `npm install` or `yarn install`
5. Open `settings.json` file and add your keywords in `keywords` array.
```
Specify the number of threads `threads`, the `type` where you want to see your keyword:- end, beginning, anywhere or edges and the max time limit `runFor` (in minutes) for the program in `settings.json` file.
```
7. Save `settings.json` file.
8. In terminal type `yarn generate` or `npm run generate` to generate your addresses.

Settings.json file:
```
{
    "threads": 10, 
    "keywords": ["abc","xrp","hi","test","589"], 
    "writeInFile": true,
    "type":"anywhere",
    "runFor": 10
}
```

`Note: Don't forget to clear out output.json file after each input. Place [] (empty array) in output.json before running the code for an input`

## Important information

- This script will search the address for keywords, if you spawn more threads than your CPU can manage, your computer may slow down.  
- Words of length 3 or less are easier to find (The longer the term, the longer it will take to find).
- It utilises [XRPL.js](https://github.com/XRPLF/xrpl.js) library to generate random addresses.
