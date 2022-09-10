const getShow = (endpoint) => {
    return fetch(`https://api.tvmaze.com/singlesearch/shows?q=${endpoint}`)
        .then(response => {
            if(!response.ok) {
                throw 'Sorry, looks like we can\'t find this show.' 
            }
            return response.json()
        });
}

export { getShow }