import { createSlice } from "@reduxjs/toolkit";

export const taskCounterSlice = createSlice({
    name: "tasksCount",
    initialState: {
        count: 0,
    },
    reducers: {
        setTasksCount(state, action) {
            state.count = action.payload;
        },
    },
});

export const { setTasksCount } = taskCounterSlice.actions;

export default taskCounterSlice.reducer;