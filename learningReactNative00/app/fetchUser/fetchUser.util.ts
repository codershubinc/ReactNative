const fetchUser = async () => {

    try {

        const user = await fetch('https://openapihub.vercel.app/v0.1/random_user/big');
        const data = await user.json();
        return data

    } catch (error) {

        console.log(error);
        throw new Error('Error fetching user' + error);

    }

}


export default fetchUser