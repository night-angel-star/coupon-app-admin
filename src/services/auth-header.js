export default function authHeader() {

  const token = localStorage.getItem("token");

  if (token) {
    // For Spring Boot back-end
    // return { Authorization: "Bearer " + user.accessToken };

    // for Node.js Express back-end
    return { "Authorization": token };
  } else {
    return {};
  }
}
