# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

- Instructions to run the project
- Open the project folder and enter in the terminal yarn install to install dependencies.
- Download and install dependencies/run the backend project in the folder specified in the instructions document.
- PD: The backend provided has an error:
- * In the controller for create a new user, you need to add the following sentence:
    "roles: req.body.roles", so the user list can retrieve the roles array. In the current one, there'll be an error, because roles fill be undefined. 
