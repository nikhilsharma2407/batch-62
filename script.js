// datatypes

// number
// strings- ''
// bool
// functions - fn declarations are also hoisted
// undefined 
// null -> not a type
// NaN


// objects 
// arrays
// maps
// datetime

// Promises

// creating variables
// var - function scoped, hoisted
// let - block scoped
// const - block scoped


var name = "Global Variable Name"


fn()

function fn() {
    // var name; // undefined
    console.log("🚀 ~ fn ~ name:", name);
    // var name = "Nikhil";
    if (true) {
        var name = "if block";
        console.log(name)
    };
    console.log("🚀 ~ fn ~ name:", name)
};


function fnCopy() {
    // let name = "Nikhil";
    console.log("🚀 ~ fnCopy ~ name:", name)
    if (true) {
        console.log("🚀 ~ fnCopy ~ name:", name)
        if (true) {
            let name = "xyz";
            console.log("🚀 ~ fnCopy ~ name:", name)
        }
        // let name = "if block";
        // console.log(name)
    };
    console.log("🚀 ~ fn ~ name:", name)
};
// fnCopy();

// fn();
// console.log("🚀 ~ fn ~ name:", name)


// // // var nonExistingVariable;
// // // console.log("🚀 ~ nonExistingVariable:", nonExistingVariable)
// // // var nonExistingVariable = 123;
// // // console.log("🚀 ~ nonExistingVariable:", nonExistingVariable)


// // function add(num1, num2){
// //     console.log("🚀 ~ add ~ num1:", num1)
// //     console.log("🚀 ~ add ~ num2:", num2)
// //     console.log("🚀 ~ add ~ num1+num1:", num1+num2)
// //     return num1+num2
// // };


// // add(1,2)
// // // add(2,3)
// // add()

// // // console.log(NaN == NaN)
// // // console.log(NaN != NaN)


// // // number
// // // strings- ''
// // // bool
// // // functions - fn declarations are also hoisted
// // // undefined 
// // // null -> not a type
// // // NaN

// // let num = 123.132
// // console.log("🚀 ~ num:", num)

// // let amount = 10_000_000
// // // console.log("🚀 ~ amount:", amount.toLocaleString("en-in"));

// // let str = "hello world";

// // str.toUpperCase()
// // console.log("🚀 ~ str:", str[100])
// // str.toLowerCase()
// // console.log("🚀 ~ str:", str)

// // // template string

// // let loggedInUserName = 'test';
// // let visitorNum = 100
// // // console.log("Welcome " + loggedInUserName + " congrats you are our "+ visitorNum + " vistor")
// // console.log(`Welcome ${loggedInUserName} congrats you are our ${1+2} vistor`)

// // loggedInUserName = ""


// // let loggedInUserDetails = {
// //     name:"test",
// //     username:"abcd",
// //     loginTime: "8pm"
// // }

// // loggedInUserDetails = null


// // isLoggedIn = true;
// // isAdmin = false;

// // // falsy -> 0, "" (empty string), NaN, undefined, null, 
// // // truthy -> anything that is not falsy is truthy
// // // truthy  - empty array - []
// // // truthy-  empty object - {}


// if ([]){
//     console.log('truthy')
// } else {
//     console.log('falsy')
// }

// // equality operator ==, === (strict equality check)

// // console.log('1'== 1);
// // console.log('1'+1) // 11
// // console.log(1+ null) // 
// console.log(1/0) // 
// console.log(-1/0) //
// console.log(1+2+3+'4');

// // Arrow fn
// // Arrays 
// // Objects //primitve vs ref, shallow deep copy
// // ES6 classes
// // IIFE
// // setTimeout
// // Promises


// // function add(num1, num2){
// //     return num1+num2
// // };

// // const add = (num1,num2)=>{
// //     return num1+num2
// // }

// const add = (num1,num2)=>num1+num2


// const arrowFn = ()=>{
//     console.log('no params arrow fn')
// };
// arrowFn();

// // const arr = [1,2,"3",null, ()=>'hello',{value:123},[1,2,3]];

// const arr = [1,2,3,4,5];
// // arr[3] = 999

// // for (let i=0; i<arr.length;i++){
// //     console.log(arr[i])
// // }
// // const logArrayValue = (val)=>console.log(val)
// // arr.forEach(logArrayValue)
// // arr.forEach((val)=>console.log(val));
// arr.forEach((val,index)=>console.log(`The value at index ${index} is ${val}`));

// const squaredNums = arr.map((val)=>val*val)
// // console.log("🚀 ~ arr:", arr)
// // console.log("🚀 ~ squaredNums:", squaredNums);

// const evenNums = arr.filter((val)=>!(val%2))
// // 1%2 = 1
// // 2%2 = 0
// // 3%2 = 1

// console.log("🚀 ~ evenNums:", evenNums)



// const arrVal = [1,2,null, 3,4,undefined, NaN,5];
// console.log(arrVal.filter(Boolean));

// const squredEvenNums = arr.filter(val=>!(val%2)).map(val=>val**2);
// // const squredEvenNums1 = arr.map(val=>val**2).filter(val=>!(val%2));
// console.log("🚀 ~ squredEvenNums:", squredEvenNums);

// const sum = arr.reduce((prevValue, currValue, index)=>{
//     console.log("🚀 ~ sum ~ prevValue:", prevValue);
//     console.log("🚀 ~ sum ~ currValue:", currValue)
//     console.log("🚀 ~ sum ~ index:", index)

//     console.log("🚀 ~ sum ~ return Value-> prevValue+ currValue:", prevValue+ currValue)
//     console.log()
//     return prevValue+ currValue;
// })

// arr.reverse();

// console.log(arr)

// rest operator, spread operator -> ...



const sum2 = (num1, num2) => num1 + num2;
const sum3 = (num1, num2, num3) => num1 + num2 + num3;

const sumN = (num1, num2, ...params) => {
    console.log("🚀 ~ params:", params)
}


sumN(1)
sumN(1, 2)
sumN(1, 2, 3, 4, 5)
sumN(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);


const arr = [1, 2, 3, 4, 5];

// const [num1, num2, ...rest] = arr;
const [num1, num2, , elem] = arr;
console.log("🚀 ~ num1:", num1)
console.log("🚀 ~ num2:", num2)
console.log("🚀 ~ elem:", elem)

const [, , num, ,] = arr;
console.log("🚀 ~ num:", num)

const response = [
    {
        username: "abcd"
    }
]

// const user = response[0]

// pass by value - primitives, num, str, bool, null, undefined, NaN
// pass by ref - fn, objects/Array

const add10 = (num1)=>num1 += 10;
const add10ToArray = arr=>arr.push(10);

console.log("🚀 ~ arr:", arr)
add10ToArray(arr)
console.log("🚀 ~ arr:", arr)


let number123 = 1;

add10(number123)
console.log("🚀 ~ number123:", number123)


const arr2 = [...arr];
// const arr2 = [ 1,2,3,4,5 ]; ...arr => 1,2,3,4,5

arr2.push(1234);
console.log("🚀 ~ arr:", arr)
console.log("🚀 ~ arr2:", arr2)

let xyz = num1;

xyz+=10;

const newArr = [1, [2,3], [4,5]];

const shallowCopy = [...newArr];

shallowCopy[0] = 123;

shallowCopy[1][0] = 999;
console.log("🚀 ~ newArr:", newArr)
console.log("🚀 ~ shallowCopy:", shallowCopy)

const emp1 = {
    name:"emp1",
    empID:"E101",
    dept: {
        deptId:"D101",
        deptName:"dept1"
    }
};

const emp2  = {...emp1, dept:{...emp1.dept} } 

emp2.name = "emp2";

emp2.dept.deptId = 'D102';

console.log("🚀 ~ emp1:", emp1)
console.log("🚀 ~ emp2:", emp2);

console.log("🚀 ~ Object.entries(emp1):", Object.entries(emp1));
console.log("🚀 ~ typeof emp1.name:", typeof emp1.name);
console.log("🚀 ~ typeof emp1.dept:", typeof emp1.dept);
Object.entries(emp1).forEach(([key,val])=>console.log(key, val));

// lodash.clonedeep

