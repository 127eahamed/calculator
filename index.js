const inputEl = document.getElementById("in");
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
    }
}

function calc() {
    const ogValue = inputEl.innerHTML;
    let currentValue = ogValue.replaceAll("^", "**");
    let result = "ERROR";
    const lettersRegex = /[a-zA-Z]/;
    if (!lettersRegex.test(currentValue)) {
        try {
            result = eval(currentValue);
        } catch (err) {
            console.error("Invalid input:", err);
        }
    }
    output.innerText = `= ${result}`;
    clearNext = true;
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
    }
}

function input(str) {
    clearIfNext();
    inputEl.innerHTML = inputEl.innerHTML += str;
}

function clear() {
    output.innerText = "";
    inputEl.innerHTML = "";
    clearNext = false;
}

function backspace() {
    clearIfNext();
    inputEl.innerHTML = inputEl.innerHTML.substring(0, inputEl.innerHTML.length - 1);
}

function historyUp() {
    if (historyIndex > 0) {
        historyIndex--;
    }
    clear();
    inputEl.innerHTML = history[historyIndex];
}

document.getElementById("eq").addEventListener("click", calc);
document.getElementById("clear").addEventListener("click", clear);
document.getElementById("del").addEventListener("click", backspace);

window.addEventListener("keyup", event => {
    const inputChars = "1234567890()^%*x/+-. ";
    if (inputChars.includes(event.key)) {
        input(event.key.replace("x", "*"));
    } else if (event.key === "Enter" || event.key === "=") {
        calc();
    } else if (event.key === "Backspace") {
        backspace();
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
