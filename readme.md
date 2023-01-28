```bash
Hey There! 🙌
Read the Doc Carefully before cloning to understand the general structure of the application.
```

A NodeJs Application 🚀 [Node.js](https://nodejs.org/en).

- Types definition are written in the [@types] folder.
- This Application is built using [Express.js](https://expressjs.com/) web framework, and is using [Typescript Lang](https://www.typescriptlang.org/) for writing the app's logic.
- For storing custom constant configurations within the `process.env` - [dotenv](https://www.npmjs.com/package/dotenv) package is used.
- For validating custom constant configurations within the `process.env` - [envalid](https://www.npmjs.com/package/envalid) package is used.

# Contents

- [Global Requisites](#global-requisites)
- [App Structure](#app-structure)
- [Install, Configure & Run](#install-configure--run)
- [List of Routes](#list-of-routes)

# Global Requisites

- node (>=16.1.0)
- ts-node (~ 10.6.0)
- typescript (~ 4.6.4)

# App Structure

```bash
├── src
│   ├── user-module
│   │    ├── user.controller.ts
│   │    └── user.service.ts
│   ├── utils
│   │    ├── app-error.util.ts
│   │    └── catchAsync.util.ts
│   ├── @types
│   │    ├── express
│   │    │   └── index.d.ts
│   │    └── user.types.ts
│   ├── middleware
│   │    └── guard.middleware.ts
│   ├── abstract
│   │    └── controller.interface.ts
│   ├── app.ts
│   ├── server.ts
│   ├── env.config.ts
│   └── validate-env.ts
│      
├── .gitignore
├── nodemon.json
├── package.json
├── .prettierrc
├── package-lock.json
├── readme.md
├── tsconfig.json
└── eslintrc.json
   
```

# INSTALL, CONFIGURE & RUN

Once you have successfully cloned the repo please run the following command
```
 npm i
 
 or 
 
 npm install
 
 or 
 
 yarn add  
```

Upon successful installation of packages, please run the following command to run server in development mode.

```
  npm run dev 
```

⚠️ For production environment only
```
  npm run build
```

# API Routes

```sh
+--------+------------------------------------------+
  Method | URI
+--------+------------------------------------------+
  GET    | /
+--------+------------------------------------------+
```
