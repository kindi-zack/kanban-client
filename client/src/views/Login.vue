<template>
    <div class="container login-container">
        <div class="row">
            <div class="col-md-6 login-form-2 bg-secondary">
                <h3>Login</h3>
                <form @submit.prevent="login">
                    <div class="form-group">
                        <input type="text" v-model="loginEmail" class="form-control" placeholder="Your Email *" value="" />
                    </div>
                    <div class="form-group">
                        <input type="password" v-model="loginPswd" class="form-control" placeholder="Your Password *" value="" />
                    </div>
                    <div class="form-group">
                        <input type="submit" class="btnSubmit btn btn-dark" value="Login" />
                    </div>
                    <div class="form-group">
                        <a @click.prevent="changeDisplayReg('') || changeDisplayLog('d-none')" href="#" class="" value="Login">Don't have account? Sign up here</a>
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
    props: ['baseUrl', 'changeIsLogin', 'changeDisplayReg', 'changeDisplayLog'],
    data () {
        return {
            loginEmail : '',
            loginPswd : ''
        }
    },
    methods: {
        login(){
            axios({
                method : 'POST',
                url : `${this.baseUrl}/login`,
                data : {
                    email: this.loginEmail,
                    password: this.loginPswd
                }

            })
            .then(({data})=>{
                console.log(data.access_token)
                localStorage.setItem("access_token", data.access_token)
                this.changeIsLogin(true)
            })
            .catch((err)=>{
                // console.log('errorr <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
                console.log(err.response.data)
                Swal.fire({
                    icon: 'error',
                    text: err.response.data.msg,
                })
            })
            .then(_=>{
                this.loginEmail = ''
                this.loginPswd = ''
            })
        }
    }
}
</script>

<style>
.login-container{
    margin-top: 5%;
    margin-bottom: 5%;
    /* height: 100vh; */
    /* background-color: black */
}

.row{
    justify-content: center;
}

.login-form-2{
    padding: 5%;
    /* background: #0062cc; */
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
}
.login-form-2 h3{
    text-align: center;
    /* color: #fff; */
}
.login-container form{
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

.login-form-2 .btnSubmit{
    font-weight: 600;
    /* color: #0062cc;
    background-color: #fff; */
}
.login-form-2 .ForgetPwd{
    /* color: #fff; */
    font-weight: 600;
    text-decoration: none;
}

</style>