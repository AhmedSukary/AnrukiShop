import { post } from "../../core/apiClient.js";

export async function login(email, password) {

    const result = await post("/Auth/Login", {
        email,
        password
    });
    
    localStorage.setItem("userId", result.userId);
    localStorage.setItem("accessToken", result.accessToken);
    localStorage.setItem("refreshToken", result.refreshToken);

    return result;
}

export async function logout() {

    const refreshToken = localStorage.getItem("refreshToken");

    await post("/Auth/Logout", {
        refreshToken
    });
    
    localStorage.removeItem("userId");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    window.location.href = "index.html";
}