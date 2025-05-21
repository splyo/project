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

function CheckExist(nev) {
    return fetch(`http://localhost:3000/contents?nev=${nev}`)
        .then(response => response.headers.get("content-length"))
}

async function Save() {
    let data = {}
    data.nev = document.getElementById("u_nev").value
    data.szam = document.getElementById("u_text").value

    let exist = 0
    let contentLength = await CheckExist(data.nev)
    if (contentLength != 2) {
        exist = 1
    }

    switch (exist) {
        case 0:
            document.getElementById("status").innerHTML = ""
            xhr.open("POST", "http://localhost:3000/contents", true)
            xhr.send(JSON.stringify(data))
            break;

        case 1:
            document.getElementById("status").innerHTML = "<h3>HIBA! A név már létezik az adatbázisban!</h3>"
            break;
    }

}