const user =  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    banks:[
      "axis",
      "HDFC",
      "ICICI"
    ],
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  };



const userCopy = {...user};

user.name;

const key = 'name';

user.key
console.log("🚀 ~ user.key:", user.key)
user[key]
console.log("🚀 ~ user[key]:", user[key])


// Object.keys(user).forEach(key=>console.log(`key is ${key}`,user[key] ));
// Object.values(user).forEach(value=>console.log('value is', value))
// Object.entries(user)

// const userCopy = {...user};

const clonedeep = (obj)=>{
    if (typeof obj !=="object") return obj;
    const result = Array.isArray(obj) ? []:{} ;
    Object.entries(obj).forEach(([key,value])=>{
        if (typeof value !== "object"){
            result[key] = value
        } else {
            result[key] = clonedeep(value);
        }
    });
    return result
}

const userDeepCopy = clonedeep(user);

userCopy.address.city = "xyz";
userDeepCopy.company.name = "GFG";

userCopy.banks.push('kotak');
console.log("🚀 ~ user:", user)
console.log("🚀 ~ userCopy:",  userCopy)
console.log("🚀 ~ userDeepCopy:", userDeepCopy)
