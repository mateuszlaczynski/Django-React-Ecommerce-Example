import {API} from "../../backend"

export const getAllProducts = () => {
    return ( 
    fetch(`${API}/products/`, {method: "GET"})
    .then((response) => {
        return response.json();
    })
    .catch((error) => console.log(error))
    )
};

export const getProductDetail = (slug) => {
    return (
        fetch(`${API}/products/${slug}/`)
        .then((response) => {
            return response.json();
        }) 
        .catch((error) => console.log(error))
    )
}

export const getAllCategories = () => {
    return (
        fetch(`${API}/categories/`)
        .then((response) => {
            return response.json();
        })
        .catch((error) => console.log(error))
    )
}

export const buttonCheckPlus = (product, amount) => {
    let disabled = false;
    if (product.stock === amount) {
        disabled = true;
    }
    return disabled;
}

export const buttonCheckMinus = (product, amount) => {
    let disabled = false;
    if (amount === 1) {
        disabled = true;
    }
    return disabled;
}