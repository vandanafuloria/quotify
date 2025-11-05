# Lets learn redux 
1. create a redux store by - configure a store 
2. access that store to the react by provider - wrap it 
3. create the slice for the store in differnt file
4. Creating a slice requires a string name to identify the slice, an initial state value, and one or more reducer functions to define how the state can be updated. Once a slice is created, we can export the generated Redux action creators and the reducer function for the whole slice.

# Summary
Create a Redux store with configureStore
configureStore accepts a reducer function as a named argument
configureStore automatically sets up the store with good default settings

## Provide the Redux store to the React application components
Put a React-Redux <Provider> component around your <App />
Pass the Redux store as <Provider store={store}>

## Create a Redux "slice" reducer with createSlice
Call createSlice with a string name, an initial state, and named reducer functions
Reducer functions may "mutate" the state using Immer
Export the generated slice reducer and action creators

## Use the React-Redux useSelector/useDispatch hooks in React components
Read data from the store with the useSelector hook
Get the dispatch function with the useDispatch hook, and dispatch actions as needed