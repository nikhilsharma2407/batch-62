const initialState = {
  count: 0,
  value: "abcd",
};

const ACTION_ENUMS = {
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT",
};

// ActionCreators - fn which returns an action

export const incrementActionCreator = (payload) => {
  return async (dispatch) => {
    const value = await new Promise((res) => setTimeout(() => res('Promise Resolved'), 5000));
    dispatch({ type: ACTION_ENUMS.INCREMENT, payload });
  };
};

export const decrementActionCreator = (payload) => {
  return { type: ACTION_ENUMS.DECREMENT, payload };
};

// dispatch({ type: ACTION_ENUMS.INCREMENT, payload: 1 });

// action - { type, payload }
export const countReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_ENUMS.INCREMENT:
      return { ...state, count: state.count + payload };
    case ACTION_ENUMS.DECREMENT:
      return { ...state, count: state.count - payload };
    default:
      return state;
  }
};
