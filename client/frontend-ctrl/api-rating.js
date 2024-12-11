import apiUrl from './config';

const create = async (rating) => {
    try {
        let response = await fetch(`${apiUrl}/api/ratings/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rating)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const list = async (signal) => {
    try {
        let response = await fetch(`${apiUrl}/api/ratings/`, {
            method: 'GET',
            signal: signal,
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const read = async (params, signal) => {
    try {
        let response = await fetch(`${apiUrl}/api/ratings/` + params.ratingId, {
            method: 'GET',
            signal: signal,
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const update = async (params, rating) => {
    try {
        let response = await fetch(`${apiUrl}/api/ratings/` + params.ratingId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rating)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const remove = async (params) => {
    try {
        let response = await fetch(`${apiUrl}/api/ratings/` + params.ratingId, {
            method: 'DELETE'
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export { create, list, read, update, remove }