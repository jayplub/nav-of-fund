var http = require('http');
const cheerio = require('cheerio')
const fund = ['B-INCOMESSF', 'BM70SSF', 'BEQSSF', 'B-FUTURESSF']

let value = process.argv.slice(2)[0].trim();
var index = fund.indexOf(value) + 2

var options = {
    host: 'codequiz.azurewebsites.net',
    path: '/',
    headers: { Cookie: 'hasCookie=true' }
}
var request = http.request(options, function (res) {
    var data = '';
    res.on('data', function (chunk) {
        data += chunk;
    });


    res.on('end', function () {
        let $ = cheerio.load(data)
        let res = $('body > table > tbody > tr:nth-child(' + index + ') > td:nth-child(2)').text()
        res != '' ? console.log(res) : console.log("NOT FOUND FUND NAME")
    });
});
request.on('error', function (e) {
    console.log(e.message);
});
request.end();