import { combineReducers } from "redux";
import { templatesReducer } from "./templates/templates.reducer";
import { deploymentsReducer } from "./deployments/deployments.reducer";

export const rootReducer = combineReducers({
  templates: templatesReducer,
  deployments: deploymentsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
