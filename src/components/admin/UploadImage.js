import RNFetchBlob from 'react-native-fetch-blob';

export const uploader = (data) => {
  return RNFetchBlob.fetch(
    'POST',
    'http://84.241.1.59:9191/upload/image?file',
    {
      'Content-Type': 'multipart/form-data',
    },
    data,
  );
};
