const API_PATH = 'http://localhost:3030/api'

const getRecipesByIngredients = (ingredients, page = 1) => {
    if (!ingredients) {
        return []
    }

    const result = fetch(`${API_PATH}?i=${ingredients}&p=${page}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            return data.results
        })
        .catch(err => {
            //console.log(err)
        })
    return result
}

const getRecipesByName = (name, page = 1) => {
    if (name === undefined) {
        return []
    }

    const result = fetch(`${API_PATH}?q=${name}&p=${page}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            return data.results
        })
        .catch(err => {
            //console.log(err)
        })

    return result
}

export { getRecipesByIngredients, getRecipesByName }
