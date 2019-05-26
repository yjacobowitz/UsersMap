import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import * as storage from "redux-storage";
import reducer from "./reducer";
import createEngine from "redux-storage-engine-localstorage";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const engine = createEngine("my-save-key");
const localstorageMiddleware = storage.createMiddleware(engine);
const middlewares = [thunk, localstorageMiddleware];

const store = createStore(
  storage.reducer(reducer),
  composeEnhancers(applyMiddleware(...middlewares))
);
// To load the previous state we create a loader function with our prepared
// engine. The result is a function that can be used on any store object you
// have at hand :)
const load = storage.createLoader(engine);
load(store);

export default store;
