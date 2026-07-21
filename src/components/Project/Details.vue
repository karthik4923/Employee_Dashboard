<script setup>
  import { ref, onMounted } from 'vue'

  const data = ref(null)

  onMounted(() => {
    const userJson = localStorage.getItem('user')
    if (userJson) {
      data.value = JSON.parse(userJson)
    }
  })
</script>

<template>
  <div class="container" v-if="data">
    <div class="inncont">
    <div class="row">
      <label>Name:</label>
      <span>{{ data.name }}</span>
    </div>
    <div class="row">
      <label>Age:</label>
      <span>{{ data.age }}</span>
    </div>
    <div class="row">
      <label>Designation:</label>
      <span>{{ data.role }}</span>
    </div>
    <div class="row">
      <label>Experience:</label>
      <span>{{ data.exp }}</span>
    </div>
    <div class="row">
      <label>Date of Joining:</label>
      <span>{{ data.join }}</span>
    </div>
    <div class="row">
      <label>Highest Graduation:</label>
      <span>{{ data.highest }}</span>
    </div>
    <div class="row">
      <label>Branch:</label>
      <span>{{ data.branch }}</span>
    </div>
    <div class="row">
      <label>Year of Passing:</label>
      <span>{{ data.yop }}</span>
    </div>
    <div class="row">
      <label>Father Name:</label>
      <span>{{ data.father }}</span>
    </div>
    <div class="row">
      <label>Mother Name:</label>
      <span>{{ data.mother }}</span>
    </div>
    <div class="row">
      <label>Blood Group:</label>
      <span>{{ data.blood }}</span>
    </div>
    <div class="row">
      <label>Health Problem:</label>
      <span>{{ data.problem || 'None' }}</span>
    </div>
  </div>
    </div>
  <div v-else>
    <p>No user logged in.</p>
  </div>
</template>

<style scoped>
  .container {
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    background-color: #fefefe;
  }
  .inncont{
      box-sizing:border-box;
      overflow-y:auto;
      max-height:100%;
  }
    .inncont::-webkit-scrollbar {
      width: 8px;
    }

    .inncont::-webkit-scrollbar-thumb {
      background-color: #ccc;
      border-radius: 3px;
    }
    .inncont::-webkit-scrollbar-thumb:hover {
      background-color: #2e2a2a;
      
    }

  .row {
    display: flex;
    background-color: white;
    border-bottom: 1px solid #ccc;
    padding: 10px;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  label {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: bold;
    flex: 1 1 150px;
  }

  span {
    flex: 1 2 300px;
    word-wrap: break-word;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }

  @media (max-width: 600px) {
    .row {
      flex-direction: column;
      align-items: flex-start;
    }

    label,
    span {
      flex: 1 1 100%;
      margin-bottom: 5px;
    }
  }
</style>
