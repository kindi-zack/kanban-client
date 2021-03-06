<template>
<div class="container-fluid">
  	<div class="row">
			<div class="col-md-5 mx-auto">
 				<form @submit.prevent="addData">
					<fieldset>							
						<p class="text-uppercase pull-center">Add New Task</p>	
 						<div class="form-group">
							<input v-model="addTittle" type="text" name="title" id="title" class="form-control input-lg" placeholder="Title">
						</div>
						<div class="form-group">
							<input v-model="addDescription" type="text" name="description" id="description" class="form-control input-lg" placeholder="Description">
						</div>
						<div class="form-group">
							 <label class="">Category</label><br>
                            <select class="" v-model="addCategory">
                              <option>--- Please select ---</option>
                              <option value="Backlog">Backlog</option>
                              <option value="To Do">To Do</option>
                              <option value="Doing">Doing</option>
                              <option value="Done">Done</option>
                            </select>
						</div>
					
 						<div>
 							<input type="submit" class="btn btn-lg btn-dark"   value="Add">
 						</div>
					</fieldset>
				</form>
	</div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    props : ['baseUrl', 'changeTasks', 'fetchTask', 'changeShowAddForm'],
    data() {
        return {
            addTittle: '',
            addDescription: '',
            addCategory: ''
        }
    },
    methods: {
         addData(){
            axios({
                method: 'POST',
                url: `${this.baseUrl}/tasks`,
                data : {
                    title: this.addTittle,
                    description: this.addDescription,
                    category: this.addCategory
                },
                headers : {
                    token : localStorage.access_token
                }
            })
            .then(({data})=>{
                this.changeTasks(data)
                this.fetchTask()
            })
            .catch(err=>{
                console.log(err)
            })
            .then(_=>{
                this.changeShowAddForm(false)
            })
        }
    },
}
</script>

<style>
/* body {background-color:#eee;} */
.container-fluid {padding:50px;}
/* .container{background-color:white;padding:50px;   } */
#title{font-family: 'Lobster', cursive;;}
</style>