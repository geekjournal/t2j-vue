# T2J Public Facing Website

This is a Vuepress website, with the website primary contents in `/src` directory, and Vuepress theme customizations
in `/src/.vuepress`.

## Build the website for development

From this root directory, run `vuepress dev src` to launch a local hot-reloading web server.

## Build the website for production

From this root directory, run `vuepress build src`, then look at the contents of the
`dist` folder at `./src/.vuepress/dist` which contains a fully deployable static website.
