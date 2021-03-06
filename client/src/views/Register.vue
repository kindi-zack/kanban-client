<template>
  <div class="container register-container">
        <div class="row">
            <div class="col-md-6 register-form-2 bg-secondary">
                <h3>Register</h3>
                <form @submit.prevent="register">
                    <div class="form-group">
                        <input type="text" v-model="registerUsername" class="form-control" placeholder="Your Username *" value="" />
                    </div>
                    <div class="form-group">
                        <input type="text" v-model="registerEmail" class="form-control" placeholder="Your Email *" value="" />
                    </div>
                    <div class="form-group">
                        <input type="password" v-model="registerPswd" class="form-control" placeholder="Your Password *" value="" />
                    </div>
                    <div class="form-group">
                        <input type="submit" class="btnSubmit btn btn-dark" value="register" />
                    </div>
                    <div class="form-group">
                        <a @click.prevent="changeDisplayReg('d-none') || changeDisplayLog('')" href="#" class="" value="register">Already have account? Sign in here</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
    props:['changeDisplayReg', 'changeDisplayLog', 'baseUrl'],
    data(){
        return {
            registerEmail: '',
            registerPswd: '',
            registerUsername: ''
        }
    },
    methods : {
        register(){
            axios({
                url: `${this.baseUrl}/register`,
                method: 'POST',
                data: {
                    username: this.registerUsername,
                    email: this.registerEmail,
                    password: this.registerPswd
                }
            })
            .then(({data})=>{
                console.log(data)
                Swal.fire({
                    icon: 'success',
                    title: 'Registered',
                    text: data.msg
                })
                this.changeDisplayLog('')
                this.changeDisplayReg('d-none')
            })
            .catch(err=>{
                console.log(err.response.data)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data,
                })
            })
            .then(_=>{
                this.registerEmail= '',
                this.registerPswd= '',
                this.registerUsername= ''
            })
        }
    }
}
</script>

<style>
  
    .register-container{
    margin-top: 5%;
    margin-bottom: 5%;
    /* height: 100vh; */
    /* background-color: black */
}

.row{
    justify-content: center;
}

.register-form-2{
    padding: 5%;
    /* background: #0062cc; */
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
}
.register-form-2 h3{
    text-align: center;
    /* color: #fff; */
}
.register-container form{
    padding: 10%;
}
.btnSubmit
{
    width: 50%;
    border-radius: 1rem;
    padding: 1.5%;
    border: none;
    cursor: pointer;
}

.register-form-2 .btnSubmit{
    font-weight: 600;
    /* color: #0062cc;
    background-color: #fff; */
}
.register-form-2 .ForgetPwd{
    /* color: #fff; */
    font-weight: 600;
    text-decoration: none;
}
</style>