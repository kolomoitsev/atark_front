const initialState = {
    transport : {},
    category: {},
    tariff: {},
    user: {},
    date: {},
}


let book = (state = initialState, action) => {

    switch (action.type) {

        case ('GET_BOOK_DATA') : {
            return {
                state
            }
        }
        case ('ADD_BOOK_TRANSPORT') : {
            return {
                ...state, transport: action.payload,
            }
        }
        case ('ADD_BOOK_CATEGORY') : {
            return {
                ...state, category: action.payload,
            }
        }
        case ('ADD_BOOK_TARIFF') : {
            return {
                ...state, tariff: action.payload,
            }
        }
        case ('ADD_BOOK_USER') : {
            return {
                ...state, user: action.payload,
            }
        }
        case ('ADD_BOOK_DATE') : {
            return {
                ...state, date: action.payload,
            }
        }

        default: return state;

    }
}

export default book
