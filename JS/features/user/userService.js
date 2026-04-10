import { get, put, post } from "../../core/apiClient.js";

export async function getUser(id) {
    return await get("/User/GetBy/" + id);
}

export async function getDefaultAddressByUserId(id) {
    return await get("/UserAddress/GetDefaultAddressByUserId/" + id);
}

export async function updateProfile(id, fullName, phoneNumber, gender, dateOfBirth) {
    const result = await put("/User/UpdateProfile/" + id, {
        fullName,
        phoneNumber,
        gender,
        dateOfBirth
    });
    return result;
}

export async function changePassword(newPassword) {
    const result = await put("/User/ChangePassword", {
        newPassword
    });
    return result;
}

export async function updateAddress(id, country, city, region, addressLine) {
    const result = await put("/UserAddress/Update", {
        id,
        country,
        city,
        region,
        addressLine
    });
    return result;
}

export async function createAccount(name, email, password, phoneNumber, gender, dateOfBirth) {
    const result = await post("/User/Create", {
        name,
        email,
        password,
        phoneNumber,
        gender,
        dateOfBirth
    });
    return result;
}

export async function createAddress(userId, country, city, region, addressLine, isDefault) {
    const result = await post("/UserAddress/Create", {
        userId,
        country,
        city,
        region,
        addressLine,
        isDefault
    });
    return result;
}

export async function sendEmailVerificationCode(email) {
    const result = await post("/User/SendEmailVerificationCode", {
        email
    });
    return result;
}

export async function checkEmailVerificationCode(code) {
    const result = await post("/User/CheckEmailVerificationCode", {
        code
    });
    return result;
}