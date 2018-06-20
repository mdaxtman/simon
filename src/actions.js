export const COUNT_UP_ACTION = "COUNT_UP_ACTION";
export const COUNT_DOWN_ACTION = "COUNT_DOWN_ACTION";

export const countUpAction = (payload = 1) => {
    return {
        type: COUNT_UP_ACTION,
        payload
    };
};

export const countDownAction = (payload = 1) => {
    return {
        type: COUNT_DOWN_ACTION,
        payload
    };
};
