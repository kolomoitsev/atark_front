import { combineReducers } from "redux";

import history from "./history.reducer";
import point from "./point.reducer";
import statistic_point from './statistics.reducer'
import errors from './errors.reducer'
import book from "./book.reducer";

export default combineReducers({
    history,
    point,
    statistic_point,
    errors,
    book
})
