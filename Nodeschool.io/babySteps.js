var inputArr = process.argv;
var total = 0;
for(var i = 2; i < inputArr.length; i++){
var input = Number(process.argv[i]);
total = total + input;
}
console.log(total);

