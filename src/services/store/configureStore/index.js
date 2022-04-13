import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import allreducers from '../../reducers';

const persistConfig = {
    key: 'root',
    storage,
  }

  const persistedReducer = persistReducer(persistConfig, allreducers)

  const exportStore = () => {
    let store = createStore(persistedReducer)
    let persistor = persistStore(store)
    return { store, persistor }
  }
  export default exportStore;