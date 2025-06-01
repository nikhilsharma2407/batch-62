const namePattern = /^[A-Z][a-z]+$/;
const usernamePattern = /^[a-z\d]+$/;
const emailPattern = /^\w+@[a-z]+\.[a-z]+$/;



export const initialState = {
  name: { value: "", isValid: false },
  email: { value: "", isValid: false },
  username: { value: "", isValid: false },
  password: {
    value: "",
    validation: {
      hasLowerCase: false,
      hasUpperCase: false,
      hasDigit: false,
      hasSpecialSymbol: false,
      meetsMinLengthReq: false,
    },
  },
};



// action - { type, payload }
export const signupReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case "name":
            const copyState = {...state, name:{value:payload, isValid:namePattern.test(payload)}};
            return copyState
        case "email":
            return {...state, email:{value:payload, isValid:emailPattern.test(payload)}};
        case "username":
            return {...state, username:{value:payload, isValid:usernamePattern.test(payload)}};
        case "password":
            return {
              ...state,
              password: {
                value: payload,
                validation: {
                  hasLowerCase: /[a-z]/.test(payload),
                  hasUpperCase: /[A-Z]/.test(payload),
                  hasDigit: /\d/.test(payload),
                  hasSpecialSymbol: /[\W_]/.test(payload),
                  meetsMinLengthReq: payload.length>=8,
                },
              },
            };
        default:
            return state
    }

};

// let obj = {val:123, id:1}

// // obj.val = 100;
// // immutable upadte = 

// const newObj = {...obj, val:100};
// obj = newObj;