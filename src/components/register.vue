<template>
<div class="top-content">

	<div v-if="isshow">
		<transition name="modal">
	    <div class="modal-mask">
	      <div class="modal-wrapper">
	        <div class="modal-container">

	          <div class="modal-header">
	            <slot name="header">
	              提示信息
	            </slot>
	          </div>

	          <div class="modal-body">
	            <slot name="body">
	              {{ showmessage}}
	              <span @click="toLogin" v-if="issuccess">点击返回登陆</span>
	            </slot>
	          </div>

	          <div class="modal-footer">
	            <slot name="footer">
	              <button class="btn" @click="isshow = false">
	                OK
	              </button>
	            </slot>
	          </div>
	        </div>
	      </div>
	    </div>
	  </transition>
	</div>
        <div class="inner-bg">
            <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-6 form-box">
                    <div class="form-top">
                        <div class="form-top-left">
                            <h3>Login to our site</h3>
                            <p>Enter your username and password to log on:</p>
                        </div>
                        <div class="form-top-right">
                            <i class="fa fa-lock"></i>
                        </div>
                    </div>
                    <div class="form-bottom">
                        <div>
                            <div class="form-group">
                                <label class="sr-only" for="form-username">Username</label>
                                <input type="text" name="form-username" placeholder="Username..." class="form-username form-control" id="form-username" v-model="username">
                            </div>
                            <div class="form-group">
                                <label class="sr-only" for="form-password">Password</label>
                                <input type="password" name="form-password" placeholder="Password..." class="form-password form-control" id="form-password2" v-model="password1">
                            </div>
                            <div class="form-group">
                                <label class="sr-only" for="form-password">Password again</label>
                                <input type="password" name="form-password2" placeholder="Password again" class="form-password form-control" id="form-password" v-model="password2">
                            </div>

                        </div>
                        <center><button class="btn" @click="checkRegister">Register</button></center>
                    </div>
                </div>
                <div class="col-sm-3"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
	data() {
		return {
			username: '',
			password1: '',
			password2: '',
			showmessage: '',
			isLogin: false,
			isshow: false,
			issuccess: false
		}
	},
	methods: {
		checkRegister() {
      let user = this.$store.getters.users.find(user => {
        return (this.username === user.username);
      });
      if (!user) {
      	if (this.username ==='' || this.password1 ==='') {
      		this.showmessage = "信息为空！"
      	}else{
      		if (this.password1 === this.password2) {
      			this.issuccess = true;
	        	this.showmessage = "注册成功";
	        	let newUser = {
	        		username: this.username,
	        		password: this.password1
	        	}
	        	this.$store.commit('addUser', newUser);
	        }else{
	        	this.showmessage = "密码不匹配";
	        }
      	}
      }else {
        this.showmessage="用户名重复！"
      }
      this.isshow = true
    },
    toLogin() {
    	this.$router.push('/login');
    }
	}
}

</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
