# DevLink

Full-stack MERN web app geared towards developers to share and organize learning material and collaborate on each other's thoughts and perspective's on an everchanging tech space

### Live Site

- https://dev-link-six-xi.vercel.app/

---

## Features

- Authentication JWT + bcrypt for password hashing
- Tiptap editor for resource creation
- Comment CRUD functionality
- User Profile with related information
- User specific permissions for related resources/comments
- Material UI intergration (needs more work 5/15)

---

## Technologies

**Frontend:**

- React (Vite)
- React Router
- Tiptap
- Material UI

**Backend:**

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT

---

## Folder Structure

```
frontend/
├── src/
│   ├── components/         # Navbar, private routes
│   ├── context/            # Auth context
│   ├── pages/              # Home, Profile, Create, Edit
│   ├── api/                # Fetch helpers
│   └── App.jsx             # Routes + layout

backend/
├── models/                 # Mongoose schemas
├── routes/                 # Auth, resources, comments
├── middleware/             # Auth middleware
└── server.js               # Entry point

```

---

### Security NOTES

-should consider adding joi, if time allots . security and validation are pretty high already:

- mongoose schema: https://mongoosejs.com/docs/guide.html
- helmet: https://www.npmjs.com/package/helmet
- select method to hide data: https://www.geeksforgeeks.org/mongoose-query-prototype-select-api/
- jwt encryption: https://www.npmjs.com/package/jsonwebtoken
- bcryptjs- 10 salt rounds : https://www.npmjs.com/package/bcryptjs
- regex: https://digitalfortress.tech/tips/top-15-commonly-used-regex/

---

### ATTRIBUTIONS

logo- <a href="https://www.flaticon.com/free-icons/book" title="book icons">Book icons created by mikan933 - Flaticon</a>
light/dark icon - <a href="https://www.flaticon.com/free-icons/light-dark" title="light dark icons">Light dark icons created by Any Icon - Flaticon</a>

---

### Notes:

- add comments and have it display below resource
- adding comment amount below recouse preview
- need to limit preview to 10 OR consider pagination
- optimize images?
- tiptap bullets are acting buggy
- logout should have a settimeout rendering a goodbye
- profile should have a stat card
- Make sure to come back to the back end to implement multer and adding connection to cloudinary image hosting
