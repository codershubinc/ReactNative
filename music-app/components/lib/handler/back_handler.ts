import { Alert, BackHandler } from "react-native";
export default function () {
    console.log("back handler called");


    Alert.alert(
        "Press ok to exit ",
        "Are you sure you want to EXIT?",
        [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            {
                text: "OK",
                onPress: () => BackHandler.exitApp()
            }
        ],
    )
    // BackHandler.addEventListener(
    //     "hardwareBackPress",
    //     () => null,
    // ).remove();

    // TODO : Remove onClick listener from BackHandler to prevent memory leak
    return true;




};

