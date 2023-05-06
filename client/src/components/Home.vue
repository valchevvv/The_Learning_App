<script setup>
import { onMounted } from 'vue';
import courses, {stateChange, add, edit, remove} from "../composables/api";


const {data, error, getAllCourses} = courses();
onMounted(getAllCourses);

function addF(){
  let courseName = "", description = "", lessonsCount = "", dateAdded = "";
  courseName = prompt("Enter course name:");
  description = prompt("Enter description:");
  lessonsCount = prompt("Enter lessons count:");
  dateAdded = prompt("Enter date:");
  if(!courseName || !description || !lessonsCount || !dateAdded){
    alert("You didn't fill all the blanks !");
    return;
  }

  add(courseName,description,lessonsCount,1,dateAdded);
  window.location.reload();
}

function editF(){
  
  let id = prompt("Enter course id to edit: ");
  if(!id) return;
  
  let courseNamedef = "", descriptiondef = "", lessonsCountdef = "", dateAddeddef = "";
  for (let index = 0; index < data._value.length; index++) {
      const course = data._value[index];
      if(course._id == id){
        let courseName = "", description = "", lessonsCount = "", dateAdded = "";
        courseName = prompt("Enter course name:", course.courseName);
        description = prompt("Enter description:", course.description);
        lessonsCount = prompt("Enter lessons count:", course.lessonsCount);
        dateAdded = prompt("Enter date:", course.dateAdded);
        if(!courseName || !description || !lessonsCount || !dateAdded){
          alert("You didn't fill all the blanks !");
          return;
        }
        edit(id,courseName,description,lessonsCount,dateAdded);
        window.location.reload();
        return;
      }
  }
  alert("There is not course with that id !");
  window.location.reload();
}

function removeF(){
  let id = prompt("Enter course id to remove: ");
  if(!id) return;
  remove(id);
  window.location.reload();
}

</script>

<template>
  <div id="header">
    <h1>Welcome</h1>
    <i class="far fa-user-circle"></i>
  </div>

  <div v-if="error">Error: {{ error.message }}</div>
  <div v-else-if="data">
    <table>
      <tbody>
        <tr>
          <td style="border: none;"></td>
          <td style="border: none;"></td>
          <td style="text-align: center;">
            <button @click="addF();">Add</button>
            <button @click="editF();">Edit</button>
            <button @click="removeF();">Remove</button>
          </td>
        </tr>

        <tr>
          <td>ID</td>
          <td>Course name</td>
          <td>Description</td>
          <td>Lessons count</td>
          <td>State</td>
          <td>Date added</td>
        </tr>
        <tr v-for="({_id, courseName, description, lessonsCount, state, dateAdded}, i) in data"
        :key="_id">
            <td>{{ _id }}</td>
            <td>{{ courseName }}</td>
            <td>{{ description }}</td>
            <td>{{ lessonsCount }}</td>
            <td>
              <select v-if="state" name="" @change="stateChange(_id);">
                <option value="" selected>Active</option>
                <option value="">Archive</option>
              </select>
              <select v-else @change="state_change(_id, state);">
                <option value="">Active</option>
                <option value="" selected>Archive</option>
              </select>
            </td>
            <td>{{ dateAdded }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div id="footer">
    <a href="#/home">Home</a>
    <a href="#/">Learning</a>
    <span>This is example project</span>
  </div>
</template>

<style scoped>
@import url("@/assets/home.css");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css");
</style>
