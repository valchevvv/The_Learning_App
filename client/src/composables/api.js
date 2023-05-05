import {ref} from "vue"
import axios from "axios"

const backendURL = "http://localhost:8080";

export default function courses() {
    const url = `${backendURL}/courses`;
    const data = ref([]);
    const error = ref(null);
    const getAllCourses = async () => {
        data.value = [];
        error.value = null;
        try {
            const res = await axios(url);
            data.value = res.data;
        }catch(error){
            error.value = err;
        }
    }

    return {
        data, error, getAllCourses
    }
}

export async function stateChange(id, newState) {
    const url = `${backendURL}/changeState?id=${id}&newState=${newState}`;
    const res = await axios(url).then(() => {
        alert("You have successfully changed the state of this course !");
    }).catch((error) => {
        console.log(error);
        alert("ERROR");
    });
}

export async function add(courseName, description, lessonsCount, state, dateAdded){
    const url = `${backendURL}/add?courseName=${courseName}&description=${description}&lessonsCount=${lessonsCount}&state=${state}&dateAdded=${dateAdded}`;
    const res = await axios(url).then(() => {
        alert("You have successfully added a course !");
    }).catch((error) => {
        console.log(error);
        alert("ERROR");
    });
}

export async function edit(id, courseName, description, lessonsCount, dateAdded){
    const url = `${backendURL}/edit?id=${id}&courseName=${courseName}&description=${description}&lessonsCount=${lessonsCount}&dateAdded=${dateAdded}`;
    const res = await axios(url).then(() => {
        alert("You have successfully edited this course !");
    }).catch((error) => {
        console.log(error);
        alert("ERROR");
    });
}

export async function remove(id){
    const url = `${backendURL}/remove?id=${id}`;
    const res = await axios(url).then(() => {
        alert("You have successfully removed this course !");
    }).catch((error) => {
        console.log(error);
        alert("ERROR");
    });
}