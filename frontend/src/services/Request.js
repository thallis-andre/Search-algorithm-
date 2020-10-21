
export default class Request {
    url = 'http://localhost:5000'

    uploadFile = (file) => {
        const formData = new FormData()
        formData.append('file', file)
        
        return fetch(this.url, {
            method: 'post',
            body: formData,
        });
    }

    buscaBinaria = (nome) => {
        return fetch(`${this.url}/buscaBinaria/${nome}`, {
            method: 'get',
        });
    }

    buscaSequencial = (nome) => {
        return fetch(`${this.url}/buscaSequencial/${nome}`, {
            method: 'get',
        });
    }
}

