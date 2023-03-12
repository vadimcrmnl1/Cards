export const setLoggedInAC = (isLoggedIn: boolean) => ({type: 'auth/SET-IS-LOGGED-IN',  isLoggedIn} as const)
export const setIsSignedUpAC = (isSignedUp: boolean) => ({type: 'auth/SET-IS-SIGNED-UP', isSignedUp} as const)
export const setMailWasSentAC = (mailWasSent: boolean) => ({type: 'auth/SET-MAIL-WAS-SENT', mailWasSent} as const)
export const setIsPasswordChangedAC = (isPasswordChanged: boolean) => ({
    type: 'auth/SET-IS-PASSWORD-CHANGED',
    isPasswordChanged
} as const)

