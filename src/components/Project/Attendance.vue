<script setup>
  import { atdatas, mdata } from './Attenddata.js';
  import { ref, onMounted } from 'vue';

  const userjson = localStorage.getItem('user');
  let userid = null;

  if (userjson) {
    userid = JSON.parse(userjson).eid;
  }

  const user = ref(atdatas.find(t => t.id === userid) || {
    name: '',
    workingDays: 0,
    leavesTaken: 0,
    monthlyGrowth: 0,
    weeklyGrowth: 0,
    yearlyGrowth: 0
  });

  const { tdays, tleaves, tholidays } = mdata[0];

  const applyd = ref(false);
  const fromdate = ref('');
  const enddate = ref('');
  const title = ref('');
  const description = ref('');
  const appliedleave = ref([]);
  const leavestore = `appliedleave_${userid}`;
  onMounted(() => {
    const savedLeaves = localStorage.getItem(leavestore);
    if (savedLeaves) {
      appliedleave.value = JSON.parse(savedLeaves);
    }
  });

  function open() {
    applyd.value = true;
  }

  function close() {
    applyd.value = false;
  }

  function applyleave() {
    if (!fromdate.value || !enddate.value || !title.value) {
      alert('Please fill From date, End date and Title');
      return;
    }

    const newLeave = {
      id: Date.now(),
      appliedOn: new Date().toLocaleDateString(),
      fromDate: fromdate.value,
      endDate: enddate.value,
      title: title.value,
      description: description.value,
    };

    appliedleave.value.push(newLeave);
    localStorage.setItem(leavestore, JSON.stringify(appliedleave.value));
    applyd.value = false;

    fromdate.value = '';
    enddate.value = '';
    title.value = '';
    description.value = '';
  }

  function cancelLeave(id) {
    appliedleave.value = appliedleave.value.filter(leave => leave.id !== id);
    localStorage.setItem(leavestore, JSON.stringify(appliedleave.value));
  }
</script>

<template>
  <div class="container">
    <h2>Attendance Summary - {{ user.name }}</h2>
    <div class="inncontain1">
      <div class="left">
        <div class="ltop">
          <table>
            <tr>
              <th>Working Days</th>
              <td>{{ user.workingDays }} / {{ tdays }}</td>
            </tr>
            <tr>
              <th>Leaves Taken</th>
              <td>{{ user.leavesTaken }} / {{ tleaves }}</td>
            </tr>
            <tr>
              <th>Holidays</th>
              <td>{{ tholidays }}</td>
            </tr>
            <tr>
              <th>Weekly Growth</th>
              <td>{{ user.weeklyGrowth }}%</td>
            </tr>
            <tr>
              <th>Monthly Growth</th>
              <td>{{ user.monthlyGrowth }}%</td>
            </tr>
            <tr>
              <th style="border-bottom: 1px solid #007bff;">Yearly Growth</th>
              <td>{{ user.yearlyGrowth }}%</td>
            </tr>
          </table>
          <div class="tbottom">
            <button @click="open">Apply for Leave</button>
          </div>
        </div>
      </div>

      <div class="right">
        <div v-if="appliedleave.length > 0" class="applied-info scrollable-vertical">
          <h3>Applied Leave Details</h3>
          <div v-for="leave in appliedleave" :key="leave.id" class="single-leave-box">
            <div class="leave-header">
              <span class="applied-on">Applied on: {{ leave.appliedOn }}</span>
              <button @click="cancelLeave(leave.id)" class="cancel-btn">Cancel Leave</button>
            </div>
            <div class="dates">
              <div><strong>From:</strong> {{ leave.fromDate }}</div>
              <div><strong>To:</strong> {{ leave.endDate }}</div>
            </div>
            <div class="title">
              <strong>Title:</strong> {{ leave.title }}
            </div>
            <div class="description">
              <strong>Description:</strong> {{ leave.description || 'N/A' }}
            </div>
          </div>
        </div>
        <div v-else class="applied-info">
          <h3>No leaves applied</h3>
        </div>
      </div>

    
      <div v-if="applyd" class="modal-overlay" @click.self="close">
        <div class="modal-content">
          <h3>Apply for Leave</h3>
          <label>From date</label>
          <input type="date" v-model="fromdate" />
          <label>End date</label>
          <input type="date" v-model="enddate" />
          <label>Title</label>
          <input type="text" v-model="title" />
          <label>Description</label>
          <input type="text" v-model="description" />
          <div class="modal-buttons">
            <button @click="applyleave">Apply</button>
            <button @click="close" class="cancel-btn">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .container {
    padding: 20px;
    background-color: #f3f4f6;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .inncontain1 {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .left,
  .right {
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    flex: 1 1 100%;
    box-sizing: border-box;
    min-width: 0; 
  }


  table {
    border-collapse: collapse;
    border: 1px solid #007bff;
    padding: 10px;
    width: 100%;
  }

  tr {
    border: 1px solid #007bff;
  }

  th {
    background-color: #007bff;
    color: white;
    font-weight: bold;
    padding: 10px;
    border-bottom: 1px solid white;
    text-align: left;
  }

  td {
    background-color: white;
    padding: 10px;
  }

  .tbottom {
    display: flex;
    padding: 10px 0;
  }

    .tbottom button {
      background-color: orangered;
      color: white;
      font-weight: bold;
      border: none;
      padding: 10px 20px;
      border-radius: 15px;
      cursor: pointer;
    }

  

  .applied-info {
    line-height: 1.6;
  }

  
  .scrollable-vertical {
    max-height: 300px; /* limit height */
    overflow-y: auto; /* enable vertical scroll */

    padding-right: 10px; /* padding for scrollbar */
  }

  .single-leave-box {
    display: block; /* block to stack vertically */
    background: #f9f9ff;
    border: 1px solid #007bff;
    border-radius: 10px;
    padding: 15px 20px;
    margin-bottom: 15px; /* spacing between leaves */
    box-sizing: border-box;
    box-shadow: 0 3px 8px rgba(0,0,0,0.1);
    white-space: normal; /* allow text wrap */
  }

  .leave-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .applied-on {
    font-size: 0.9rem;
    color: #666;
  }

  .cancel-btn {
    background-color: orangered;
    color: white;
    border: none;
    padding: 5px 12px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.9rem;
    transition: background-color 0.3s ease;
  }

    .cancel-btn:hover {
      background-color: #d64527;
    }

  .dates {
    display: flex;
    justify-content: flex-start;
    gap: 20px;
    font-size: 0.95rem;
    margin-bottom: 8px;
  }

  .title {
    font-weight: 600;
    margin-bottom: 6px;
    font-size: 1rem;
    color: #007bff;
  }

  .description {
    font-size: 0.9rem;
    color: #333;
  }

 
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-content {
    background: white;
    padding: 30px 40px;
    border-radius: 12px;
    width: 350px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

    .modal-content label {
      font-weight: 600;
    }

    .modal-content input {
      padding: 8px 10px;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 14px;
    }

  .modal-buttons {
    margin-top: 15px;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }

    .modal-buttons button {
      padding: 8px 16px;
      font-weight: 600;
      border-radius: 8px;
      border: none;
      cursor: pointer;
    }

      .modal-buttons button:first-child {
        background-color: mediumpurple;
        color: white;
      }

    .modal-buttons .cancel-btn {
      background-color: #ccc;
      color: #333;
    }
  @media (min-width: 768px) {
    .left,
    .right {
      flex: 1 1 48%;
    }
  }
 
  @media (max-width: 768px) {
    .container {
      padding: 10px;
    }

    h2 {
      font-size: 1.2rem;
      text-align: center;
    }

    .modal-content {
      width: 90%;
      padding: 20px;
    }

    .dates {
      flex-direction: column;
      gap: 8px;
    }

    table, th, td {
      font-size: 14px;
    }

    .modal-buttons {
      flex-direction: column;
      align-items: stretch;
    }

      .modal-buttons button {
        width: 100%;
      }
  }

  @media (max-width: 480px) {
    th, td {
      font-size: 13px;
    }

    .title, .description {
      font-size: 0.85rem;
    }

    .cancel-btn {
      padding: 5px 8px;
      font-size: 0.8rem;
    }
  }

</style>
