document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("country");

    fetch("https://restcountries.com/v3.1/all").then(res => {
        return res.json();
    }).then(data => {
        let output = "";
        data.forEach(country => {
            console.log(country.name.common);
            output += `<option value="${country.name.common}">${country.name.common}</option>`;
        });
        select.innerHTML = output;
    })
})