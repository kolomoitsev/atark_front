const initialState = {
    error: {},
}


let error = (state = initialState, action) => {


    switch (action.type) {

        case ('GET_ERROR') : {
            return {
                error
            }
        }
        case ('ADD_ERROR') : {
            return {  ...error, error: action.payload }
        }

        default: return state;

    }
}

export default error
