import axios from 'axios';
import { API_URL } from '../const';

export class ApiService {
	#apiUrl = API_URL

	constructor() {
		this.accessKey = localStorage.getItem('accessKey')
		console.log('this.accessKey: ', this.accessKey);
	}

	async getAccessKey() {
		try {
			if (!this.accessKey) {
				const responce = await axios.get(`${this.#apiUrl}api/users/accessKey`)
				this.accessKey = responce.data.accessKey
				localStorage.setItem('accessKey', this.accessKey)
			}
		} catch (error) {
			console.error(error);
		}
	}

	async getData(pathname, params = {}) {
		if (!this.accessKey) {
			await this.getAccessKey()
		}

		try {
			const responce = await axios.get(`${this.#apiUrl}${pathname}`, {
				headers: {
					Authorization: `Bearer ${this.accessKey}`
				}, 
				params
			})

			return responce.data
		} catch (error) {
			if (error.responce && error.responce.status === 401) {
				this.accessKey = null
				localStorage.removeItem('accessKey')

				return this.getData(pathname, params)
			} else {
				console.error(error);
			}
		}
	}

	async getProducts(page = 1, limit = 12, list, category, q) {
		return await this.getData('api/products', {
			page, limit, list, category, q
		})
	}
}