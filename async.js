// setTimeout(() => {
//     console.log('time over')
// },0);
// console.log('first')
// console.log('second')
// console.log('third')

// 3 states -
// Promise is a special object in js
// pending
// fulfilled
// rejected

const promise = new Promise((resolve)=>{
    resolve("value returned by Promise");
});
promise.then((val)=>{
    setTimeout(() => {
        console.log(val)
    }, 500);
});

setTimeout(() => {
    console.log('timeout 0')
}, 0);

const url = 'https://jsonplaceholder.typicode.com/users';

const userData = fetch(url)

userData.then(data=>data.json().then(humanReadableData=>{
    console.log("🚀 ~ userData.then ~ data:", data)
    console.log("🚀 ~ userData.then ~ humanReadableData:", humanReadableData)
}))