import { configureStore } from "@reduxjs/toolkit";
import taskCounterSlice from "./reducers/counterSlice";
import loaderSlice from "./reducers/loader";

const store = configureStore({
    reducer: {
        tasksCount: taskCounterSlice,
        loader: loaderSlice,
    },
});

export { store };