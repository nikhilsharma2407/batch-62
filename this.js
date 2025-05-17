
const arrowFnOutside = ()=>{
    console.log("🚀 ~ arrowFnOutside ~ arrowFnOutside:",this)
}

function funcDecalaration(){    
    console.log("🚀 ~ funcDecalaration ~ this:", this)
    
    function fnInsideFn (){
        console.log("🚀 ~ fnInsideFn ~ fnInsideFn:", this)
    }
    
    const arrowFnInsideFn = ()=>{
        console.log("🚀 ~ arrowFnInsideFn ~ arrowFnInsideFn:", this)
    }

    fnInsideFn()
    arrowFnInsideFn();
}


// arrowFnOutside()
// funcDecalaration()

// const obj = {
//     name:'Nikhil',
//     fn:funcDecalaration,
//     arrowFn:arrowFnOutside
// }

// obj.fn()
// obj.arrowFn()


class Test {
    constructor(name) {
        this.name = name;
    }
    arrowFn = ()=>{
        console.log(this.name)
    }
    
    fnMethod() {
        const arrowFn = ()=>{
            console.log('arrowFn',this.name)
        }
        console.log(this.name);

        arrowFn()
    }


};

const test = new Test("abcd");
// test.arrowFn()
// test.fnMethod()


const obj = {
    name:'Nikhil',
    fnMethod: test.fnMethod,
    arrowFn:test.arrowFn
}

obj.fnMethod()
obj.arrowFn()