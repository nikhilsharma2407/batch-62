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

// const promise = new Promise((resolve, reject)=>{
//     resolve("This promise is Rejected with message");
// });


// promise.then((val)=>{
//     setTimeout(() => {
//         console.log(val)
//     }, 500);
// });

// setTimeout(() => {
//     console.log('timeout 0')
// }, 0);

// const url = 'https://jsonplaceholder.typicode.com/users';

// const userData = fetch(url)

// userData.then(data=>data.json().then(humanReadableData=>{
//     console.log("🚀 ~ userData.then ~ data:", data)
//     console.log("🚀 ~ userData.then ~ humanReadableData:", humanReadableData)
// }))

// promise.catch(errMessage=>console.log(errMessage))

// async await

// console.log('first')
// console.log('second')
// console.log('third')


const promise = new Promise((resolve, reject)=>{
    setTimeout(() => {
        reject("Data from promise 123");
    }, 5000);
});

// async function fnAbcd(){

// }

// promise.then(data=>console.log(data))

const fn = async ()=>{
    try {
        console.log('first')
        const data = await promise;
        console.log("🚀 ~ fn ~ data:", data)
        console.log('second')
        console.log('third');
    } catch (error) {
        // promise.catch(errMessage=>console.log(errMessage))
        console.log('in catch block',error)
    }
};
fn();

const url = 'https://jsonplaceholder.typicode.com/users';

// const userData = fetch(url)

// userData.then(data=>data.json().then(humanReadableData=>{
//     console.log("🚀 ~ userData.then ~ data:", data)
//     console.log("🚀 ~ userData.then ~ humanReadableData:", humanReadableData)
// }))

const networkReqAsyncFn = async ()=>{
    try {
        const userData = await fetch(url);
        console.log("🚀 ~ networkReqAsyncFn ~ userData:", userData)
        const humanReadableData = await userData.json();
        console.log("🚀 ~ networkReqAsyncFn ~ humanReadableData:", humanReadableData)
        const [firstUser] = humanReadableData;
        console.log("🚀 ~ networkReqAsyncFn ~ firstUser:", firstUser)
    } catch (error) {
        console.log(error)
    }
}

// networkReqAsyncFn()

(()=>{console.log('IIFE')})()

(async ()=>{
    try {
        const userData = await fetch(url);
        console.log("🚀 ~ networkReqAsyncFn ~ userData:", userData)
        const humanReadableData = await userData.json();
        console.log("🚀 ~ networkReqAsyncFn ~ humanReadableData:", humanReadableData)
        const [firstUser] = humanReadableData;
        console.log("🚀 ~ networkReqAsyncFn ~ firstUser:", firstUser)
    } catch (error) {
        console.log(error)
    }
})()

// IIFE - Immediately Invoked Fn Expression

// Error handling;
// try {
//     null.name
// } catch(error) {
//     console.log("🚀 ~ error:", error)
// };

// console.log('abcd')
// networkReqAsyncFn();


