#IceE

 [![icee version](https://img.shields.io/badge/icee-0.11.0-red)](https://github.com/IceEmblem/IceE)
 [![icetf version](https://img.shields.io/badge/icetf-0.11.0-yellowgreen)](https://www.npmjs.com/package/icetf)

 IceE is a multi-project framework based on React. You can add multiple startup projects (such as: create-react-app, react-native, etc.) to the framework. IceE is based on modular design, monorepo project, and its project structure is as follows  :
 ![](./images/icee.png)


 ## start using
 **Clone project or download project** </br>
 git clone https://github.com/IceEmblem/IceE.git

 **Installation package** </br>
 yarn install </br>
 Note: It must be yarn, and npm cannot be used, because the project uses the workspace of yarn

 **Run Web side** </br>
 yarn start: web

 ## Write a module
 How to write a module and publish it for others to use?
 1. Execute node icee -c "ice-react-mytest" to create ice-react-mytest package
 2. Execute yarn workspace ice-react-start add ice-react-mytest Add package reference in ice-react-start
 3. Add dependencies to the Module of ice-react-start
 ```javascript
 import { Module as MyTestModule } from 'ice-react-mytest';

 // Add dependencies of MyTestModule
 ModuleFactory.register(module, [
     ...
     MyTestModule
 ]);
 ```
 4. Go to /packages/ice-react-mytest and modify the Module.js file
 ```javascript
 import React from 'react'
 import {BaseModule, PageProvider, ModuleFactory, Page} from 'icetf'
 import {Module as CoreModule} from 'ice-core';

 class Module extends BaseModule
 {
     initialize(){
         // registration page, visiting /mytest will display this page
         PageProvider. register({
             name: "mytest",
             url: "/mytest",
             element: <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                 <p>Hello World!!!</p>
             </div>
         });
     }
 }

 const module = new Module();
 export default module;

 ModuleFactory. register(module, [CoreModule]);
 ```
 5. Execute yarn start:web in the root directory to run the web site, visit /mytest, and you can view the page just now
 6. Execute node icee -b "ice-react-start" in the root directory to generate the package that ice-react-start depends on, enter the ice-react-mytest module directory, execute npm publish to publish your module, so that others can  Install and use your module directly
 </br></br>

 ## Add a new entry item
 You already have a PC-side program, and now you want to add a H5-side program or RN program, how to achieve it?  </br>
 In fact, it is very simple to implement, you can refer to the index.js and module.js codes of the ice-react-start module </br>
 Of course, a better way is to copy ice-react-start and rename it </br>

 ## Order
 **Execute the following command to view all commands** </br>
 node icee

 **debug** </br>
 node icee -s "entry module run command" "entry module name"

 **Create package** </br>
 node icee -c "module name"

 **The package that babel compiles the project depends on** </br>
 node icee -b "entry module name"
 </br></br>

 ## Pack
 1. Execute node icee -b "entry module name" to compile the packages that the project depends on
 2. Enter the project to execute the packaging command of the project

 </br></br>

 ## Documentation
 Framework document: https://blog.csdn.net/dabusidede/article/details/119010741 (outdated, to be updated)
 </br></br>

 ## The packages we provide
 ### ice-common package
 #### Install
 1. Add package yarn workspace ice-core add ice-common </br>
 2. Register the cache method in ice-react-start (ice-common needs to use the cache, so you need to set the cache method at the entry) </br>
 ```javascript
 import { Storage } from 'ice-common';

 export default class StartModule extends BaseModule {
     preInitialize() {
         // Initialize Storage
         Storage. setItem = (key, value) => {
             localStorage.setItem(key, value);
             return Promise. resolve();
         }
         Storage. getItem = (key) => {
             return Promise. resolve(localStorage. getItem(key));
         }
         Storage. removeItem = (key) => {
             localStorage. removeItem(key);
             return Promise. resolve();
         }

         // Initialize the token
         return token.init();
     }
 }
 ```
 3. Run the project yarn start:web </br>

 ## Join the project
 The project is currently maintained by me alone, if you are interested in joining the project, please contact me, email: 1373611035@qq.com, qq: 1373611035
