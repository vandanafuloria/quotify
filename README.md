# useReducer 
```js
const [state, dispatch] = useReducer(reducer, initialState);

```
* A pure function means:

* Same input → Same output, No dependency on outside world, 
* Reducers must be synchronous. (no async function inside reducer )
* Immutable update 
### “Reducers must be pure functions without side effects or async logic. They should only compute and return the next state immutably based on the current state and action.”

# Parts of Use Reducer 
1. Initial state 
2. Reducer Function  - pure function , no async , no mutation , Reducer never fetches.
Reducer only decides state.
3. useReducer hook 
4. Dispatch - tell reducer what happend (type is mandatory )

# Flow

1. User does something (click, page load)
        ↓
2. dispatch(action) is called
        ↓
3. reducer receives (state, action)
        ↓
4. reducer returns NEW state
        ↓
5. React re-renders UI
