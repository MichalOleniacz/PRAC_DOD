import http from "./httpService";

const url = "https://still-waters-04260.herokuapp.com";

export async function loginUser(req) {
  return await http.post(`${url}/auth`, req);
}

export async function loginCookie(req) {
  return await http.post(
    `${url}/auth`,
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "https://still-waters-04260.herokuapp.com",
      },
    }
  );
}

export async function registerUser(user) {
  return await http.post(`${url}/reg`, user);
}

export async function getAllLogs() {
  return await http.get(`${url}/logs`);
}
