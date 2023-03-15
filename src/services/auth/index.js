import axios from "axios";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

export const registerService = async (value) => {
    return await axios.post(`${process.env.NEXT_BACKEND_API}/register/`, value, config)
}

export const loginService = async (value) => {
    return await axios.post(`${process.env.NEXT_BACKEND_API}/login/`, value, config)
}
