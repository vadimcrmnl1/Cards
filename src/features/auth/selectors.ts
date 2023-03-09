import {AppRootStateType} from "../../app/store";

export const selectIsSignedUp = (state: AppRootStateType) => state.auth.isSignedUp