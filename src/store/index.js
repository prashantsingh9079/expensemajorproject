import { createSlice,configureStore } from "@reduxjs/toolkit";

const authInitialState={isLogin:false,token:null}

const authSlice = createSlice({
    name:'auth',
    initialState:authInitialState,
    reducers:{
        login(state,action)
        {
            state.isLogin=true
            state.token= action.payload.token
            console.log("inside redux store ",action.payload.token)
        },
        logout(state)
        {
            state.isLogin=false;
            state.token=null;
            console.log("inside redux store to logout",state.token)
        }
    }
})


const expenseInitailState = {items:[]}

const expenseSlice = createSlice({
    name:'expense',
    initialState:expenseInitailState,
    reducers:{
        addItem(state,action)
        {
            state.items.push(action.payload.item)
            console.log(state.items)
        }
    }
})

const store = configureStore({
    reducer:{auth:authSlice.reducer, expense:expenseSlice.reducer}
})

export const authAction = authSlice.actions
export const expenseAction = expenseSlice.actions

export default store;