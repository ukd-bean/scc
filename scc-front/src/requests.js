export function getHello() {
    return fetch("http://localhost:8080/group/hello", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': 'GET, HEAD, POST, PUT, DELETE, OPTIONS, PATCH',
        }
    })
        .then(res => res.json())
        .catch(err => console.log(err));
}

export function getAllGroups() {
    return fetch("http://localhost:8080/group/all", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': 'GET, HEAD, POST, PUT, DELETE, OPTIONS, PATCH',
        }
    })
        .then(res => res.json())
        .catch(err => console.log(err));
}

export function createGroup(name) {
    return fetch("http://localhost:8080/group/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': 'POST',
        },
        body: JSON.stringify({name})
    })
        .then(res => res.json())
        .catch(err => console.log(err));
}

export function createPayment(name, cost, groupId) {
    return fetch("http://localhost:8080/payment/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': 'POST',
        },
        body: JSON.stringify({name, cost, groupId})
    })
        .then(res => res.json())
        .catch(err => console.log(err));
}

export function getAllPayments() {
    return fetch("http://localhost:8080/payment/all", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': 'GET, HEAD, POST, PUT, DELETE, OPTIONS, PATCH',
        }
    })
        .then(res => res.json())
        .catch(err => console.log(err));
}