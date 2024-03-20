
import {configureStore} from '@reduxjs/toolkit'
import appConfigReducer from './slices/appConfigSlice'
import userPostReducer from './slices/postConfigSlice'
import feedReducer from './slices/feedSlice'
export default configureStore({
reducer:{
    appConfigReducer,
    userPostReducer,
    feedReducer
}
})