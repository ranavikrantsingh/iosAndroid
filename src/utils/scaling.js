import {Dimensions} from 'react-native';

const win = Dimensions.get('screen');
const width = win.width;
const guidelineBaseWidth = 370;
const guidelineBaseHeight = 1000;

const scale = number => {
  const a = number + number + number / 2 + 1;
  return (width * a) / 1000;
};

export {scale};
