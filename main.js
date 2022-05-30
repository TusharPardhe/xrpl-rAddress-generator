const fs = require("fs");
const { Worker } = require('worker_threads');

(function generateRandomAddress() {
    const settings = JSON.parse(fs.readFileSync("./settings.json"));
    const { threads, keywords, writeInFile, runFor, type } = settings;
    console.log("Workers are working (Note: smaller the keywords, faster the results)...");

    // from runFor user input generate the max date in seconds
    const maxDate = new Date().setMinutes(new Date().getMinutes() + runFor);

    // generate regex from strings
    const getRegex = {
        anywhere: new RegExp(keywords.join("|"), 'gi'),
        edges: new RegExp('^(r)(' + keywords.join('|') + ')(.+)$|^(r.+)(' + keywords.join('|') + ')$', "i"),
        beginning: new RegExp('^(r)(' + keywords.join('|') + ')(.+)$', "i"),
        end: new RegExp('^(r.+)(' + keywords.join('|') + ')$', "i"),
    };

    const regex = getRegex[type];
    console.log(`Your keywords as regex: ${regex}`);

    // spawn workers based on user input
    for (let i = 0; i < threads; i++) {
        const worker = new Worker("./worker.js");
        worker.postMessage({ regex, maxDate });

        // when worker returns a valid address that matches regex
        worker.on("message", (data) => {

            if (typeof data === "string") {
                console.log(`Time's up for worker number ${worker.threadId} !!`);
                worker.terminate();
                return;
            }
            // log it in console
            console.log(`${[worker.threadId]} :`, data);

            // if enabled write the data in file
            if (writeInFile) {
                let fileData = JSON.parse(fs.readFileSync("./output.json"));
                fileData.push(data);
                fs.writeFileSync("./output.json", JSON.stringify(fileData, null, "\t"));
            };
        })
    }
})();