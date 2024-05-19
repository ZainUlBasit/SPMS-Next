import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
    // app_secret:
    //   "10ef42363582fd212242bf8da6598e6d15111a9a509c36242411d444e8c03728",
    // userToken,
  },
});

export const apiForImage = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
    // app_secret:
    //   "10ef42363582fd212242bf8da6598e6d15111a9a509c36242411d444e8c03728",
    // userToken,
  },
});

// AUth requests
export const LoginApi = (payload) => api.post("/login", payload);

export const CreateCompanyApi = (payload) => api.post("/company", payload);
export const UpdateCompanyApi = (payload) => api.patch("/company", payload);
export const DeleteCompanyApi = (payload) =>
  api.post("/company/delete", payload);
export const GetCompanyApi = () => api.get("/company");
// ======================================
//  items requests
// ======================================
export const CreateItemApi = (payload) => api.post("/item", payload);
export const DeleteItemApi = (payload) => api.post("/item/delete", payload);
export const UpdateItemApi = (payload) => api.patch("/item", payload);
export const GetItemApi = () => api.get("/item");
