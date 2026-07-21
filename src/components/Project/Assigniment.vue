<script setup>
  import { ref ,reactive} from 'vue'
  import { assidatas } from './Assidata.js'

 
  const userjson = localStorage.getItem('user')
  const userid = ref(null)
  const username=ref(null)
  if (userjson) {
    userid.value = JSON.parse(userjson).eid
    username.value = JSON.parse(userjson).name;
  }

  
  const user = ref(assidatas.find(t => t.id === userid.value) || { name: '', meetings: [] })

 
  const savedMeetings = localStorage.getItem(`meetings_${userid.value}`)
  if (savedMeetings) {
    user.value.meetings = JSON.parse(savedMeetings)
  }

  
  const title = ref('')
  const type = ref('')
  const date = ref('')
  const fromd = ref('')
  const tod = ref('')
  const desc = ref('')
  const access=ref(true)
  
  const showModal = ref(false)
  function openModal() {
    showModal.value=true
  }
  function closeModal() {
    showModal.value=false
  }
  function addMeeting() {
    if (!title.value || !type.value || !date.value || !fromd.value || !tod.value) {
      alert('Please fill all required fields.')
      return
    }

    if (fromd.value >= tod.value) {
      alert('End time must be after start time.')
      return
    }
    const newMeeting = {
      from: type.value.toUpperCase(),
      name: user.value.name || 'Unknown',
      mtitle: title.value,
      mdesc: desc.value,
      mdate: date.value,
      mtime: fromd.value,
      mend: tod.value,
      access: access.value,
    }

    user.value.meetings.push(newMeeting)

   
    localStorage.setItem(`meetings_${userid.value}`, JSON.stringify(user.value.meetings))

   
    title.value = ''
    type.value = ''
    date.value = ''
    fromd.value = ''
    tod.value = ''
    desc.value = ''
    access.value=true
    closeModal()
  }
  function removeMeeting(index, access) {
    if (access === false) {
      alert('access denied!');
    } else {
      user.value.meetings.splice(index, 1);
      localStorage.setItem(`meetings_${userid.value}`, JSON.stringify(user.value.meetings));
    }
  }
</script>

<template>
  <div class="container">
    <div class="top">
      <p class="ptext">Hi {{user.name}}! Upcoming Events!</p>
      <div class="innercontainer">
        <div v-if="user.meetings.length === 0">
          <p>No upcoming meetings.</p>
        </div>
        <div v-else>
          <div class="topc" v-for="(c, i) in user.meetings" :key="i">
            <h4>Title: {{ c.mtitle }}</h4>
            <div class="content">
              <span><strong>From:</strong> {{ c.from }}</span>
              <span><strong>Date:</strong> {{ c.mdate }}</span>
              <span><strong>Duration:</strong> {{ c.mtime }} - {{ c.mend }}</span>
            </div>
            <p><strong>Description: </strong>{{ c.mdesc }}</p>
            <button class="remove-btn" @click="removeMeeting(i,c.access)">Remove</button>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom">
     
      <button class="open-btn" @click="openModal">Add New Meeting</button>
    </div>

   
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content" @click.stop>
        <h3>Add New Meeting</h3>
        <div class="modal-form">
          <label>Title:</label>
          <input v-model="title" type="text" placeholder="Meeting title" />

          <label>Type:</label>
          <select v-model="type">
            <option value="" disabled>Select type</option>
            <option>Manager</option>
            <option>Team Leader</option>
            <option>Other</option>
          </select>

          <label>Date:</label>
          <input v-model="date" type="date" />

          <label>From (start time):</label>
          <input v-model="fromd" type="time" />

          <label>To (end time):</label>
          <input v-model="tod" type="time" />

          <label>Description:</label>
          <input v-model="desc" type="text" placeholder="Meeting description" />

          <div class="modal-buttons">
            <button @click="addMeeting">Save Meeting</button>
            <button class="cancel-btn" @click="closeModal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .container {
    background-color: #f9fafb;
    padding: 24px 32px;
    max-width: 100%;
    margin: 40px auto;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #333;
    height: 100%;
    box-sizing: border-box;
    box-shadow: 0 4px 15px rgb(0 0 0 / 0.05);
  }

  .top {
    background-color: #fff;
    padding: 20px 28px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);
    box-sizing: border-box;
  }

  .ptext {
    color: #007bff;
    font-weight: 700;
    font-size: 22px;
    margin-bottom: 18px;
    letter-spacing: 0.04em;
    user-select: none;
  }

  .innercontainer {
    border: 1.5px solid #007bff;
    border-radius: 7px;
    padding: 15px 20px;
    max-height: 230px;
    overflow-y: auto;
    background-color: #fafafa;
    transition: border-color 0.3s ease;
    box-sizing: border-box;
    box-shadow: 0px 1px 4px #6c5ce7;
  }

    .innercontainer:hover {
      border-color: #007bff;
    }

    .innercontainer::-webkit-scrollbar {
      width: 9px;
    }

    .innercontainer::-webkit-scrollbar-track {
      background: #f0f0f0;
      border-radius: 6px;
    }

    .innercontainer::-webkit-scrollbar-thumb {
      background-color:#007bff;
      border-radius: 6px;
      border: 2px solid #f0f0f0;
    }

      .innercontainer::-webkit-scrollbar-thumb:hover {
        background-color: #5a4ddb;
      }

  .topc {
    background-color: #fff;
    box-shadow: 0 1px 6px rgb(0 0 0 / 0.08);
    padding: 18px 22px;
    margin-bottom: 16px;
    border-radius: 8px;
    transition: box-shadow 0.3s ease;
    cursor: default;
    box-sizing: border-box;
  }

    .topc:hover {
      box-shadow: 0 4px 12px rgb(0 0 0 / 0.12);
    }

    .topc h4 {
      font-weight: 700;
      font-size: 19px;
      margin-bottom: 10px;
      color: #341f97;
    }

    .topc .content {
      display: flex;
      justify-content: space-between;
      font-size: 14.5px;
      color: #555;
      margin-bottom: 12px;
      flex-wrap: wrap;
      gap: 10px;
    }

      .topc .content span {
        flex: 1 1 120px;
      }

    .topc p {
      font-size: 14px;
      color: #444;
      line-height: 1.4;
      margin: 0;
    }
  
  .open-btn {
    width: 200px;
    margin: 20px auto 0;
    display: block;
    padding: 12px 0;
    font-weight: 700;
    font-size: 17px;
    color: white;
    background: linear-gradient(90deg, #6c5ce7, #341f97);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    user-select: none;
    transition: background 0.3s ease;
  }

    .open-btn:hover {
      background: linear-gradient(90deg, #5a4ddb, #2d186e);
      box-shadow: 0 0 12px #6c5ce7aa;
    }

  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  /* Modal content box */
  .modal-content {
    background-color: #fff;
    padding: 24px 32px;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgb(0 0 0 / 0.2);
    max-width: 400px;
    width: 90%;
    box-sizing: border-box;
  }

  /* Modal form inputs */
  .modal-form label {
    display: block;
    margin: 12px 0 6px;
    font-weight: 600;
    color: #555;
    font-size: 14px;
  }

  .modal-form input,
  .modal-form select {
    width: 100%;
    padding: 10px 12px;
    border: 1.7px solid #ccc;
    border-radius: 7px;
    font-size: 15px;
    transition: border-color 0.25s ease;
    font-family: inherit;
    color: #333;
    box-sizing: border-box;
  }

    .modal-form input:focus,
    .modal-form select:focus {
      outline: none;
      border-color: #6c5ce7;
      box-shadow: 0 0 6px #a49aff88;
    }

  /* Modal buttons container */
  .modal-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
  }

    /* Modal buttons */
    .modal-buttons button {
      flex: 1;
      padding: 12px 0;
      font-weight: 700;
      font-size: 16px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      user-select: none;
      transition: background 0.3s ease;
      margin-right: 12px;
      color: white;
      background: linear-gradient(90deg, #6c5ce7, #341f97);
    }

      .modal-buttons button:last-child {
        margin-right: 0;
        background: #ccc;
        color: #333;
      }

      .modal-buttons button:hover:not(:last-child) {
        background: linear-gradient(90deg, #5a4ddb, #2d186e);
        box-shadow: 0 0 12px #6c5ce7aa;
      }

    .modal-buttons .cancel-btn:hover {
      background: #aaa;
    }
  .remove-btn {
    margin-top: 10px;
    padding: 6px 12px;
    background-color: #e74c3c;
    border: none;
    border-radius: 6px;
    color: white;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.3s ease;
  }

    .remove-btn:hover {
      background-color: #c0392b;
    }


  /* Responsive adjustments */
  @media (max-width: 480px) {
    .modal-content {
      padding: 16px 20px;
    }

    .modal-buttons {
      flex-direction: column;
    }

      .modal-buttons button {
        margin-right: 0;
        margin-bottom: 12px;
      }

        .modal-buttons button:last-child {
          margin-bottom: 0;
        }
  }


</style>
