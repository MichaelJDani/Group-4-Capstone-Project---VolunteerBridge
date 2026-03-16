backend  
│
├─documentation
│ ├── api.md
│ ├── database.md
│ └── project_structure.md
│
├─node_modules
│  
├─src
│ │
│ ├──── config
│ │ ├── database.js
│ │ ├── cors.js
│ │ └── env.js
│ │
│ ├── controllers
│ │ ├── auth.controller.js
│ │ ├── donation.controller.js  
│ │ ├── notification.controller.js
│ │ ├── report.controller.js
│ │ ├── user.controller.js
│ │ ├── volunteer.controller.js
│ │ ├── project.controller.js
│ │ └── task.controller.js
│ │
│ ├── models
│ │ ├── Donation.js
│ │ ├── user.js
│ │ ├── Project.js
│ │ ├── report.js
│ │ ├── index.js
│ │ ├── volunteer.js
│ │ ├── Task.js
│ │ └── notification.model.js
│ │
│ ├── routes
│ │ ├── authRoutes.js
│ │ ├── donationRoutes.js
│ │ ├── notificationRoutes.js
│ │ ├── projectRoutes.js
│ │ ├── reportRoutes.js
│ │ ├── task Routes.js,
│ │ ├── userRoutes.js
│ │ └── volunteerRoutes.js
│ │
│ ├── middleware
│ │ ├── auth.js
│ │ ├── error.js
│ │ └── role.js
│ │
│ ├── services
│ │ ├── notification.service.js
│ │ └── report.js
│ │
│ ├── utils
│ └── generateTokens.js
│
├──db.js
├──.env
├──.gitignore
├──package-lock.json
├── packake.json
├── server.js
└── README.md
