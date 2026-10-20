const textarea = document.getElementById("in");
const output = document.getElementById("out");
let clearNext = false;
document.getElementById("eq").addEventListener("click", () => {
    let currentValue = textarea.value;
    currentValue = currentValue.replaceAll("^", "**");
    const result = eval(currentValue);
    output.innerText += `\n= ${result}`;
    clearNext = true;
})

function input(str) {
    if (clearNext) {
        output.innerText = "";
        textarea.value = "";
        clearNext = false;
    }
    textarea.value = textarea.value += str;
}

textarea.addEventListener("focus", () => {
    if (clearNext) {
        output.innerText = "";
        textarea.value = "";
        clearNext = false;
    }
})

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
