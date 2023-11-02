import {combineReducers} from "redux"
import allReducer from "./reducer"

const rootReducer = combineReducers({
    reducer:allReducer,
})

export default rootReducer