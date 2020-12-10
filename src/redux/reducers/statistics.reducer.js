const initialState = {
    statistic_point: {},
}


let statistic_point = (state = initialState, action) => {


    switch (action.type) {

        case ('GET_POINT_STATISTIC') : {
            return {
                statistic_point
            }
        }
        case ('SET_POINT_STATISTIC') : {
            return { ...statistic_point, ...action.payload }
        }

        default: return state;

    }
}

export default statistic_point
