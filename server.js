const express = require("express");
const app = express();

app.use(express.static('public'));

var rate = 0;
var bytes_count = 0;

function compute_rate() {
    rate = bytes_count / 1;
    bytes_count = 0;
    console.log("rate", rate);
}
setInterval(compute_rate, 1000);

app.post("/", (req, res) => {
    //console.log("POST received");

    var text;
    req.on('data', function(chunk) {
        //console.log("data received:");
        //text = chunk.toString();
        bytes_count += chunk.byteLength;
        //console.log("received", bytes_count);
    });

    req.on('end', function() {
        //console.log("end");
        var text = rate.toString();
        res.send(text);
        //console.log("sent", text);
    });

    req.on('error', (e) => {
        console.log("error", e);
    });
});

app.listen(9000, "localhost", () => {
  console.log("Server is running on port 9000");
});
