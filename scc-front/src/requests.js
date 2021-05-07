export function getAllGroups() {
    return fetch("http://localhost:8080/group/all", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': 'GET, POST',
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

export function getFilledPaymentGroups() {
    return fetch("http://localhost:8080/main/", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': 'GET',
        }
    })
        .then(res => res.json())
        .catch(err => console.log(err));
}