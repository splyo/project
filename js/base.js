let xhr = new XMLHttpRequest();

xhr.open("GET", "http://localhost:3000/contents", true)

xhr.onload = function() {
    let html = "";
    let test = JSON.parse(xhr.responseText);
    test.forEach(element => {
        html += `<table><td>${element.nev}</td><td>${element.szam}</td></table>`
    })
    document.getElementById("contacts").innerHTML = html;
}

xhr.send()

function Save() {
    let data = {}
    data.nev = document.getElementById("u_nev").value
    data.szam = document.getElementById("u_text").value
    xhr.open("POST", "http://localhost:3000/contents", true)
    xhr.send(JSON.stringify(data))

}

//let conts = new Array();

//conts.join(XMLHttpRequest.)