var number = 1;
var a = [1, 2, 3, 4, 5, 6];
var b;
var c = "hello";
let d = null;
const dataCheck = true;
console.log(`The variable ${number} is of type ${typeof number}`);
console.log(`The variable a is of type ${typeof a}`);
console.log(`The variable b is of type ${typeof b}`);
console.log(`The variable c is of type ${typeof c}`);
//JavaScript return "object" for typeof null instead of "null"
if (d == null) {
    console.log("The variable d is of type null");
}
console.log(`The variable c is of type ${typeof dataCheck}`);