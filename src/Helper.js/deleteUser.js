const DeleteUser = (id) => {
    const data = {
        "_id": id
    }
    console.log(id)
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'content-Type': 'application/json',
            'x-auth-token': JSON.parse(localStorage.getItem("token"))
        },
    }
    fetch("http://localhost:5000/api/admin/delete", requestOptions)
        .then((response) => {
            if (!response.ok) {

                setMessage("PLEASE RETRY")
            }
            return response.json();
        })
        .then(value => {
            const ra = Math.random() * (10 - 1) + 1;
            return { answer: "true", ra }
        })
        .catch(error => {
            console.log(error.message)
            return { answer: "false" }
        })
}


export default DeleteUser