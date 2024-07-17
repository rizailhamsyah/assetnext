import Axios from 'axios'

let baseUrl = 'https://sso.pupuk-kujang.co.id/'
let baseUrl2 = 'https://demplon.pupuk-kujang.co.id/hrdmobile/'
export const apiBaseUrl = baseUrl
export const apiBaseUrl2 = baseUrl2

export const v2 = 'https://demplon.pupuk-kujang.co.id/webv2/'

export const realPos = ['ADMIN', 'SEKRETARIS', 'TKNO', 'PHL', 'OUTSOURCING']

export const googleMapsApiKey = 'AIzaSyAhBtEDxHLYfa_vZ7gB4xNqgEe4svWCArY'

export const assetApi = 'http://localhost:3000/'
// export const assetApi = 'https://asset-api.pupuk-kujang.co.id/'

const API_KEY = '1ab2c3d4e5f61ab2c3d4e5f6'

const api = Axios.create({
	baseURL: baseUrl,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/x-www-form-urlencoded',
	},
})

// const apiClient = Axios.create({
//     baseURL: "localhost:3000/",
//     headers: {
//       "Content-type": "application/json",
//     },
// });

const apiAsset = Axios.create({
	baseURL: assetApi,
	headers: {
		Accept: '*/*',
        'X-API-KEY': API_KEY,
		'Content-Type': 'application/x-www-form-urlencoded',
	},
})

const apiAssetFromData = Axios.create({
	baseURL: assetApi,
	headers: {
		Accept: 'application/json',
        'X-API-KEY': API_KEY,
		'Content-Type': 'multipart/form-data',
	},
})

export default api

export const fetchGetAsset = async (uri: any) => {
    let data
	try {
		const apiUrl = `${assetApi}${uri}`
		const response = await fetch(apiUrl, {
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
                'Accept' : '*/*',
                'X-API-KEY': API_KEY,
			},
		})
        if (response.ok) {
            data = await response.json();
        } else {
            console.error('Gagal mengambil data:', response.statusText);
        }
	} catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('Unexpected error:', error);
        }
	}
    return data
}

export const fetchGet = async (uri: any) => {
    let data
	try {
		const apiUrl = `${assetApi}${uri}`
		const response = await fetch(apiUrl, {
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
                'Accept' : '*/*',
                'X-API-KEY': API_KEY,
			},
		})
        if (response.ok) {
            data = await response.json();
        } else {
            console.error('Gagal mengambil data:', response.statusText);
        }
	} catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('Unexpected error:', error);
        }
	}
    return data
}

export const fetchPostAsset = async (uri: string, data_asset: any) => {
	let fetch
	try {
		let request = await apiAsset.post(uri, data_asset)
		fetch = request.data
	} catch (err) {
        if (err instanceof Error) {
            console.error('Error:', err.message);
        } else {
            console.error('Unexpected error:', err);
        }
	}
	return fetch
}

export const fetchPostDataAsset = async (uri: string, data_asset: any) => {
	let fetch
	try {
		let request = await apiAssetFromData.post(uri, data_asset)
		fetch = request.data
	} catch (err) {
        if (err instanceof Error) {
            console.error('Error:', err.message);
        } else {
            console.error('Unexpected error:', err);
        }
	}
	return fetch
}

export const fetchPutAsset = async (uri: string, data_asset: any) => {
	let fetch
	try {
		let request = await apiAsset.put(uri, data_asset)
		fetch = request.data
	} catch (err) {
        if (err instanceof Error) {
            console.error('Error:', err.message);
        } else {
            console.error('Unexpected error:', err);
        }
	}
	return fetch
}

export const fetchPut = async (uri: string) => {
	let fetch
	try {
		let request = await apiAsset.put(uri)
		fetch = request.data
	} catch (err) {
        if (err instanceof Error) {
            console.error('Error:', err.message);
        } else {
            console.error('Unexpected error:', err);
        }
	}
	return fetch
}

export const fetchDeleteAsset = async (uri: string) => {
	let fetch
	try {
		let request = await apiAsset.delete(uri)
		fetch = request.data
	} catch (err) {
        if (err instanceof Error) {
            console.error('Error:', err.message);
        } else {
            console.error('Unexpected error:', err);
        }
	}
	return fetch
}

export const fetcher = async (uri: string) => {
	let fetch
	try {
		let request = await api.get(uri)
		fetch = request.data
	} catch (err) {
        if (err instanceof Error) {
            console.error('Error:', err.message);
        } else {
            console.error('Unexpected error:', err);
        }
	}
	return fetch
}

export const fetcherPost = async (uri: string, data: any) => {
	let fetch
	try {
		let request = await api.post(uri, data)
		fetch = request.data
	} catch (err) {
        if (err instanceof Error) {
            console.error('Error:', err.message);
        } else {
            console.error('Unexpected error:', err);
        }
	}
	return fetch
}

export const fetcherPatch = async (uri: string, data: any) => {
	let fetch
	try {
		let request = await api.patch(uri, data)
		fetch = request.data
	} catch (err) {
        if (err instanceof Error) {
            console.error('Error:', err.message);
        } else {
            console.error('Unexpected error:', err);
        }
	}
	return fetch
}