# HomeVital Harmony - Mobile application

This project is part of a final project in computer science at Reykjavík University.
This is the mobile application part that patients would use to manage their vital measurements according to Heimahjúkruns schedule.

Other parts of this project are the API, and the web application for worker of Heimahjúkrun.

This is an [Expo EAS](https://expo.dev) with [React Native](https://reactnative.dev/) and [Tanstack react-query](https://tanstack.com/query/latest).
The teck stack used was mainly choosen because it was known by the group members from other classes.

#### Group Members

Aron Ingi Jónsson | aronj22@ru.is

Jakub Ingvar Pitak | jakub22@ru.is | Guarantor for Mobile application

Sindri Þór Guðmundsson | sindrig23@ru.is

Þórir Gunnar Valgeirsson | thorirv21@ru.is

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Notice for iOS developers

The application has not been developed for iOS (Apple) devices, due to legal restrictions, but it is fully functional
on Android devices. It is however developed with the intent to easily move it to Apple devices as well, so implementation should be simple.
If an unknown error occurs when attempting to develop for iOS devices it may be due to a missing package for the
(React-ReAnimated)[https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/] library, which
is only required by apple devices. That package can be installed with the command:

```bash
cd ios && pod install && cd ..
```

## Get started

1. Fork the repository to your machine

2. Install necessary dependencies

    ```bash
    npm install
    ```

3. Start the app

    ```bash
     npx expo start
    ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo


## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).

## Demo app

We have a APK Demo build: [Expo dev build](https://expo.dev/accounts/jakub69420/projects/homevital_app/builds/1a24bb00-2c81-4936-9eee-6d5b48fe65ff)

Allowed login ssn's are:

|              |              |
|--------------|--------------|
| 1010101010   | 2020202020   |
| 1111111111   | 2121212121   |
| 1111111112   | 2222222222   |
| 1212121212   | 3333333333   |
| 1313131313   | 4444444444   |
| 1515151515   | 5555555555   |
| 1616161616   | 6666666666   |
| 1717171717   | 7777777777   |
| 1818181818   | 8888888888   |
| 1919191919   | 9999999999   |
