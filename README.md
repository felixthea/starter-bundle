# LinkNYC HTML5 Creative Starter Bundle

This starter bundle will provide the necessary tools to build and develop content & creative on a Link.    
With this bundle you will have the ability to test locally and package for production.

## Bundle Dependencies

```
$ npm install
```

## Bundle Structure
```
+-- _build
|   +-- _images
|   +----- placeholder.jpg
|   +-- _scripts
|   +----- _cortex
|   +--------- ajax.js
|   +--------- data.js
|   +--------- events.js
|   +--------- logger.js
|   +--------- placeholder.js
|   +--------- simulator.js
|   +--------- tracker.js
|   +----- main.js
|   +----- test-data.js
|   +----- view.js
|   +-- _styles
|   +----- _css
|   +--------- global.css
|   +--------- normalize.css
|   +----- _fonts
|   +-- bundle.js
|   +-- index.html
+-- _dist
|   +-- ${APP-NAME}-${Date-Time-Stamp}.zip
+-- _node_modules
+-- _src
|   +-- _images
|   +----- placeholder.jpg
|   +-- _scripts
|   +----- _cortex
|   +--------- ajax.js
|   +--------- data.js
|   +--------- events.js
|   +--------- logger.js
|   +--------- placeholder.js
|   +--------- simulator.js
|   +--------- tracker.js
|   +----- main.js
|   +----- test-data.js
|   +----- view.js
|   +-- _styles
|   +----- _css
|   +--------- global.css
|   +--------- normalize.css
|   +----- _fonts
|   +-- bundle.js
|   +-- index.html
+-- _test
|   +-- _helpers
|   +-- test.js
+-- .eslintrc.json
+-- .gitignore
+-- Makefile
+-- package.json
+-- README.md
+-- webpack.config.js
+-- webpack.settings.js
```
- `./src/`: The src folder contains a structure for all your project files and assets. All your files should be stored in this folder. When the bundle is deployed, these files are copied to the `./build/` folder and zipped in the `./dist/` folder.
- `./src/scripts/`: All your JS files should be stored in this folder. `src/scripts/main.js` is the entry point. All source files will get compiled into `./build/bundle.js` by webpack.
- `./src/scripts/cortex`: All Cortex player JS files are stored in this folder. These files should never be edited and are the JS core of the starter bundle.
- `./src/styles/`: Contains CSS files and CSS related files such as fonts. You can include the CSS files under this folder by requiring them in JavaScript. See `src/scripts/view.js` for an example.
- `./src/images/`: All image file assets under this directory will get copied to the final HTML5 app directory.
- `./src/build/`: The build folder is where your src files will be copied and prepped for packaging.
- `./src/dist/`: The dist folder is where your production zip will be packaged and stored.
- `./test/`: The test folder will contain all your test files.
- `./test/helpers/`: All test helper files.
- `index.html` is the default html file for your app. You can put your app skeleton in this file or dynamically create the DOM elements in JavaScript.
- `.eslintrc.json` is used to define any eslint rules and global variable exceptions.
- `webpack.settings.js` is used to store global variables used in the app.

#### Placeholder Image
The placeholder image is displayed on initial view of your creative and when there is an error within your code.   
The image is located in the `./src/images/` folder and can be changed by replacing the file `./src/images/placeholder.jpg`.   
**Note: It is strongly recommended that your placeholder image differs from your creative for debugging.**

### API Integration
Link Creatives are HTML5/Javascript applications and thus can pull dynamic data or content directly from API's accessible from the internet. A few things to be aware of:

* There is no persistence in Link web content
* All external calls must be whitelisted - please contact Ad Operations who can help you with this procedure

#### Offline Data Distribution
Link also provides an offline data store, Silo. Silo manages distributing datasets across a fleet of Link, providing campaigns access to the latest data stored.  When you make a change to campaign data, Silo synchronizes in real time resulting in always up to the date data in your creative.

When developing locally or offline from an internet connection, data will be simulated from within the bundle at `./src/test-data.js`.    
**Note: To simulate data correctly, data should be copied directly from your dataset in Silo.**

### App Settings
All global app setting variables are handled in `./webpack.settings.js`.

* `appName` is used for logging messages within the app.
* `campaign` tracks the campaign name in the tracking report.
* `datasetID` references the production data in Silo to be used in the bundle.
* `placeholderID` maps the DOM element ID for the placeholder image.

### App Events
* `VISIBLE_EVENT` fires when your app is about to become visible on screen.
* `HIDDEN_EVENT` fires when your app is off screen or in the background.
* `READY_EVENT` fires when the cortex player is ready and loaded.   
 The view of your app will be created and any silo data will be loaded.  

### App Methods
Update `src/scripts/view.js` to handle data updates and event based updates.

* `View.setData()` called when the app receives a `HIDDEN_EVENT`, good for manipulating incoming data or preloading images.
* `View._render()` called when the app receives a `HIDDEN_EVENT`.
* `View.updateView()` called when the app receives a `VISIBLE_EVENT`, good for updating the screen right before the app gets displayed.

### Local Development
You can test and run your code locally using `$ npm start`, leveraging webpack-dev-server to run your code in memory.     
In local development mode JS and CSS changes will be watched and auto reloaded but any HTML changes will have to be manually reloaded.     
Any silo data will be simulated from `./src/test-data.js`, with all events firing as they would in production.    
You can access your app in a web browser at `http://localhost:8080/`.

### Development Mode
You can build your code in development mode using `$ npm run dev`, this will build the app to the `./build` folder.   
Open `./build/index.html` in your browser to run the app.   
This mode is useful for quickly building the UI and viewing the final folder structure.   
**Note: You will have to rebuild after any code changes and all your data from silo will be local data.**

### Production Mode
You can build your code in production mode using `$ npm run prod`, this will build the app to the `./build` folder.   
To package for the Ad Server you will need to zip the `./build` folder for trafficking to a Link.   
You can automatically package the `./build` folder using `$ make dist`, this will zip your code to the `./dist` folder.   
**Note: The zipped bundle and files in the `./build` folder will only work on a Link.**

### Testing
Unit testing is done using AVA (https://github.com/avajs/ava) with test coverage using Istanbul NYC (https://github.com/istanbuljs/nyc).

Creatives can be tested locally in local development mode to verify: correct design & visual content, silo data and events firing properly.   
If you have access to a Link SBC, you can test an end to end experience by registering your sbc and trafficking your creative through the ad server.    
**Note: Even with an SBC its recommended that you test on an actual Link to ensure proper serving, displaying and optimization of your creative in a street environment.**

### Supported HTML5 Animation Operations
| Animation        | Status           | Notes  |
| ------------- |:-------------:| -----:|
| Fade-In      | ✅ | Simple opacity manipulation. |
| Bounce |  ✅    |  'Bouncing' an element using complex keyframe movements is possible.   |
| Rotate      |✅  | Transforming using `rotate3d` yields much better results than `rotate`. |
| Carousel-fade    | ✅      |   Simple opacity manipulation. |

### Generic Link Information
* The time format on a Link is in UTC.
* Currently 1080P video is supported on a Link in MP4 format.

### Quick commands
* Run app locally (local dev mode)
```
$ npm start
```
* Build app locally (Dev mode)
```
$ npm run dev
```
* Build app for prod (Prod mode)
```
$ npm run prod
```
* Build and package app for prod (Prod mode)
```
$ make dist
```
OR
```
$ make dist-custom app=${YOUR_CUSTOM_APP_NAME}
```
* Build and package app local files (Package working files, unminified and not built to run in Prod)
```
$ make local-dist
```
OR
```
$ make local-dist-custom app=${YOUR_CUSTOM_APP_NAME}
```
* Run tests
```
$ npm test
```

### Appendix
* `Cortex:` Player on Link.
* `Vistar:` Ad Server.
* `SBC:` Single Board Computer.
* `Silo:` Data distribution and management layer provided with Link.
