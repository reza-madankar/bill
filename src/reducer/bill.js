import { ACTION_TYPES } from "../actions/bill";

const initialState = {
    list: []
}

export const billData = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_Bill_BY_TYPE:
            return {
                ...state,
                list: [...action.payload]
            }
        default:
            return state
    }
}