import {combineReducers} from "redux"
import uriReducer from "./reducer"

const rootReducer = combineReducers({
    uri:uriReducer,
})

export default rootReducer