# service-admin

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

To run from the src directory instead of root git directory, and to run on a different port:
`npm run --prefix ../ serve -- --port 8889`

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Build for Android
1. `npm run build-release`
1. // `npx cap copy` now done inside build-release
1. `npx cap open android`
