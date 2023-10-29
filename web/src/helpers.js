export async function sendRequest(endpoint, data) {

    const url = `http://${SERVER_IP}:10000/` + endpoint;
    console.log(url);
    let response; 

    //Log cookies
    console.log(document.cookie);

    await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(data => {
        response = data;
    })

    return response;
}

export async function graphqlRequest(query) {
    const url = `http://${SERVER_IP}:10000/api`;
    var respuesta;
    console.log(document.cookie)
    await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: `` + query + ``}),
    })
    .then(res => res.json())
    .then(data => {
      respuesta = data["data"];
    });
    return respuesta;
  }