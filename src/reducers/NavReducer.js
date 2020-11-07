import NavigationScreens from '../containers/NavigationScreens';

const initialState = NavigationScreens.router.getStateForAction(
  NavigationScreens.router.getActionForPathAndParams("Auth")
);
const navigationReducer = (state = initialState, action) => {
  const newState = NavigationScreens.router.getStateForAction(action, state);
  return newState || state;
};

export default navigationReducer;