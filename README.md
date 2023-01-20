# iosAndroid
to create apk bundle without a genkey use below command
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
than
cd android & ./gradlew assembleDebug
for your mac ip ipconfig getifaddr en0
first cd android
for apk ./gradlew assembleRelease
for app store ./gradlew bundleRelease