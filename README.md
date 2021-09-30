# HTML & SASS Starter

## Presentation
This project is a starter for HTML, SASS and Javascript projects. It provides a code basis to make web project easier and automated.

This project is based on Anthony BOURMAUD starter, created for University of La Rochelle students.

## Technologies
- HTML
- SASS
- CSS
- JS
- Gulp
- ESLint

## How to use the starter

### Step 0 : Get the starter
You can download a zip folder of the project by using the `Code` button, then press `Download ZIP`.
You can also clone the project by using the following commands : 
- Using SSH : `git clone git@github.com:Benjamin-Pelaudeix/html-sass-starter.git`
- Using HTTPS : `git clone https://github.com/Benjamin-Pelaudeix/html-sass-starter.git`
### Step 1 : Install npm dependencies
You need to install all package.json dependencies by using the following commands :
- `npm install` or `npm i`
### Step 2 : Initialize ESLint
If your project use Javascript, you can access to a basic ESLint linter configuration by using the following command :
- `eslint --init`

I recommend you the following configuration to make ESLint work properly :
- `To check syntax, and enforce code style`
- `CommonJS (require/exports)`
- `None of these`
- `No`
- `Browser`
- `Use a popular style guide`
- `Airbnb`
- `JSON`
- `Yes`

### Step 3 : Run the starter
To start a development instance using Gulp, use the following command :
- `gulp dev`

This command will automatically open a browser window and enable automatic browser synchronization.

### Step 4 : Use the starter
You can now delete the template section and start your project. Don't forget to delete all style created in `style.scss` file to start your project from scratch.

## Useful commands
`gulp dev` : start a development instance by opening a browser window and activating browser synchronization on changes.

`gulp build` : build project to make it ready for production. Optimized files are moved to **dist/** folder

`gulp clear` : clear **dist/** folder
## Author & Contributors
This project is created by Benjamin PELAUDEIX.

All contributors (issue reporters, developers) will be featured here.