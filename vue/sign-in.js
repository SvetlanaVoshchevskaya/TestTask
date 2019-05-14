const SignIn = {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    template: `
    <form @submit.prevent="submit" > 
<div class="form-group"> 
<label for="exampleInputEmail1">Email address</label>  
<input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  placeholder="Enter email"> {{email}} </input>
</div>
<div class="form-group"> 
<label for="exampleInputPassword1">Password</label> 
 <input  type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">{{password}} </input>
 </div>
 <button type="submit" class="btn btn-primary">Submit</button></form>
 `,
    methods: {
        submit() {
            fetch('http://dev.standpoint.com.ua/api/developer',
                {
                    method: 'POST',
                    mode: "no-cors",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.email, this.password),
                }
            )
                .then(respons => respons)
                .catch(error => console.log(error))
        },

    },

};


const Project = {
    data() {
        return {
            list: []
        }
    },
    template: ` 
    <ul class="list-group">
<li class="list-group-item" 
v-for="item in list"> City :{{item.exc_city}} - Place: {{item.exc_name}} </li>
</ul> 
`,
    // props: ['list'],
    created() { this.fetchData() },
    watch: { '$route'() { this.fetchData() } },
    methods: {
        fetchData() {
            fetch('http://dev.standpoint.com.ua/api/developer')
                .then(respons => respons.json())
                .then(list => {
                    console.log(list)
                    this.list = list
                })
                .catch(error => console.log(error))
        }
    }
};


const router = new VueRouter({
    routes: [
        { path: '/', name: 'sign-in', component: SignIn },
        { path: '/project', name: 'project', component: Project }],

});

const inst = new Vue({
    el: '#app',
    router,
})