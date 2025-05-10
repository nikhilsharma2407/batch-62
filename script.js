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
        if (true){
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

const arr = [1,2,3,4,5];
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

const sum = arr.reduce((prevValue, currValue, index)=>{
    console.log("🚀 ~ sum ~ prevValue:", prevValue);
    console.log("🚀 ~ sum ~ currValue:", currValue)
    console.log("🚀 ~ sum ~ index:", index)

    console.log("🚀 ~ sum ~ return Value-> prevValue+ currValue:", prevValue+ currValue)
    console.log()
    return prevValue+ currValue;
})

arr.reverse();

console.log(arr)
