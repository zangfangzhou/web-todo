import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage)

const STORAGE_KEY = 'todos-vuejs'
const TODO_ID = 'todoid'
const IS_LOGIN = 'islogin'
const USERS = 'users'
const USER_NUM = 'usernum'


const state = {
    todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]'),
    gid: window.localStorage.getItem(TODO_ID),
    users: JSON.parse(window.localStorage.getItem(USERS) || '[]'),
    islogin: window.localStorage.getItem(IS_LOGIN),
    usernum: JSON.parse(window.localStorage.getItem(USER_NUM) || '[]')
}

const getters = {
    todos:  state => state.todos,
    gid: state => state.gid,
    users: state => state.users,
    usernum: state => state.usernum,
    islogin: state => state.islogin,
    getList: (state) => {
      let todos = state.todos.map(todo => {
        return {
          id: todo.id,
          title: todo.title,
          count: todo.record.filter((data) => {
            if (data.finished === false) return true;
            return false;
          }).length, // 过滤到record里面 ‘checked’ 为true的数据，因为它们已经被完成了
          isDelete: todo.isDelete,
          record: todo.record
        };
      }).filter(todo => {
        if (todo.isDelete === true) return false; // 过滤掉 ‘isDelete’为true，因为已经被删除了。
        return true;
      });
      return todos;
    },
    getTodobyId: (state) => (id) => {
      let todo = state.todos.find(todo => {
        return todo.id === id;
      });
      todo ? todo.count = todo ? todo.record.filter((data) => {
        return data.checked === false;
      }).length : null : false;
      return todo;
    },
    getAllItem (state, config) {
      let allItem = [];
      state.todos.forEach((item) => {
        item.record.forEach((item) => {
            allItem.push(item);
        })
      });
      return allItem;
    }
}
const mutations = {
    addList(state, todo) {
      state.todos.push({
          id: state.gid++,
          title: todo.title,
          count: 0,
          isDelete: false,
          record: []
      })
    },
    addRecord (state, config) {
      console.log(config);
      let id = config.id;
      let text = config.text;
      let date = config.date;
      state.todos.some((t, index) => {
        if (t.id === id) {
          t.record.push({
             text: text,
             finished: false,
             date: date
          });
          return true;
        }
      });
    },
    deleteRecord (state, config) {
      let id = config.id;
      let text = config.text;
      let only = 0;
      state.todos.some((t, index) => {
        if (t.id === id){
          t.record.some((item, index) => {
            if(item.text === text) {
              only = index;
            }
          })
          t.record.splice(only, 1);
        }
      })
    },
    sortbyDate(state, id) {
      let todo = state.todos.find(todo => {
        return todo.id === id;
      })
      console.log(id)
      var record = todo.record;
      var time = (new Date().getTime());
      for(var j=0; j<record.length-1 ;j++) {
    //两两比较，如果前一个比后一个大，则交换位置。
         for(var i=0; i<record.length-1-j; i++) {
              if(record[i].date < record[i+1].date){
                  var temp = record[i];
                  record[i] = record[i+1];
                  record[i+1] = temp;
              }
          }
      }
      console.log(record);
      state.todos.find(todo => {
        return todo.id === id;
      }).record = record;
    },
    addUser(state, obj) {
      var username = obj.username;
      var password = obj.password;
      state.users.push({username: username, password: password})
    },
    setLogin (state, islogin) {
      state.islogin = islogin;
    }
}
const localStoragePlugin = store => {
  store.subscribe((mutation, { todos,gid,islogin,usernum,users}) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    window.localStorage.setItem(TODO_ID, gid)
    window.localStorage.setItem(IS_LOGIN, islogin)
    window.localStorage.setItem(USERS, JSON.stringify(users))
    window.localStorage.setItem(USER_NUM, usernum)
  })
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  plugins: [localStoragePlugin]
})
