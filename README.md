# Molgenis Rare Disease Vue Applications

## Getting Started

The `rd-ui-components` library is a collection of Vue components for use in building custom Vue applications for use in Molgenis databases. The aim of this library is to speed up the development process and to standardize vue applications.

### 1 Build and install the `rd-ui-components` library

```sh
cd rd-ui-components
yarn build

yarn workspace <child-workspace> add rd-ui-components@<version>
```

Create a new yarn workspace in the `apps/` folder.

### 2 Create a custom footer for your project

In another child workspace, create a new footer component.

```sh
cd <child-workspace>

touch src/components/CustomFooter.vue
```
