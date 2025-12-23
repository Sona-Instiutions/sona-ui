export function getLoggedInUser() {
  if (typeof window === "undefined") return null;

  const jwt = localStorage.getItem("strapi_jwt");
  const user = localStorage.getItem("strapi_user");

  // ✅ DEV FALLBACK (IMPORTANT)
  if (!jwt || !user) {
    return {
      username: "Admin",
      email: "admin@demo.com",
      role: "admin",
      __dev: true,
    };
  }

  return JSON.parse(user);
}

export function isLoggedIn() {
  if (typeof window === "undefined") return false;

  // ✅ DEV MODE: always allow reply
  return true;
}
