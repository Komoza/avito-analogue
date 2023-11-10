import { configureStore } from '@reduxjs/toolkit';
import appReducer from './redusers/app-reduser';

const store = configureStore({ reducer: appReducer });

export default store;
