import axios from "axios";

// const backendPortNumber = "3001";
// const serverUrl = "http://localhost:" + backendPortNumber + "/";
// const serverUrl = "http://172.20.10.3:5001/";
// const serverUrl = "http://172.16.20.84:5001/";
// const serverUrl = "http://192.168.0.118:5001/";
// const serverUrl = "http://192.168.0.6:5001/";
// const serverUrl = "http://localhost:5001/";
const serverUrl = "http://13.125.25.144:3001/";

async function get(endpoint, params = "") {
  return await axios.get(serverUrl + endpoint + "/" + params, {
    // Send jwt token in header
    headers: {
      // Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

// post method request with JSON.stringify()
async function post(endpoint, data) {
  const bodyData = JSON.stringify(data);

  return axios.post(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

async function postData(endpoint, data) {
  return axios.post(serverUrl + endpoint, data, {
    headers: {
      "Content-Type": "multipart/form-data; boundary=myBoundary",
      // Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

// put method request with JSON.stringify()
async function put(endpoint, data) {
  const bodyData = JSON.stringify(data);

  return axios.put(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

/**
 * Q) why is the function name "del", not a "delete?"
 *
 * "delete" is reserved keyword of JavaScript language
 * so, use "del" first, and alias to "delete" when export it
 */
async function del(endpoint, params = "", data = {}) {
  return axios.delete(serverUrl + endpoint + "/" + params, {
    data,
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

/**
 * now we can use those methods like this :
 * api.get(), api.post(), api.put(), api.del
 *
 * if i want to request with post method to "/user/signin", with userInfo data:
 * api.post("/user/signin", userInfo) will work
 */
export { get, post, postData, put, del as delete };
