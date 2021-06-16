export function getFilledPaymentGroups(date) {
  console.log(date)
  return fetch("http://localhost:8080/main?date=" + date, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': 'GET',
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err));
}

export function getFilledPaymentSingleGroup(id, date) {
  return fetch("http://localhost:8080/main/group?id=" + id + "&date=" + date, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': 'GET',
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err));
}

export function createGroup(name, parentId) {
  return fetch("http://localhost:8080/group", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': 'POST',
    },
    body: JSON.stringify({ name, parentId })
  })
    .then(res => res.json())
    .catch(err => console.log(err));
}

export function updateGroupName(id, name) {
  return fetch("http://localhost:8080/group", {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': 'PATCH',
    },
    body: JSON.stringify({ id, name })
  })
    .then(res => res.json())
    .catch(err => console.log(err));
}

export function replaceGroupTo(id, parentId) {
  return fetch("http://localhost:8080/group", {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': 'PUT',
    },
    body: JSON.stringify({ id, parentId })
  })
    .then(res => res.json())
    .catch(err => console.log(err));
}

export function deleteGroup(id, parentId) {
  return fetch("http://localhost:8080/main", {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': 'DELETE',
    },
    body: JSON.stringify({ id, parentId })
  })
    .then(res => res.json())
    .catch(err => console.log(err));
}


export function createPayment(date, cost, comment, groupId) {
  return fetch("http://localhost:8080/payment", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': 'POST',
    },
    body: JSON.stringify({ date, cost, comment, groupId })
  })
    .then(res => res.json())
    .catch(err => console.log(err));
}

export function updatePayment(id, date, cost, comment ) {
  return fetch("http://localhost:8080/payment", {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': 'PATCH',
    },
    body: JSON.stringify({ id, date, cost, comment })
  })
    .then(res => res.json())
    .catch(err => console.log(err));
}


export function replacePayments(ids, groupId ) {
  return fetch("http://localhost:8080/payment/replace", {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': 'PATCH',
    },
    body: JSON.stringify({ ids, groupId })
  })
    .then(res => res.json())
    .catch(err => console.log(err));
}

export function deletePayment(id) {
  return fetch("http://localhost:8080/payment?id=" + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': 'DELETE',
    },
    body: JSON.stringify({ id })
  })
    .then(res => res.json())
    .catch(err => console.log(err));
}