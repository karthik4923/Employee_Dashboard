<script setup>
  import { projdatas } from './projectdata.js'
  import { ref, computed } from 'vue'

  const filter = ref('not')

  
  const userJson = localStorage.getItem('user')
  let userId = null
  if (userJson) {
    userId = JSON.parse(userJson).eid
  }

 
  const user = projdatas.find(p => p.id === userId) || { name: '', projects: [] }

  
  const filteredProjects = computed(() => {
    return user.projects.filter(p => {
      if (filter.value === 'done') return p.done
      else return !p.done
    })
  })
</script>

<template>
  <div class="container">
    <h2>Hi! {{ user.name }} Your Projects</h2>
    <div class="inner-container">
      <div class="title">
        <span @click="filter = 'not'"
              :class="{ active: filter === 'not' }">
          Not-Completed
        </span>
        <span @click="filter = 'done'"
              :class="{ active: filter === 'done' }">
          Completed
        </span>
      </div>

      <div class="container2" v-if="filteredProjects.length">
        <div v-for="(project, index) in filteredProjects"
             :key="index"
             class="card">
          <img :src='project.img'
               :alt="project.title" />
          <h5>{{ project.title }}</h5>
          <p>{{ project.desc }}</p>
        </div>
      </div>

      <div v-else class="no-projects">
        <p>No projects found in this category.</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
  /*.container {
    background-color: #f3f4f6;
    padding: 20px;
    margin-bottom: 10px;
    position: relative;
    height: 100vh; 
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  .inner-container {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-sizing: border-box;
    flex: 1;
    overflow: hidden; 
    display: flex;
    flex-direction: column;
  }

  .container2 {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding-right: 5px; 
  }*/

  .container {
    background-color: #f3f4f6;
    padding: 20px;
    margin-bottom: 10px;
    position: relative;
    height: 100%;
    box-sizing: border-box;
  }

  .inner-container {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-sizing:border-box;
  }

  .title {
    display: flex;
    gap: 50px;
    position: relative;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
  }

    .title span {
      position: relative;
      padding: 10px 0;
      cursor: pointer;
      font-weight: bold;
      color: #333;
      transition: color 0.3s ease;
    }

      .title span::after {
        content: '';
        position:absolute;
        left: 0;
        bottom: -2.5px;
        width: 0;
        height: 3px;
        background-color: #007bff;
        transition: width 0.3s ease;
      }

      .title span:hover::after {
        width: 100%;
      }

      .title span.active {
        color: #007bff;
      }

        .title span.active::after {
          width: 100%;
        }
  
  .container2 {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    max-height: 400px; 
    overflow-y: auto;
    padding-right: 8px; 
  }

   
    .container2::-webkit-scrollbar {
      width: 8px;
    }

    .container2::-webkit-scrollbar-thumb {
      background-color: #888;
      border-radius: 4px;
    }

      .container2::-webkit-scrollbar-thumb:hover {
        background-color: #555;
      }

  
  .card {
    background-color: #f9f9f9;
    border-radius: 8px;
    width: calc(33.333% - 1rem); 
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    padding: 1rem;
    box-sizing: border-box;
    transition: transform 0.2s ease;
  }

    .card:hover {
      transform: translateY(-5px);
    }

    .card img {
      width: 100%;
      height: 50%;
      border-radius: 4px;
      margin-bottom: 0.5rem;
      box-sizing: border-box;
    }
    .card img:hover {
        transform:scale(1.3);
    }
      .card h5 {
      margin: 0.5rem 0;
      font-size: 1.1rem;
    }

    .card p {
      font-size: 0.9rem;
      color: #666;
    }
 
  @media (max-width: 768px) {
    .card {
      width: calc(50% - 1rem);
    }
  }

  @media (max-width: 480px) {
    .card {
      width: 100%;
    }
  }
</style>


