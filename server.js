const express = require("express");
const app = express();

app.use(express.static('public'));

app.post("/", (req, res) => {
    //console.log("POST received");

    var text;
    req.on('data', function(chunk) {
        //console.log("data received:");
        text = chunk.toString();
        console.log("received", text);
    });

    req.on('end', function() {
        //console.log("end");
        res.send(text);
        //console.log("data sent:");
        console.log("sent", text);
    });

    req.on('error', (e) => {
        console.log("error", e);
    });
});

app.listen(9000, "localhost", () => {
  console.log("Server is running on port 9000");
});
