const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
console.log("testing");

app.get('', (rep, res) => {
res.send("hola");
});

app.listen(port, () => {
 console.log("El servidor está inicializado en el puerto " + port);
});
