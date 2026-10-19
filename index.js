document.getElementById("equals").addEventListener("click", () => {
    const currentValue = document.getElementById("textarea").value;
    let result = currentValue.trimStart("= ");
    if (!currentValue.startsWith("=")) {
        result = eval(result);
    }
    document.getElementById("textarea").value += `\n= ${result}`;
})