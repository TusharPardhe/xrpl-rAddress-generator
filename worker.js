const { parentPort } = require("worker_threads");
const xrpl = require("xrpl");

parentPort.on('message', ({ regex, maxDate }) => {

    while (maxDate > new Date().getTime()) {
        const randomAddress = xrpl.Wallet.generate();
        const { classicAddress } = randomAddress;

        if (regex.test(classicAddress)) {
            parentPort.postMessage(randomAddress);
        }
    };

    parentPort.postMessage("completed");
});