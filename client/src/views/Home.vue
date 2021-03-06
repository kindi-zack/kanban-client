<template>
    <div id="body">
        <AddTask 
        :changeTasks="changeTasks" 
        :fetchTask="fetchTask"
        v-if='showAddForm' 
        :baseUrl="baseUrl"
        :changeShowAddForm="changeShowAddForm"></AddTask>

        <EditTask
        :baseUrl="baseUrl"
        v-if="showEditForm"
        :boardData="boardData"
        :fetchDataBoard="fetchDataBoard"
        :changeShowEdit="changeShowEdit"
        :fetchTask="fetchTask"></EditTask>

        <Board 
        :tasks="tasks"
        :baseUrl="baseUrl"
        :fetchTask="fetchTask"
        :changeShowEdit="changeShowEdit"
        :boardData="boardData"
        :fetchDataBoard="fetchDataBoard"></Board>
    </div>
</template>

<script>
import EditTask from '../components/EditTask'
import AddTask from '../components/AddTask'
import Board from '../components/Board'
import axios from 'axios'
export default {
    props:['baseUrl', 'showAddForm', 'changeShowAddForm', 'changeShowEdit', 'showEditForm'],
    data(){
        return {
            tasks : [],
            boardData: ''
            
        }
    },
    components: {
        Board,
        AddTask,
        EditTask
    },
    methods: {
        fetchTask(){
            axios({
                method: 'GET',
                url: `${this.baseUrl}/tasks`,
                headers: {
                    token: localStorage.access_token
                }
            })
            .then(({data})=>{
                // console.log(data)
                this.tasks = data
            })
            .catch(err=>{
                console.log(err)
            })
        },
        changeTasks(value){
            this.tasks = value
        },
        fetchDataBoard(value){
            this.boardData = value
        }
        
    },
    created(){
        this.fetchTask()
    }
}
</script>

<style>
    #body{
        margin-top: 50px;
    }
</style>