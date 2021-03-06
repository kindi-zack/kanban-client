<template>
        <div  class="container row mx-auto">
          <div class="col-3" v-for="(category, index) in categories" :key="index">
            <div class="card">
              <div class="card-header">{{category}}</div>
              <div v-for="task in tasks" :key="task.id">

              <div class="card-body" v-if="category === task.category">
                  <div class="card" >
                    <strong class="card-header">{{task.title}}</strong>
                    <p >{{task.description}}</p>
                    <div class="">
                      <button @click.prevent="deleteTask(task.id)" class="btn btn-outline-dark" >Delete</button>
                      <button @click.prevent="changeShowEdit(true) || fetchDataBoard(task)" class="btn btn-dark">Edit</button>
                    </div>
                  </div> 
              </div>

              </div>
            </div>
        </div>

</template>

<script>
// import EditTask from '../components/EditTask'
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  
    props: ['tasks', 'baseUrl', 'fetchTask', 'changeShowEdit','fetchDataBoard','boardData'],
    data () {
        return {
            categories : ['Backlog', 'To Do', "Doing", 'Done'],
        }
    },
    methods: {
        deleteTask(id){
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                if (result.isConfirmed) {
                     axios({
                        url: `${this.baseUrl}/tasks/${id}`,
                        method: 'DELETE',
                        headers: {
                            token: localStorage.access_token
                        }
                    })
                    .then(({data})=>{
                        console.log(data)
                        Swal.fire(
                        'Deleted!',
                        data.msg,
                        'success'
                        )
                        this.fetchTask()
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                
                }
            })
           
        }
    }
}
</script>
    
<style>
  
</style>