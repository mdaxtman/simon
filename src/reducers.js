import {COUNT_UP_ACTION, COUNT_DOWN_ACTION} from "./actions";

const counterReducer = (state = 0, action) => {
    if (action.type === COUNT_UP_ACTION) {
        return state + action.payload;

    } else if (action.type === COUNT_DOWN_ACTION) {
        return --state;
    }

    return state;
};

export default counterReducer;
