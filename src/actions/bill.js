import api from "./api";

export const ACTION_TYPES = {
    FETCH_Bill_BY_TYPE: 'FETCH_Bill_BY_TYPE'
}

export const fetchData = (type) => dispatch => {
    api.Bill().fetchData(type)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_Bill_BY_TYPE,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

