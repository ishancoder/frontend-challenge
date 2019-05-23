const ROOT_URL = "https://findfalcone.herokuapp.com";

function createPostData(data) {
    let postData = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    return postData
}

function getToken() {
    return fetch(`${ROOT_URL}/token`, createPostData({})).then(res => res.json());
}

export function fetchPlanets() {
    return fetch(`${ROOT_URL}/planets`).then(res => res.json());
}

export function fetchVehicles() {
    return fetch(`${ROOT_URL}/vehicles`).then(res => res.json())
}

export async function findFalcone(planet_names, vehicle_names) {
    const {token} = await getToken();
    return fetch(`${ROOT_URL}/find`, createPostData({token, planet_names, vehicle_names})).then(res => res.json());
} 