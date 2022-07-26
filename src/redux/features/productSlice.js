import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'https://dastyor.site.uz/api';

const initialState = {
	products: [],
	isLoading: true,
};

export const latestProductsFetch = createAsyncThunk(
	'products/latestProductsFetch',
	async () => {
		const lang = localStorage.getItem('lang');
		const country = JSON.parse(localStorage.getItem('country'));

		const res = await axios(`${baseUrl}/products/latest/`, {
			headers: {
				'Content-type': 'application/json',
				'Accept-Language': lang != null ? lang : 'ru',
				'Accept-Country': country != null ? country.code : '',
			},
		});
		return res.data.results;
	}
);

const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: {
		[latestProductsFetch.pending]: (state) => {
			state.isLoading = true;
		},
		[latestProductsFetch.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.products = action.payload;
		},
		[latestProductsFetch.rejected]: (state) => {
			state.isLoading = false;
		},
	},
});

export default productSlice.reducer;
