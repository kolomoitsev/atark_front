const initialState = {
    point: {},
}


let point = (state = initialState, action) => {


    switch (action.type) {

        case ('GET_POINT') : {
            return {
                point
            }
        }
        case ('ADD_POINT') : {
            return { ...point, ...action.payload }
        }

        default: return state;

    }
}

export default point
