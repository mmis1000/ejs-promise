var ejs = require("../../");
var fs = require("fs")
var path = require("path");

var templeteText = fs.readFileSync("./test.ejs", 'utf-8')

var templete = ejs.compile(templeteText, {
    compileDebug: true,
    filename: path.resolve(__dirname, './test.ejs')
});

var resultP = templete({
    wait: function (x) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve('ya');
            }, x)
        })
    }
});

resultP.outputStream.on('end', function () {
    resultP.outputStream.unpipe(process.stdout);
    process.exit();
}).pipe(process.stdout);

resultP.then(function (res) {
    // body...
}, function (err) {
    console.log(err.message || err.stack || err.toString)
})