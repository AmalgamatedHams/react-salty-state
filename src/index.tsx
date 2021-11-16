import {createStore, createHook} from 'react-sweet-state'

/**
 * The generic store
 */
const Store = createStore({
  initialState: {},
  actions: {
    set: (scope, obj) => ({getState, setState}) => {
      // Get the object for this scope, if it exists
      const prev = getState()[scope] || {};

      // Merge with obj
      const merged = {...prev, ...obj};

      // Set value with merged obj
      setState({[scope]: merged});
    }
  }
});


const useSaltyInternal = createHook(Store);


export function useSalty(scope) {
  const [state, actions] = useSaltyInternal();

  const set = (obj) => actions.set(scope, obj)

  console.log(state);
  return [state[scope] || {}, set];
}

export function useSaltyRead(scope){
  const[state] = useSalty(scope);
  return state;
}

export function useSaltyWrite(scope){
  const [,set] = useSalty(scope);
  return set;
}
