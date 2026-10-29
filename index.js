const inputBeforeCur = document.getElementById("before-cursor");
const inputAfterCur = document.getElementById("after-cursor");
const cursor = document.getElementById("cursor");
const output = document.getElementById("out");
let clearNext = false;
let history = [];
let historyIndex = -1;
if (window.sessionStorage) {
    let savedHistory;
    try {
        savedHistory = JSON.parse(window.sessionStorage.getItem("history"));
    } catch (err) {
        console.error("Error getting/parsing history:", err);
    }
    if (savedHistory?.length != null) {
        history = savedHistory;
        historyIndex = savedHistory.length;
    }
}

function calc() {
    const ogValue = inputBeforeCur.innerText + inputAfterCur.innerText;
    let currentValue = ogValue.replaceAll("^", "**");
    let result = "ERROR";
    const lettersRegex = /[a-zA-Z]/;
    if (!lettersRegex.test(currentValue)) {
        try {
            result = eval(currentValue);
        } catch (err) {
            console.warn("Invalid input:", err);
        }
    }
    output.innerText = `= ${result}`;
    setClearNext(true);
    history.push(ogValue);
    if (window.sessionStorage) {
        try {
            sessionStorage.setItem("history", JSON.stringify(history));
        } catch (err) {
            console.error("Error saving history in sessionStorage:", err);
        }
    }
}

function clearIfNext() {
    if (clearNext) {
        clear();
        cursor.classList.remove("hide");
    }
}
function setClearNext(next) {
    clearNext = next;
    if (next) {
        cursor.classList.add("hide");
    } else {
        cursor.classList.remove("hide");
    }
}

function input(str) {
    clearIfNext();
    inputBeforeCur.innerText += str;
    cursor.scrollIntoView({
        inline: "center"
    })
}

function clear() {
    output.innerText = "";
    inputBeforeCur.innerText = "";
    inputAfterCur.innerText = "";
    setClearNext(false);
}

function backspace() {
    clearIfNext();
    inputBeforeCur.innerText = inputBeforeCur.innerText.substring(0, inputBeforeCur.innerText.length - 1);
}

function historyUp() {
    if (historyIndex > 0) {
        historyIndex--;
    }
    clear();
    inputBeforeCur.innerText = history[historyIndex] ?? "";
}
function historyDown() {
    if (historyIndex < history.length - 1) {
        historyIndex++;
    }
    clear();
    inputBeforeCur.innerText = history[historyIndex] ?? "";
}
function cursorLeft() {
    if (inputBeforeCur.innerText.length > 0) {
        const char = inputBeforeCur.innerText.substring(inputBeforeCur.innerText.length - 1);
        inputBeforeCur.innerText = inputBeforeCur.innerText.substring(0, inputBeforeCur.innerText.length - 1);
        inputAfterCur.innerText = char + inputAfterCur.innerText;
    }
    cursor.scrollIntoView({
        inline: "center"
    });
}
function cursorRight() {
    if (inputAfterCur.innerText.length > 0) {
        const char = inputAfterCur.innerText.substring(0, 1);
        inputBeforeCur.innerText += char;
        inputAfterCur.innerText = inputAfterCur.innerText.substring(1);
    }
    cursor.scrollIntoView({
        inline: "center"
    });
}
document.getElementById("up").addEventListener("click", historyUp);
document.getElementById("down").addEventListener("click", historyDown);
document.getElementById("left").addEventListener("click", cursorLeft);
document.getElementById("right").addEventListener("click", cursorRight);

document.getElementById("eq").addEventListener("click", calc);
document.getElementById("clear").addEventListener("click", clear);
document.getElementById("del").addEventListener("click", backspace);

window.addEventListener("keydown", event => {
    const inputChars = "1234567890()^%*x/+-. ";
    if (inputChars.includes(event.key)) {
        input(event.key.replace("x", "*"));
        event.preventDefault();
    } else if (event.key === "Backspace") {
        backspace();
    } else if (event.key === "ArrowLeft") {
        cursorLeft();
        event.preventDefault();
    } else if (event.key === "ArrowRight") {
        cursorRight();
        event.preventDefault();
    } else if (event.key === "ArrowUp") {
        historyUp();
        event.preventDefault();
    } else if (event.key === "ArrowDown") {
        historyDown();
        event.preventDefault();
    }
});
window.addEventListener("keyup", event => {
    if (event.key === "Enter" || event.key === "=") {
        calc();
    } else if (event.key === "ArrowLeft") {
        event.preventDefault();
    } else if (event.key === "ArrowRight") {
        event.preventDefault();
    }
});

document.getElementById("popen").addEventListener("click", () => input("("));
document.getElementById("pclose").addEventListener("click", () => input(")"));
document.getElementById("exp").addEventListener("click", () => input("^"));
document.getElementById("mod").addEventListener("click", () => input("%"));
document.getElementById("multi").addEventListener("click", () => input("*"));
document.getElementById("div").addEventListener("click", () => input("/"));
document.getElementById("add").addEventListener("click", () => input("+"));
document.getElementById("dot").addEventListener("click", () => input("."));
document.getElementById("min").addEventListener("click", () => input("-"));
document.getElementById("n0").addEventListener("click", () => input("0"));
document.getElementById("n1").addEventListener("click", () => input("1"));
document.getElementById("n2").addEventListener("click", () => input("2"));
document.getElementById("n3").addEventListener("click", () => input("3"));
document.getElementById("n4").addEventListener("click", () => input("4"));
document.getElementById("n5").addEventListener("click", () => input("5"));
document.getElementById("n6").addEventListener("click", () => input("6"));
document.getElementById("n7").addEventListener("click", () => input("7"));
document.getElementById("n8").addEventListener("click", () => input("8"));
document.getElementById("n9").addEventListener("click", () => input("9"));
