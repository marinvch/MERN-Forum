## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### `Application Description`

This app is basic forum type.
 

### Arhitecture
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src
    ├──Api
        ├── index.js
    ├── Components
          ├── Auth
              ├── Styles
                  ├── Login.css
                  ├── Register.css
              ├── Login.js
              ├── Register.js
          ├── Comment
              ├── Styles
                  ├── CreateComment.css
              ├── CreateComment.js
          ├── Post
              ├── Styles
                  ├── CreateComment.css
                  ├── Post.css
                  ├── Viewpost.css
              ├── CreatePost.js
              ├── EditPost.js
              ├── Posts.js
              ├── ViewPost.js
              ├── Profile
                  ├── Profile.js
                  ├── User.js
          ├── Styles
              ├── Footer.css
              ├── Header.css
              ├── Home.css   
          ├── Footer.js
          ├── Header.js
          ├── Home.js
          ├── Context
              ├── UserContext.js
          ├── App.css
          ├── App.js
          ├── Index.css
          ├── Index.js
   
   
   

Used tech stack is: [Express,Mongoose,React,React-Material-UI]

for Demo => http://forum.marinvch.eu

### `Application `

Application builded with MERN stack tools

### `Application functionality`

1.This app contains CRUD operation
2.This app contains like and dislike functionality
3.This app contains login & register funcitionality
4.Create Edit or Delete Post 
5.Can add Comments to a specific Post

### `Application functionality under developing`


1.Need to handle some validations
2.Need to add some other functionality to comments and User Profile for now only displays the number of posts he have created

### `Developer help`

If needed for more info you can contact me email:marinvch@gmail.com
