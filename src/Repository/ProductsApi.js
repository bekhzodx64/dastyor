import {getData, postDataWithToken} from "./BaseApi";
import axios from "axios";

export const getLatestProduct = () => getData('/products/latest/');
export const getMostCommonProduct = () => getData('/products/most-common/');
export const getTopSellerProduct = () => getData('/products/top-seller/');

export const getProductBySlug = (url) => getData(`/products/${url}/categorized/`);
export const getProductByNext = async (url) => {
    const res = await axios.get(url);
    return res;
};
export const getProduct = (url) => getData(`/products/${url}`)
export const getProductsRelated = (url) => getData(`/products/${url}/related/`);
export const getProductCharac = (url) => getData(`/products/${url}/features/`);
export const getProductReview = (id) => getData(`/products/${id}/reviews/`);
export const postComment = (data) => postDataWithToken('/product-rating/', data);
export const createOrder = (data) => postDataWithToken('/orders/create/', data);

