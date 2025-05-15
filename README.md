# HomeVital Harmony - Mobile application

This project is part of a final project in computer science at Reykjavík University.
This is the mobile application part that patients would use to manage their vital measurements according to Heimahjúkruns schedule.

Other parts of this project are the API, and the web application for worker of Heimahjúkrun.

This is an [Expo EAS](https://expo.dev) with [React Native](https://reactnative.dev/) and [Tanstack react-query](https://tanstack.com/query/latest).
The teck stack used was mainly choosen because it was known by the group members from other classes.

#### Group Members

Aron Ingi Jónsson | <a href="mailto:aronj22\@ru.is">test\@example.com</a>

Jakub Ingvar Pitak | <a href="mailto:jakub22\@ru.is">test\@example.com</a> | Guarantor for Mobile application

Sindri Guðmundsson | <a href="mailto:sindrig23\@ru.is">test\@example.com</a>

Þórir Gunnar Valgeirsson | <a href="mailto:thorirv21\@ru.is">test\@example.com</a>

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Notice for iOS developers

The application has not been developed for iOS (Apple) devices, due to legal restrictions, but it is fully functional
on Android devices. It is however developed with the intent to easily move it to Apple devices as well, so implementation
should be simply.
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

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.
