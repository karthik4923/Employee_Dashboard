<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { datas } from './Data.js'

  const router = useRouter()
  const user = ref('')
  const pass = ref('')
  const msg = ref('')

  function enter() {
    const foundUser = datas.find(t => t.eid === Number(user.value))
    console.log('Attempting login for user:', user.value)

    if (foundUser && foundUser.password === pass.value) {
      console.log('Login success, redirecting to /page')
      localStorage.setItem('user', JSON.stringify(foundUser))
      router.push('/page/detail')
    } else {
      console.log('Login failed')
      msg.value = 'Wrong credentials'
    }
  }
</script>

<template>
  <div class="container">
    <div class="left">
      <img src="../../assets/images/focus.png" />
    </div>
    <div class="right">
      <div class="login-wrapper">
        <div class="login-form">
          <h2>Employee Login</h2>

          <label for="eid">Employee ID</label>
          <input v-model="user" id="eid" required placeholder="Enter Employee ID" />

          <label for="password">Password</label>
          <input v-model="pass" id="password" type="password" required placeholder="Enter Password" />

          <button @click="enter">Login</button>

          <p v-if="msg" class="error">{{ msg }}</p>
        </div>
      </div>
    </div>
  </div>


</template>


<style scoped>
  .container {
    display: flex;
    height: 100vh;
    width: 100%;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

 
  .left {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    
  }

    .left img {
      max-width: 90%;
      max-height: 90%;
      object-fit: contain;
    }

  
  .right {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to right, #a1c4fd, #c2e9fb);
  }

  .login-form {
    background-color: #ffffff;
    padding: 40px 30px;
    border-radius: 10px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    width: 320px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    
  }

    .login-form h2 {
      text-align: center;
      margin-bottom: 20px;
      color: #333;
    }

  label {
    font-weight: bold;
    color: #333;
    font-size: 14px;
  }

  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    transition: border 0.3s, box-shadow 0.3s;
    font-size: 14px;
  }

    input:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }

  button {
    background-color: #007bff;
    color: white;
    padding: 12px;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
  }

    button:hover {
      background-color: #0056b3;
      transform: scale(1.02);
    }

    button:active {
      transform: scale(0.98);
    }

  .error {
    color: red;
    font-style: italic;
    text-align: center;
    margin-top: 10px;
  }
  @media (max-width: 768px) {
      .container{
          display:flex;
          flex-direction:column;
      }
      .left img{
          max-height:50%;
          max-width:70%;
      }
      .right .login-wrapper{
         padding:40px;
      }
  }
</style>
