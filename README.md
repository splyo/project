A működéshez `json-server`-rel futtatni kell a `db.json` file-t a 3000-es porton 

json-server telepítése windows-ra:

1. lépés: a node-ot fel telepíteni:
   https://nodejs.org/en
2. lépés: telepíteni a json-server csomagot az alábbi parancssal:
  `npm install -g json-server`

a szerver futtatásához használja az alábbi parancsot:
  `json-server --watch db.json`
