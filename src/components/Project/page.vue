<script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()

  function logout() {
    localStorage.removeItem('user')
    router.push('/')
  }
</script>

<template>
  <div class="container">
    <div class="inner-container1">
      <div class="top">
        <div class="top-left">
          <img src="../../assets/images/icon.png" alt="icon" />
        </div>
        <div class="top-center">
          <h1>Employee DashBoard</h1>
        </div>
        <div class="top-right">
          <button @click="logout">Logout</button>
        </div>
      </div>
    </div>

    <div class="inner-container2">
      <div class="left">
        <router-link to="detail" class="left-link" active-class="active-link">Details</router-link>
        <router-link to="attend" class="left-link" active-class="active-link">Attendance</router-link>
        <router-link to="project" class="left-link" active-class="active-link">Projects</router-link>
        <router-link to="task" class="left-link" active-class="active-link">Tasks</router-link>
        <router-link to="assign" class="left-link" active-class="active-link">Notifications</router-link>
      </div>
      <div class="right">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
  
  .container {
    margin: 0;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    width: 100%;
    box-sizing: border-box;
  }

  
  .top {
    display: flex;
    align-items: center;
    background-color: white;
    padding: 0 10px;
    height: 60px;
    border-bottom: 1px solid #ddd;
    justify-content: space-between;
    gap:10px;
    margin-bottom: 5px;
    flex-wrap: wrap;
  }

  .top-left {
    flex: 0 0 40px;
  }

    .top-left img {
      border-radius: 50%;
      height: 40px;
      width: 40px;
    }

  .top-center {
    flex: 1;
    text-align: center;
  }

    .top-center h1 {
      margin: 0;
      font-size: 1.5rem;
    }

  .top-right {
    flex: 0 0 auto;
  }

    .top-right button {
      padding: 6px 12px;
      cursor: pointer;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-weight: bold;
      transition: background-color 0.3s ease;
    }

      .top-right button:hover {
        background-color: crimson;
        color: white;
        font-weight: 600;
        transform: scale(1.1);
      }

  
  .inner-container2 {
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    min-height: 90vh;
    box-sizing: border-box;
    gap: 10px;
  }

  
  .left {
    background-color: #b6b2b2;
    display: flex;
    flex-direction: column;
    flex: 1 1 200px;
    border-radius: 10px;
    border: 1px solid gray;
    
    
  }

  .left-link {
    width: 100%;
    padding: 15px 10px;
    text-decoration: none;
    color: black;
    border-radius: 4px;
    box-sizing: border-box;
    transition: background-color 0.2s ease, color 0.3s ease, border-left 0.3s ease;
  }

    .left-link:hover {
      background-color: grey;
      color: white;
      transform: scale(1.03);
      font-weight: 900;
    }

  .active-link {
    background-color: #221d1d49;
    color: white;
    font-weight: bold;
    border-left: 5px solid blue;
  }

  
  .right {
    background-color: #d4e2f8;
    border-radius: 10px;
    flex: 1 1 60%;
    padding: 20px;
    box-sizing: border-box;
    border: 1px solid gray;
    box-shadow: 0px 5px 10px #849fea;
    min-width: 250px;
  }

 
  @media (max-width: 1024px) {
    .top-center h1 {
      font-size: 1.2rem;
    }

    .left-link {
      padding: 12px 8px;
      font-size: 0.95rem;
    }

    .right {
      padding: 15px;
    }
  }

  @media (max-width: 768px) {
    .top {
      flex-direction: row;
      height: auto;
      padding: 10px;
      display: flex;
      flex-wrap:wrap;
      justify-content:space-between;
      gap:10px;
    }
    .top-left,
    .top-center,
    .top-right{
        display:flex;
        align-items:center;
    }
    .top-center {
      display:block;
    }

    .top-right {
      justify-content: flex-end;
    }

    .inner-container2 {
      flex-direction: column;
    }
    .left{
        display:flex;
        flex-wrap:nowrap;

    }
    .left-link{
        flex:0 0 auto;
        text-align:center;
        
    }

    .right {
      width: 100%;
      margin-top: 10px;
    }
  }

  
</style>
