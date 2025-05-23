let xhr = new XMLHttpRequest();

let url = "http://localhost:3000/contacts"
xhr.open("GET", url, true)

xhr.onload = function() {
    let html = "";
    let test = JSON.parse(xhr.responseText);
    test.forEach(element => {
        html += `<table>
        <td class="contacts">${element.nev}</td>
        <td class="contacts">${element.szam}</td>
        <td class="button-cell contacts" style="width: 180px"><button class="table-btn">✏️</button><button class="table-btn" onclick="Delete('${element.id}')">🗑️</button></td>
        </table>`
    })
    document.getElementById("contacts").innerHTML = html;
}

xhr.send()

function CheckExist(nev) {
    return fetch(`${url}?nev=${nev}`)
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
            xhr.open("POST", url, true)
            xhr.send(JSON.stringify(data))
            break;

        case 1:
            document.getElementById("status").innerHTML = "<h3>HIBA! A név már létezik az adatbázisban!</h3>"
            break;
    }

}

function Delete(id) {
    xhr.open("DELETE", `${url}/${id}`, true)
    xhr.send(null);
}