![](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37) ![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

# HomeVital Harmony - Mobile application



This is the mobile app part of a final project in computer science at Reykjavík University, HomeVital Haromny. Patients would use it to manage their individual health measurements.
Other parts of the project include an API and a web application for the staff of Heimahjúkrun. The entire final project uses all of these in unison to deliver a complete system.

This mobile app part is made with [Expo EAS](https://expo.dev/eas) and [React-native](https://reactnative.dev/), written in [typescript](https://www.typescriptlang.org/). It uses [JWT Bearer](https://jwt.io/) to authenticate queries with [Tanstack react-query](https://tanstack.com/query/latest).
The tech stack was chosen due to our members familiary with it. 

<br/>

<p align="center">
  <img src="https://github.com/user-attachments/assets/9412aaa4-9ed7-4b07-925b-4a7254185ad0" width="50%" />
</p>

#### Group Members

Aron Ingi Jónsson&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;aronj22@ru.is

Jakub Ingvar Pitak&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;jakub22@ru.is&nbsp;&nbsp;&larr;&nbsp;&nbsp;Guarantor for the mobile application

Sindri Þór Guðmundsson&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sindrig23@ru.is

Þórir Gunnar Valgeirsson&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;thorirv21@ru.is

***

## Prerequisites :warning:

- [Node.js](https://nodejs.org/en)
- [Expo dev account](https://expo.dev/)
  > This project will not run on the Expo Go application. You need an expo.dev account account to build your own copy of the app. You can also
  download the 'Demo build' at the bottom of this **readme** file if you just want to try it out. 
- Potentially the API from [HomeVital backend](https://github.com/HomeVital/homevital_backend)
  > there is no guarantee the server will be up at all times so you may need to run the API at your local machine. 

### Special notice for iOS developers :heavy_exclamation_mark:

The application was developed for android devices with the intent to easily move it to iOS devices later. This is due to legal restriction, with none of us being an Apple developer. Expo EAS however has universal development support for Android and iOS, so implementation should be simple.
> If an unknown error occurs when attempting to develop for iOS devices it may be due to a missing **pod** dependancy for the 
[React-ReAnimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/) library, which
is only required for iOS devices.

***

## Get started :arrow_left:

1. Fork this repository and clone it to your machine. 

2. Open the project in your code editor and open a new terminal.
   > We recommend [Visual studio code](https://code.visualstudio.com/Download)
   
3. Install necessary dependencies
   ```bash
    npm install
    ```

4. Connect to your expo dev account. Run
   > Create an account [here](https://expo.dev/signup) if you haven't already.
   ```bash
    eas login
    ``` 
   
5. Initialize the project to expo.dev
   ```bash
    eas init
    ```

### Build and run :white_check_mark:

Here you have two options. You can create a development build which is modifiable at runtime, or a preview build to get a fully compiled application.

### Development build (option 1)

1. Run the command:
   ```bash
    eas build --profile development --platform android
    ```

2. Wait for the build to complete than download it on your phone from the [expo.dev](expo.dev) dashboard
   > In your app project on expo.dev you can press "Install" and scan a qr-code or copy a link from where you can start the download.

3. Run the command:
   ```bash
    npx expo start
    ```

4. Scan the generated QR code with your phones camera
   
   Follow the link and the app will start! Now you can change your code however you want and see all the changes in real time. You need to run *npx expo start* every time you open your project again. 

### Preview/demo build (option 2)

1. Run the command:
   ```bash
    eas build --profile preview --platform android
    ```
2. Wait for the build to complete than download it on your phone from the [expo.dev](expo.dev) dashboard
   > In your app project on expo.dev you can press "Install" and scan a qr-code or copy a link from where you can start the download.
   
   Now you can try out the app like it would be used in once released. 

***

## Demo Application Avaliable :iphone:

We have an [APK Demo build](https://expo.dev/accounts/jakub69420/projects/homevital_app/builds/1a24bb00-2c81-4936-9eee-6d5b48fe65ff) available until May 29th, 2025.
> If this build has already run out, follow the **Get started** instructions above to build your own one.
> You may need to run the HomeVital API on your local machine if the server is down. It is linked in the prerequisites of this **readme** file.

Supported mock user SSN's are:

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
