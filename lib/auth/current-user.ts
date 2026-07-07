export type CurrentUser = {
  id: string;
  email: string;
  name: string | null;
  organizationId: string | null;
  roles: string[];
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  if (process.env.NODE_ENV === "test") {
    return null;
  }

  // Auth provider not integrated yet. Return null until a real session
  // strategy is wired (ERP identity/session token verification).
  return null;
}

export async function requireCurrentUser(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Authentication required.");
  }

  return user;
}
