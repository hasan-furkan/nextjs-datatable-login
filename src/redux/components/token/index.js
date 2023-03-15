import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   token: {
       access: false,
       refresh: false
   }
}


export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
    },

})

// Action creators are generated for each case reducer function
export const { setToken } = tokenSlice.actions

export default tokenSlice.reducer
