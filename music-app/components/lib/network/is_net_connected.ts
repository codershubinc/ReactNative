import NetInfo from '@react-native-community/netinfo';

const checkInternetConnection = async () => {
  const state = await NetInfo.fetch();
  return state.isConnected;
};

export default checkInternetConnection;
