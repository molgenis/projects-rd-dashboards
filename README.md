# Molgenis Rare Disease Vue Applications

## Getting Started

The `rd-components` library is a collection of Vue components for use in building custom Vue applications for use in Molgenis databases. The aim of this library is to speed up the development process and to standardize vue applications across a number of Molgenis instances.

### 1 Build and install the `rd-ui-components` library

```sh
cd rd-components
yarn build

yarn workspace <child-workspace> add rd-components@<version>
```

### 2 Create a new subworkspace

Create a new Vue application in the `apps/` folder and follow the prompts. Make sure you enable view router.

```sh
yarn create vite
```

> Note: When naming projects, avoid using 'app' in the name. In Molgenis, the prefix 'app' is automatically added so apps will appear as 'app-app-*'.

### 3 Create Files

1. Fill in the scripts in the `package.json` file
2. Copy config files from another subworkspace
3. Copy `vite.config.js` and update the devProxy
4. Install the rd-components library: `yarn workspace <subworkspace> add rd-components@<version>`

### 4 Create a custom footer for your project

In another child workspace, create a new footer component.

```sh
cd <child-workspace>

touch src/components/CustomFooter.vue
```
