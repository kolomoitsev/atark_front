const initialState = {
    history: {},
}


let history = (state = initialState, action) => {

    switch (action.type) {

        case ('GET_HISTORY') : {
            return {
                history
            }
        }
        case ('ADD_HISTORY') : {
            return {
                ...history, ...action.payload,
            }
        }

        default: return state;

    }
}

export default history
