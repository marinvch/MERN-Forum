### `Application Description`

MERN Forum - A modern full-stack forum application built with the latest technologies.

This is a FullStack MERN Application currently undergoing modernization to TypeScript with the latest safe versions.

**Tech Stack:** Express.js, Mongoose, React 18, Redux Toolkit, Material-UI, TypeScript

### `Recent Modernization` 🚀

- ✅ Upgraded to React 18.x
- ✅ Migrated React Router v5 → v6
- ✅ Converted project to TypeScript
- ✅ Updated all dependencies to latest safe versions
- ✅ Replaced deprecated `react-google-login` with `@react-oauth/google`
- ✅ Upgraded mongoose to v8 with proper TypeScript support

**See [MODERNIZATION_GUIDE.md](MODERNIZATION_GUIDE.md) for detailed migration information**

### `Application functionality`

1. CRUD operations for posts and comments
2. User authentication with JWT
3. Like and dislike functionality
4. User profiles and dashboards
5. Create, edit, and delete posts
6. Comment system for posts

### `Application Setup`

1.clone the repo 2. Go to the folder and type npm install - it will install both backend and front end dependacys 3. Setup mongooDB local env for developing purposes 4. Add .env file with will contain value of JWT_Secret={secret key} 5. After seting up MongoDB type npm start and will run botch backend and frontend 6. in order to use Import need to go package.json and under main "type":"module", 7. TODO documentation

### Arhitecture

MERN-FORUM
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── Frontend
├── public
├── favicon.ico
├── index.html
├── logo192.png
├── logo512.png
├── manifest.json
└── robots.txt
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

### `Application functionality under developing`

1.Need to handle some validations
2.Need to add some other functionality to comments and User Profile for now only displays the number of posts he have created

### `Developer help`

If needed for more info you can contact me email:marinvch@gmail.com
