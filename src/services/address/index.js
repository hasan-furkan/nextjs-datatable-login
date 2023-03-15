import axios from "axios";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const config = {
    headers: {
        'Authorization': `Bearer`
    }
};

export const allAddressService = async (token) => {
    return await axios.get(`${process.env.NEXT_BACKEND_API}/address/`, {
        headers: {"Authorization": `Bearer ${token}`}
    })
}

export const addAddressService = async (value, token) => {
    return await axios.post(`${process.env.NEXT_BACKEND_API}/address/`, value, {
        headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${token}`}
    })
}

export const deleteAddressService = async (value, token) => {
    return await axios.delete(`${process.env.NEXT_BACKEND_API}/address/${value}`, {
        headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${token}`}
    })
}


export const putAddressService = async (id, data , token) => {
    return await axios.put(`${process.env.NEXT_BACKEND_API}/address/${id}`,data, {
        headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${token}`}
    })
}

