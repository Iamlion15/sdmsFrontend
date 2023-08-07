class DataTranscoder {
    async getPositiveSentiments() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'content-Type': 'application/json',
                'x-auth-token': JSON.parse(localStorage.getItem("token"))
            },
        };
        
        try {
            console.log("start")
            const response = await fetch("http://localhost:8000/api/admin/statistics", requestOptions);
            if (!response.ok) {
                console.log("error");
                return null;
            }
            console.log(response)
            const data = await response.json();
            const positiveArray = Object.entries(data.positive).map(([source, value]) => ({ source, value }));
            const sources = positiveArray.map(item => item.source);
            const values = positiveArray.map(item => item.value);

            return {
                sources: sources,
                values: values
            };
        } catch (error) {
            console.log(error.message);
            return null;
        }
    }
}

export default DataTranscoder;
