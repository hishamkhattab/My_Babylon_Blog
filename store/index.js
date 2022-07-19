import { configureStore } from '@reduxjs/toolkit';

import BlogReducer from './postSlice';
import commentSlice from './commentSlice';

const store = configureStore({
    reducer: {
        blogs: BlogReducer,
        comments: commentSlice,
    },
    
})

export default store;
