import createUserConfig from "../userConfig/create_user_config"

const CheckUserEmailVerified = async (
    email: string,
) => {
    const result = await createUserConfig.getUserConfigByQuery(email);

    if (result?.documents[0] && result?.documents[0]?.isUserVerified === false) {
        return false;
    }

    return true;

}

const checkIfUserExist = async (
    email: string
) => {
    const result = await createUserConfig.getUserConfigByQuery(email);
    if (result?.documents[0]) {
        console.log('user already exists', result?.documents[0]);

        return true;
    }
    return false;

}

const checkIfUserIsVerified = async (
    email: string
) => {
    const result = await createUserConfig.getUserConfigByQuery(email);
    if (result?.documents[0] && result?.documents[0]?.isUserVerified === true) {
        console.log('user already verified', result?.documents[0]);
        return true;
    }
    return false;




}

// add more checkers

export {
    CheckUserEmailVerified,
    checkIfUserExist,
    checkIfUserIsVerified
}
