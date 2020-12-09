    var express = require("express");
    var app = express();
    var PORT = process.env.PORT || 3000
    var path = require("path");
    var formidable = require('formidable');
    var login = false;
    var tab = [
        { login: 'ttt', password: 'ppp', wiek: '18', uczen: 'on', gender: 'm' },
        { login: 'sss', password: 'bbb', wiek: '16', uczen: 'on', gender: 'k' },
        { login: 'www', password: 'hhh', wiek: '11', uczen: 'on', gender: 'm' }
    ]
    
  
    app.get("/", function (req, res) {
        if (login == false) {
            res.sendFile(path.join(__dirname + "/static/index.html"))
            console.log(__dirname)
        }
        else {
            res.sendFile(path.join(__dirname + "/static/index1.html"))
            console.log(__dirname)
        }
    })
    
    app.get("/register", function (req, res) {
        if (login == false) {
            res.sendFile(path.join(__dirname + "/static/register.html"))
            console.log(__dirname)
        }
        else {
            res.sendFile(path.join(__dirname + "/static/register1.html"))
            console.log(__dirname)
        }
    })
    
    app.get("/login", function (req, res) {
        if (login == false) {
            res.sendFile(path.join(__dirname + "/static/login.html"))
            console.log(__dirname)
        }
        else {
            res.sendFile(path.join(__dirname + "/static/login1.html"))
            console.log(__dirname)
        }
        console.log(__dirname);
    })
    
    var jebac = false;

    app.post("/register", function (req, res) {
        let form = formidable({});
        form.parse(req, function (err, dane1) {
            res.setHeader('content-type', 'application/json');
            for (var i = 0; i < tab.length; i++) {
                if (dane1.login == tab[i].login) {
                    jebac = true;
                    break
                }
            }
            console.log(dane1);
            if (jebac) {
                res.send("Taki login już istnieje")
            }
            else {
                tab.push(dane1)
                console.log(tab);
                res.send("Witaj " + dane1.login + ", właśnie się zarejestrowałeś")
            }
        });
    });
    
    app.post("/login", function (req, res) {
        let form = formidable({});
        form.parse(req, function (err, dane) {
            console.log(dane.login);
            console.log(dane.password);
            res.setHeader('content-type', 'application/json');
            for (var i = 0; i < tab.length; i++) {
                if (dane.login == tab[i].login && dane.password == tab[i].password) {
                    login = true;
                    console.log('zalogowano');
                    res.redirect("/admin");
                }
            }
        });
    });
    
    
    app.get("/logout", function (req, res) {
        res.sendFile(path.join(__dirname + "/static/index.html"))
        console.log(__dirname)
        login = false;
        console.log(login)
    })
    
    
    app.get("/admin", function (req, res) {
        if (login == false) {
            res.sendFile(path.join(__dirname + "/static/admin.html"))
            console.log(__dirname)
        }
        else {
            res.sendFile(path.join(__dirname + "/static/admin1.html"))
            console.log(__dirname)
        }
    })

    var a = 0;
    app.get("/show", function (req, res) {
        var show = "<table style=\"border:1px solid black\">"
        for (let i=0;i<tab.length;i++){
            show += "<tr>"
            show += "<td>id: " + i + "</td>"
            show += "<td>user: " + tab[i].login + " - " + tab[i].password + "</td>"
            show += "<td>uczen: " + tab[i].uczen + "</td>"
            show += "<td>wiek: " + tab[i].wiek + "</td>"
            show += "<td>płeć: " + tab[i].gender + "</td>"
            show += "</tr>"
        }
        show += "</table>"
        res.send('<html lang="en"><head><title>sort rosnąco</title><style>body{background-color: grey}table{top: px ;position: absolute;} a{margin:20px ;color: white;} td{border:2px solid black}</style></head><body><a href="/sort">sort</a><a href="/gender">gender</a><a href="/show">show</a><br>' + show + '</body></html>')
    })

    app.get("/gender", function (req, res) {
        var Mezczyzna = "<table style=\"border:1px solid black\" id='xd'>"
        var Kobieta = "<table style=\"border:1px solid black\" id='xd1'>"
        for (let i=0;i<tab.length;i++){
            if(tab[i].gender=="k"){
                Kobieta += "<tr>"
                Kobieta += "<td>id: " + i + "</td>"
                Kobieta += "<td>płeć: " + tab[i].gender + "</td>"
                Kobieta += "</tr>"
            }
            else{
                Mezczyzna += "<tr>"
                Mezczyzna += "<td>id: " + i + "</td>"
                Mezczyzna += "<td>płeć: " + tab[i].gender + "</td>"
                Mezczyzna += "</tr>"
            }
        }
        Mezczyzna += "</table>"
        Kobieta += "</table>"
        res.send('<html lang="en"><head><title>show</title><style>body{background-color: grey} #xd{top: 100px; position: absolute} #xd1{left: 200px ;top: 100px ;position: absolute} a{margin:20px ;color: white;} td{border:2px solid black}</style></head><body><a href="/sort">sort</a><a href="/gender">gender</a><a href="/show">show</a><br>' + Mezczyzna + Kobieta + '</body></html>')
    })

    app.get("/sort", function (req, res) {
        var sort = "<table style=\"border:1px solid black\">"
        tab.sort(function(a,b){
            return parseFloat(a.wiek) - parseFloat(b.wiek);
        });
        for (let i=0;i<tab.length;i++){
            sort += "<tr>"
            sort += "<td>id: " + i + "</td>"
            sort += "<td>user: " + tab[i].login + " - " + tab[i].password + "</td>"
            sort += "<td>wiek: " + tab[i].wiek + "</td>"
            sort += "</tr>"
        }
        sort += "</table>"
        res.send('<html lang="en"><head><title>sort rosnąco</title><style>body{background-color: grey}table{top: px ;position: absolute;} a{margin:20px ;color: white;} td{border:2px solid black}</style></head><body><a href="/sort">sort</a><a href="/gender">gender</a><a href="/show">show</a><br>' + sort + '</body></html>')

    })

    app.listen(PORT, function () {
        console.log("start serwera na porcie " + PORT)
    })