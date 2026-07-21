<script setup>
  import { tasdatas } from './taskdata.js'
  import { reactive, computed, ref } from 'vue'

  // Get user ID from localStorage or fallback
  const userjson = localStorage.getItem('user')
  let userid = null
  if (userjson) {
    userid = JSON.parse(userjson).eid
  }

  // Make the user reactive to track changes
  const user = reactive(tasdatas.find(t => t.id === userid) || { name: '', assign: [] })

  // Task view state ('not' or 'done')
  const taskView = ref('not')

  // Flatten tasks but keep original reactive task reference inside 'task'
  const allTasks = computed(() => {
    return user.assign.flatMap(assign =>
      assign.tasks.map(task => ({
        task,            // original reactive task object
        eid: assign.eid,
        designation: assign.designation,
        name: assign.name
      }))
    )
  })

  // Filter tasks based on taskView
  const notCompletedTasks = computed(() => allTasks.value.filter(t => !t.task.done))
  const completedTasks = computed(() => allTasks.value.filter(t => t.task.done))

  // Mark task done (this updates the reactive task.done property)
  function completed(t) {
    t.task.done = true
  }
</script>

<template>

  <div class="container">
    <div class="inner-container">
      <!-- Toggle Buttons -->
      <div class="buttons">
        <button :class="{ active: taskView === 'not' }" @click="taskView = 'not'">Not Completed</button>
        <button :class="{ active: taskView === 'done' }" @click="taskView = 'done'">Completed</button>
      </div>

      <!-- Task Lists -->
      <section class="task-section">
        <h2>{{ taskView === 'not' ? 'Not Completed Tasks' : 'Completed Tasks' }}</h2>
        <div class="task-list">

          <!-- No tasks message -->
          <div v-if="taskView === 'not' && notCompletedTasks.length === 0" class="no-tasks">
            No tasks to show.
          </div>
          <div v-if="taskView === 'done' && completedTasks.length === 0" class="no-tasks">
            No tasks to show.
          </div>

          <!-- Not Completed Tasks -->
          <div v-if="taskView === 'not'"
               v-for="(item, idx) in notCompletedTasks"
               :key="'not-' + idx"
               class="task-card">
            <div class="task-header">
              <span><strong>ID:</strong> {{ item.eid }}</span>
              <span><strong>Designation:</strong> {{ item.designation }}</span>
              <span><strong>Name:</strong> {{ item.name }}</span>
            </div>
            <div class="task-body">
              <h4>{{ item.task.task }}</h4>
              <p>{{ item.task.desc }}</p>
              <button>Review</button>
              <button @click="completed(item)">Done</button>
            </div>
          </div>

          <!-- Completed Tasks -->
          <div v-if="taskView === 'done'"
               v-for="(item, idx) in completedTasks"
               :key="'done-' + idx"
               class="task-card">
            <div class="task-header">
              <span><strong>ID:</strong> {{ item.eid }}</span>
              <span><strong>Designation:</strong> {{ item.designation }}</span>
              <span><strong>Name:</strong> {{ item.name }}</span>
            </div>
            <div class="task-body">
              <h4>{{ item.task.task }}</h4>
              <p>{{ item.task.desc }}</p>
              <button class="compi">Review</button>
            </div>
          </div>

        </div>
      </section>

    </div>
  </div>
</template>

<style scoped>
  .container {
    background-color: #f3f4f6;
    min-height: 100%;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
  }

  .inner-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 10px;
  }

  .buttons {
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  button {
    padding: 10px 15px;
    border: none;
    background-color: #ddd;
    cursor: pointer;
    border-radius: 5px;
    font-size: 14px;
    transition: color 0.3s ease, background-color 0.2s ease-in, transform 0.2s ease-in-out;
  }

    button:hover {
      background-color: #21752d;
      color: #eadede;
      transform: scale(1.03);
    }

    button.active {
      background-color: #4caf50;
      color: white;
      font-weight: bold;
    }

  .task-section {
    margin-bottom: 40px;
  }

    .task-section h2 {
      margin-bottom: 10px;
      color: #333;
      font-size: 20px;
      text-align: center;
    }

  .task-list {
    background-color: white;
    border-radius: 6px;
    padding: 10px 15px;
    box-shadow: 0 0 6px rgba(0,0,0,0.1);
    max-height: 300px;
    overflow-y: auto;
  }

   
    .task-list::-webkit-scrollbar {
      width: 8px;
    }

    .task-list::-webkit-scrollbar-thumb {
      background-color: #888;
      border-radius: 4px;
    }

      .task-list::-webkit-scrollbar-thumb:hover {
        background-color: #555;
      }

  .task-card {
    padding: 15px 20px;
    margin-bottom: 15px;
    border-radius: 6px;
    background-color: #fafafa;
    box-shadow: 0 0 3px rgba(0,0,0,0.08);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

    .task-card:hover {
      box-shadow: 0 4px 12px rgb(0 0 0 / 0.12);
      transform: translateY(-5px);
    }

  .task-header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 14px;
    color: #555;
    gap: 10px;
  }

  .task-body h4 {
    margin: 0 0 5px 0;
    font-weight: 600;
    font-size: 16px;
  }

  .task-body p {
    margin: 0 0 10px 0;
    color: #666;
    font-size: 14px;
  }

  .task-body button {
    margin-right: 10px;
    background-color: #2196f3;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }

    .task-body button:last-child {
      background-color: #4caf50;
    }

  .no-tasks {
    font-style: italic;
    color: #777;
    text-align: center;
    margin: 20px 0;
    font-size: 14px;
  }



  @media (max-width: 768px) {
    .task-card {
      padding: 12px 15px;
    }

    .task-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .buttons {
      flex-direction: column;
      align-items: stretch;
    }

    .task-body button {
      margin-bottom: 8px;
      width: 100%;
    }

      .task-body button:last-child {
        margin-right: 0;
      }

    .task-list {
      padding: 10px;
    }
  }

  @media (max-width: 480px) {
    .task-body h4 {
      font-size: 15px;
    }

    .task-body p {
      font-size: 13px;
    }

    .task-body button {
      font-size: 13px;
      padding: 6px 10px;
    }

    .task-section h2 {
      font-size: 18px;
    }

    button {
      font-size: 13px;
    }
  }
</style>
