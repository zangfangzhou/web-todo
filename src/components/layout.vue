<template>
<b-container fluid :class="{ 'newstyle': isnewstyle, 'oldstyle': !isnewstyle}" style="height: 820px">
    <b-navbar toggleable="md" type="dark" :class="{'old-nav': !isnewstyle, 'new-nav': isnewstyle}">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#">TodoList</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item href="#"  @click="isnewstyle = !isnewstyle"><font color="red" size="5"><b>更改样式</b></font></b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

<!--           <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form> -->

          <!-- <b-nav-item-dropdown right> -->
            <!-- Using button-content slot -->
            <!-- <template slot="button-content">
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Signout</b-dropdown-item>
          </b-nav-item-dropdown> -->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-row v-if="isLogin">
        <b-col sm="3">
            <menus></menus>
        </b-col>
        <b-col sm="9" style="padding-left: 5px;">
            <todo></todo>
        </b-col>
    </b-row>
    <b-row v-if="!isLogin">
        <font size='6' color='red'>请返回<a href="#" @click="toLogin">登陆！</a></font>
    </b-row>
</b-container>


</template>

<script>
import todo from './todo'
import menus from './menu'

export default {
    data() {
        return {
            isnewstyle: false
        }
    },
    computed: {
        isLogin() {
            return this.$store.getters.islogin;
        }
    },
    components: {
    todo,
    menus
  },
  methods: {
    toLogin() {
        this.$router.push('/');
    }
  }
}

</script>


<style scoped>

.oldstyle {
    background: #00FF00 url(../assets/image/n.jpg) no-repeat fixed top;
}
.newstyle {
    background: #00FF00 url(../assets/image/t.jpg) no-repeat fixed top;
}

.old-nav {
    background: #00FF00 url(../assets/image/n.jpg) no-repeat fixed top;
    color: #f00;
}

.new-nav {
    background-color: #f00;
    background: #00FF00 url(../assets/image/t.jpg) no-repeat fixed top;
}
</style>
