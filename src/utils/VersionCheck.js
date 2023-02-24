import { NativeModules } from 'react-native';
import semver from 'semver';

const error = (text) => {
  return {
    message:
      "Parse Error. Your app's play store page doesn't seem to have latest app version info.",
    text,
  };
};

export const getPackageName = () => NativeModules.RNVersionCheck.packageName;

export const getCurrentBuildNumber = () =>
  NativeModules.RNVersionCheck.currentBuildNumber;

export const getCurrentVersion = () =>
  NativeModules.RNVersionCheck.currentVersion;

export const getLatestVersion = async () => {
  try {
    const packageName = getPackageName();

    const storeUrl = `https://play.google.com/store/apps/details?id=${packageName}&hl=en`;

    return fetch(storeUrl)
      .then((res) => res.text())
      .then((text) => {
        const match = text.match(/Current Version.+?>([\d.]+)<\/span>/);
        if (match) {
          const latestVersion = match[1].trim();

          return Promise.resolve({ version: latestVersion, storeUrl });
        }

        return Promise.reject(error(text));
      });
  } catch (e) {
    console.warn(e); // eslint-disable-line no-console
  }
};

export const needUpdate = async () => {
  const currentVersion = getCurrentVersion();
  const latestVersion = await getLatestVersion();

  console.log(currentVersion, latestVersion);

  const response = semver.gt(currentVersion, latestVersion);

  return Promise.resolve(response);
};

export default {
  getPackageName,
  getCurrentBuildNumber,
  getCurrentVersion,
  getLatestVersion,
  needUpdate,
};
