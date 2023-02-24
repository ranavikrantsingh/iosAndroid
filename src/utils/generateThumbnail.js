import { createThumbnail } from 'react-native-create-thumbnail';

const generateThumbnail = async (url) => {
  let path = '';
  try {
    const response = await createThumbnail({
      url,
      timeStamp: 1000,
    });
    path = response.path;
    return path;
  } catch (err) {
    console.error(err);
  }
};

export default generateThumbnail;
