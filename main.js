const app = new Vue({
    el: '#app',
    data:{
        page: 'login',
        base_url: 'http://localhost:5000/',
        username: '',
        dataLogin: {
            email : '',
            password : ''
        },
        dataRegister: {
            username: '',
            email: '',
            password: ''
        },
        inputTask: {
            title:'',
            description: '',
            category: ''
        },
        updateTask: {
            title:'',
            description: '',
            category: ''
        },
        taskDB:'',
        categories : ['Backlog', 'To Do', 'Doing', 'Done']
    },
    methods: {
        changePage(pageName){
            this.page = pageName
            console.log(`this is ${pageName} page`)
        },

        kanbanLogo(){
            this.checkAuth()
        },

        loginSubmit(){
            this.fetchUserLogin()
            // this.fetchTask()
        },

        addSubmit(){
            this.AddTask()
    
        },

        updateBtn(id){
            this.page = 'updateTask'
            
        },

        logout(){
            localStorage.clear()
            this.taskDB = ''
            this.page = 'login'
        },

        checkAuth(){
            if(localStorage.getItem('access_token')){
                this.fetchTask()
                this.page = 'home'
            }else{
                this.page = 'login'
            }
        },

        fetchRegister(){
            axios({
                method: 'post',
                url: this.base_url+'register',
                data: {
                    email: this.dataRegister.email,
                    username: this.dataRegister.username,
                    password: this.dataRegister.password
                }
            })
            .then(response=>{
                // console.log(response)
                this.page = 'login'
            })
            .catch(err=>{
                console.log('xxxxxxxxxxxxxxxxxxxxxxxx')
                console.log(err)
            })
        },

        fetchUserLogin(){
            axios({
                method: 'post',
                url : this.base_url+'login',
                data : {
                    email: this.dataLogin.email,
                    password: this.dataLogin.password
                }
            })
            .then(({data})=>{
                console.log(data)
                localStorage.setItem("access_token", data.access_token)
                this.fetchTask()
                this.page = 'home'
            })
            .catch(error=>{
                console.log('==============================================>')
                console.log(error)
            })
        },

        AddTask(){
            axios({
                method: 'post',
                url: this.base_url+'tasks',
                headers: {
                    token: localStorage.access_token
                },
                data : {
                    title : this.inputTask.title, 
                    description: this.inputTask.description, 
                    category: this.inputTask.category
                }
            })
            .then(({data})=>{
                console.log(data)
                this.taskDB.push(data)
                this.inputTask = ''
                this.page = 'home'
            })
            .catch(err=>{
                console.log(err)
            })
        },

        fetchTask(){
            axios({
                method: 'get',
                url: this.base_url+'tasks',    
                headers: {
                    token: localStorage.access_token
                }
            })
            .then(({data})=>{
                // console.log(response.data[3])
                // this.taskDB = response.data
                // console.log(data)
                data = data.map(item=>{
                    return {
                        id: item.id,
                        username: item.User.username,
                        title: item.title,
                        description: item.description,
                        category: item.category
                    }
                })
                this.username = `Hi, ${data[0].username}`
                this.taskDB = data
                // console.log(this.taskDB)
                      
            })
            .catch(err=>{
                console.log(err)
            })
        },

        deleteTask(id){
            axios({
                url: this.base_url+`tasks/${id}`,
                method: 'delete',
                headers: {
                    token: localStorage.access_token
                }
            })
            .then(response=>{
                this.fetchTask()
                console.log(response)
            })
            .catch(err=>{
                console.log('Error DELETE')
                console.log(err)
            })
        },

        fetchUpdateTask(id){
            axios({
                url : this.base_url + `tasks/${id}`,
                method: 'patch',
                headers: {
                    token : localStorage.access_token
                }
            })
        },

        onSignIn(googleUser) {
            var id_token = googleUser.getAuthResponse().id_token;
            // console.log(id_token)
            axios({
              url: base_url +'googleLogin',
              method: 'POST',
              data: {id_token},
            })
              .then((response) => {
                // localStorage.setItem("access_token", response.access_token);
                console.log(response)
                // auth();
                
              })
              .catch((err) => {
                console.log(err)
                console.log('failllllllllllllllllllllllllllllllllllllllll')
              })
          }

    },
    beforeCreate: function(){
        // console.log('before create')
       
    },
    created: function () {
        this.checkAuth()
        // console.log('created')
    },
    beforeMount : function(){
        // console.log('before mounte')
    },
    mounted: function(){
        // console.log('mounted')
    }
        

})