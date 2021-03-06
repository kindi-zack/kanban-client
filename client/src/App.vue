<template>
  <div>
      <Navbar 
      :isLogin="isLogin"
      :logout="logout"
      :changeShowAddForm="changeShowAddForm"
      :changeShowEdit="changeShowEdit"
      ></Navbar>

      <Login
      :class="displayLog"
      :changeDisplayReg="changeDisplayReg" 
      :changeDisplayLog="changeDisplayLog"
      v-if="!isLogin" 
      :baseUrl="baseUrl"
      :changeIsLogin="changeIsLogin"
      >
      </Login>

      <Register 
      :class="displayReg" 
      v-if="!isLogin"
      :changeDisplayReg="changeDisplayReg" 
      :changeDisplayLog="changeDisplayLog"
      :baseUrl="baseUrl"></Register>

      <Home v-if="isLogin" 
      :baseUrl="baseUrl"
      :showAddForm="showAddForm"
      :changeShowAddForm="changeShowAddForm"
      :changeShowEdit="changeShowEdit"
      :showEditForm="showEditForm"></Home>
  </div>
</template>

<script>
import Register from "../src/views/Register.vue"
import Login from "../src/views/Login.vue"
import Navbar from "../src/components/Navbar.vue"
import Home from "../src/views/Home.vue"

export default {
    data () {
        return {
            message: 'hello there',
            isLogin: false,
            baseUrl: 'https://kindi-kanban-server.herokuapp.com',
            showAddForm: false,
            showEditForm: false,
            displayReg: 'd-none',
            displayLog: ''
        }
    },
    components: {
        Login,
        Navbar,
        Home,
        Register
    },
    methods: {
        changeIsLogin(value){
            this.isLogin = value
        },
        logout(){
            localStorage.clear()
            this.isLogin = false
        },
        changeShowAddForm(value){
            this.showAddForm = value
        },
        changeShowEdit(value){
            this.showEditForm = value
        },
        changeDisplayReg(value){
            this.displayReg = value
        },
        changeDisplayLog(value){
            this.displayLog = value
        }
    },
    created(){
        if(localStorage.access_token){
            this.isLogin = true
        }
    }
    
}
</script>

<style>

</style>