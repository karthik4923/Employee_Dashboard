const tasdatas = [
  {
    id: 2566,
    assign: [
      {
        eid: 3001,
        designation: "Backend Developer",
        name: "John Doe",
        tasks: [
          {
            task: "API Integration",
            desc: "Integrate the new payment API into the existing system",
            done: false
          },
          {
            task: "Database Optimization",
            desc: "Improve query performance for large datasets",
            done: true
          },
          {
            task: "Auth Module Refactor",
            desc: "Refactor the authentication module for scalability",
            done: false
          }, {
            task: "UI Improvements",
            desc: "Polish UI elements on the landing page for better UX",
            done: true
          },
        ]
      },
      {
        eid: 3002,
        designation: "Frontend Developer",
        name: "Jane Smith",
        tasks: [
          {
            task: "UI Improvements",
            desc: "Polish UI elements on the landing page for better UX",
            done: true
          }
        ]
      }
    ]
  },
  {
    id: 2565,
    assign: [
      {
      eid: 3002,
      designation: "Frontend Developer",
      name: "Jane Smith",
      tasks: [
        {
          task: "UI Improvements",
          desc: "Polish UI elements on the landing page for better UX",
          done: true
        },
        {
          task: "Dark Mode Support",
          desc: "Add dark mode toggle throughout the app",
          done: false
        },
        {
          task: "Accessibility Fixes",
          desc: "Ensure keyboard navigation and screen reader support",
          done: true
        }
      ]
    }]
  },
  {
    id: 2564,
    assign: [
      {
      eid: 3003,
      designation: "DevOps Engineer",
      name: "Mark Taylor",
      tasks: [
        {
          task: "CI/CD Pipeline Setup",
          desc: "Set up GitHub Actions for automated deployments",
          done: true
        },
        {
          task: "Log Monitoring",
          desc: "Implement centralized logging with alerts",
          done: false
        },
        {
          task: "Docker Image Cleanup",
          desc: "Clean up unused images from the registry",
          done: true
        }
      ]
      },
      {
        eid: 3002,
        designation: "Frontend Developer",
        name: "Jane Smith",
        tasks: [
          {
            task: "UI Improvements",
            desc: "Polish UI elements on the landing page for better UX",
            done: true
          }
        ]
      }
      ]

  }
]
export { tasdatas }
