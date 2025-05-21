let xhr = new XMLHttpRequest();

xhr.open("GET", "http://localhost:3000/contents", true)

xhr.onload = function() {
    let html = "";
    let test = JSON.parse(xhr.responseText);
    let db = test.length
    test.forEach(element => {
        html += `<table><td>${element.nev}</td><td>${element.szam}</td></table>`
    })
    document.getElementById("contacts").innerHTML = html;
}

xhr.send()


//let conts = new Array();

//conts.join(XMLHttpRequest.)