<template>
<b-list-group>
  <b-list-group-item class="d-flex justify-content-between align-items-center">
    <img src="../assets/image/pyy.jpg" style="width: 80px;height: 80px;border-radius: 50%" >
    <a @click="loginout" href="#">注销</a>
  </b-list-group-item>
  <b-list-group-item class="d-flex justify-content-between align-items-center"
  v-for="item in list" @click="toRecord(item.id)" href="#">
    {{ item.title }}
    <b-badge variant="primary" pill>{{item.count}}</b-badge>
  </b-list-group-item>

  <b-list-group-item class="d-flex justify-content-between align-items-center" v-if="isadding">
    <input type="text" v-model="title" @keyup.enter="createList" />
  </b-list-group-item>
  <b-list-group-item class="d-flex justify-content-between align-items-center"
  @click="addList" href="#">
    +新建清单
  </b-list-group-item>
</b-list-group>
</template>

<script>
import bus from '../assets/bus'
export default {
data() {
	return {
		current: 0,
		title: '',
		isadding: false,
	}
},
computed: {
	list() {
      return this.$store.getters.getList;
    },
    isLogin() {
          return this.$store.getters.islogin;
        }
},
methods: {
	addList: function() {
		this.isadding = true;
	},
	createList: function() {
		this.$store.commit('addList', {title: this.title});
		this.isadding = false;
		this.title = ''
	},
	toRecord(id) {
		this.current = id;
	    bus.$emit('toid', id)
	},
    loginout() {
        this.$store.commit('setLogin', false)
        this.$router.push('/');
    }
}
}

</script>


<style>


</style>
