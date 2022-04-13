import { createSlice} from '@reduxjs/toolkit'

const storeData = createSlice({
    name:'mapData',
    initialState:{
        mapArray:[] 
    },
    reducers:{
        updateArray(state,action){
            state.mapArray.push(action.dataArray)
        }
    }
})

export default storeData;