const getShow = (endpoint) => {
    return fetch(`https://api.tvmaze.com/singlesearch/shows?q=${endpoint}`)
        .then(response => {
            if(!response.ok) {
                throw new Error('Sorry, looks like we can\'t find this show');
            }
            return response.json();
        });
}

const getShowById = (endpoint) => {
    return fetch(`https://api.tvmaze.com/shows/${endpoint}`)
        .then(response => {
            if(!response.ok) {
                throw new Error('Sorry, looks like we can\'t find this show.');
            }
            return response.json();
        });
}

const getPrescription = (endpoint) => {
    return fetch(`https://tasterx-api.herokuapp.com/prescriptions/${endpoint}`)
        .then(response => {
            if(!response.ok) {
                throw new Error('Sorry, looks like we can\'t find this prescription.');
            }
            return response.json();
        });
}

const postPrescription = (body) => {
    return fetch("https://tasterx-api.herokuapp.com/prescriptions/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
     })
     .then(response => {
        if(!response.ok) {
            throw new Error('Sorry, there was an error posting your information.');
        }
        return response.json();
     });
}


export { getShow, postPrescription, getShowById, getPrescription };