export const authConfig = {
  sessionCookieName: "hacien_session",
  loginRoute: "/login",
  signupRoute: "/signup",
  workspaceRoute: "/access",
  // Mechanics gate only: while false, loginCustomer refuses sign-in because no
  // credential verification exists behind it yet (no ERP-backed credential
  // check exists behind it). Public posture copy follows the request-access flow
  // (/signup) and does not depend on this flag.
  isAuthReady: false,
} as const;
