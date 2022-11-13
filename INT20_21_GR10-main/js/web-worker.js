function init() {
    setInterval(checkHour, 1000 * 60);
    checkHour();
}
init();

function checkHour() {
    const hours = new Date().getHours();

    if (hours < 10) {
        postMessage(true);
    } else {
        postMessage(false);
    }
}
