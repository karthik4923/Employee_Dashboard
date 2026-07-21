// Relative imports from assets/images
import portfolioImg from '../../assets/images/portfolio.jpg'
import chatImg from '../../assets/images/Realtime.jpg'
import ecommerce1Img from '../../assets/images/ecomerce1.jpg'
import ecommerce2Img from '../../assets/images/ecomerce2.jpg'
import weatherImg from '../../assets/images/wheather1.jpg'
import blogImg from '../../assets/images/blog.jpg'

const projdatas = [
  {
    id: 2566,
    name: 'karthik',
    projects: [
      {
        done: true,
        img: portfolioImg,
        title: 'Portfolio Website',
        desc: 'Built a portfolio using Vue.js and Tailwind CSS.'
      },
      {
        done: false,
        img: chatImg,
        title: 'Real-Time Chat App',
        desc: 'Working on a chat app using Firebase and Vue.'
      },
      {
        done: true,
        img: ecommerce1Img,
        title: 'E-commerce Store',
        desc: 'Developed an online store with payment integration.'
      }
    ]
  },
  {
    id: 2564,
    name: 'Akhil',
    projects: [
      {
        done: true,
        img: ecommerce2Img,
        title: 'E-commerce Store',
        desc: 'Developed an online store with payment integration.'
      }
    ]
  },
  {
    id: 2565,
    name: 'Jyotheswar',
    projects: [
      {
        done: false,
        img: weatherImg,
        title: 'Weather App',
        desc: 'Creating a weather forecast dashboard with API data.'
      },
      {
        done: true,
        img: blogImg,
        title: 'Blog CMS',
        desc: 'Finished building a markdown-based blogging system.'
      }
    ]
  }
]

export { projdatas }
