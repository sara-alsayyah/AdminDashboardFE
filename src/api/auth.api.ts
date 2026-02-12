export const login = async (username: string, password: string) => {
  return new Promise<{ token: string }>((resolve, reject) => {
    setTimeout(() => {
      if (username === "admin" && password === "123456") {
        resolve({ token: "fake-jwt-token" });
      } else {
        reject({ response: { data: { error: "Invalid credentials" } } });
      }
    }, 500); // simulate network
  });
};
