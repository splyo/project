let xhr = new XMLHttpRequest();

let url = "http://localhost:3000/contacts"
xhr.open("GET", url, true)

let foglalt = null

xhr.onload = function() {
    let html = "";
    let test = JSON.parse(xhr.responseText);
    test.forEach(element => {
        html += `
        <tr>
        <td id="${element.id}-nev" contenteditable="false">${element.nev}</td>
        <td id="${element.id}-szam" contenteditable="false">${element.szam}</td>
        <td class="button-cell" style="width: 180px">
        <button id="${element.id}-edit" class="btn btn-secondary" onclick="Edit('${element.id}')">✏️</button>
        <button id="${element.id}-delete" class="btn btn-danger" onclick="Delete('${element.id}')">🗑️</button></td>
        </tr>
        `
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
    if (foglalt !== null && foglalt !== id) {
        return;
    }

    xhr.open("DELETE", `${url}/${id}`, true)
    xhr.send(null);
}

function Edit(id) {

    if (foglalt !== null && foglalt !== id) {
        return
    }

    const fields = ["nev", "szam"]
    const editable = document.getElementById(`${id}-nev`).contentEditable === "true";
    let change = false;

    if (change === false) {
        change = true
        if (editable) {
            let data = {}
            data.nev = document.getElementById(`${id}-nev`).innerHTML
            data.szam = document.getElementById(`${id}-szam`).innerHTML

            xhr.open("PATCH", `${url}/${id}`)
            xhr.send(JSON.stringify(data))

            foglalt = null;

        } else {
            foglalt = id;

            fields.forEach(element => {
                document.getElementById(`${id}-${element}`).contentEditable = "true";
            });
            document.getElementById(`${id}-edit`).innerHTML = "✅";
            document.getElementById(`${id}-edit`).className = "btn btn-success";
            document.getElementById(`${id}-delete`).innerHTML = "❌"
            document.getElementById(`${id}-delete`).onclick = function() {
                location.reload();
            }
        }
    }
}