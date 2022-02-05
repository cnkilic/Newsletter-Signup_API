// Link of the site in Global server 
// https://blooming-depths-93936.herokuapp.com/

const bodyParser = require("body-parser");
const express = require("express");
const {
    status
} = require("express/lib/response");
const request = require("request");
const https = require('https');
const {
    options
} = require("request");
const {
    response
} = require("express");
const apikey = "892b7cee156e5c1deda37f1a5edf5a76-us20";
const audienceId = "9a8601d80c";

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

// Local filedaki bilgileri kullanabilmemizi sağlayan kod
// Local adress olarak public dosyasını bilgisayardaki adresini direk bulan (__dirname) gibi davranan özelliğe atadık 
// Public folderındaki her file ı local pathini kullanarak da çağırabiliriz şimdi. 
app.use(express.static("public"));

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/signup.html");
});


app.post("/", function (req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us20.api.mailchimp.com/3.0/lists/" + audienceId;

    const options = {
        method: "POST",
        auth: "can1:" + apikey
    };


    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();

});


app.post("/failure", function (req, res) {

    res.redirect("/");
});


app.listen(process.env.PORT || 3000, function (req, res) {
    console.log("Server is running on port 3000");
});



// Link of the site in Global server 
// https://blooming-depths-93936.herokuapp.com/