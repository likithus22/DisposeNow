//*******************this function fetches the user details from the database*******************
const Config = () => {
    const data = localStorage.getItem('token');
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/usr/getuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": data,
                },
            });
            if (!response.ok) {
                throw new Error('Error fetching data');
            }
            const feed = await response.json();
            // console.log("Received data:", feed);
            resolve(feed);
        } catch (error) {
            console.error("Error fetching data:", error);
            reject(error);
        }
    });
};

export default Config;