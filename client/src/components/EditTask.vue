<template>
  <div class="container-fluid">
  	<div class="row">
			<div class="col-md-5 mx-auto">
 				<form @submit.prevent="fetchEdit(boardData.id)">
					<fieldset>							
						<p class="text-uppercase pull-center">Edit Task</p>	
 						<div class="form-group">
							<input v-model="editTitle" type="text" name="title" id="title" class="form-control input-lg" placeholder="Title">
						</div>
						<div class="form-group">
							<input v-model="editDescription" type="text" name="description" id="description" class="form-control input-lg" placeholder="Description">
						</div>
						<div class="form-group">
							 <label class="">Category</label><br>
                            <select class="" v-model="editCategory">
                              <option>--- Please select ---</option>
                              <option value="Backlog">Backlog</option>
                              <option value="To Do">To Do</option>
                              <option value="Doing">Doing</option>
                              <option value="Done">Done</option>
                            </select>
						</div>
					
 						<div>
 							<input type="submit" class="btn btn-lg btn-dark"   value="Edit">
 						</div>
					</fieldset>
				</form>
	</div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    props: ['boardData', 'baseUrl', 'changeShowEdit', 'fetchTask'],
    data(){
        return{
            editTitle : this.boardData.title,
            editDescription: this.boardData.description,
            editCategory: this.boardData.category
        }
	},
	methods: {
		fetchEdit(id){
			axios({
				method: 'patch',
				url: `${this.baseUrl}/tasks/${id}`,
				headers : {
					token: localStorage.access_token
				},
				data: {
					title : this.editTitle,
					description: this.editDescription,
					category: this.editCategory
				}
			})
			// console.log(id, this.editTitle, this.editDescription, this.category)
			.then(({data})=>{
				console.log(data)
			})
			.catch(err=>{
				console.log(err)
			})
			.then(_=>{
				this.changeShowEdit(false)
				this.fetchTask()
			})
		}
	}
}
</script>

<style>

</style>