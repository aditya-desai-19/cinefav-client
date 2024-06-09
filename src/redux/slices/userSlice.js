import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {}
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signIn: (state, action) => {
            state.user = action.payload
        },
        signOut: (state) => {
            state.user = {}
        }
    },
});

export const { signIn, signOut } = userSlice.actions;

export default userSlice.reducer;
