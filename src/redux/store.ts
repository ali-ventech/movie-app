import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import searchHistoryReducer from "./slices/movieSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  searchHistory: persistReducer(persistConfig, searchHistoryReducer),
});

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
