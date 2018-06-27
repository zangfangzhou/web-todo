<template>
<div class="panel panel-primary">

  <b-modal ref="myModalRef" hide-footer title="新建待办事项">
    <input type="text" v-model="newItem.text" placeholder='请输入' @keyup.enter="createItem" class="form-control" />

    <el-date-picker
      v-model="newdate"
      type="datetime"
      placeholder="选择日期时间"
      align="right"
      :picker-options="pickerOptions1">
    </el-date-picker>

    <b-btn class="mt-3" variant="outline-danger" block @click="createItem">确定</b-btn>
  </b-modal>
	 <div class="panel-heading">
      <b-button style="width: 100%" @click="showModal">
        新建待办事项
      </b-button>
      <b-button style="width: 100%" @click="sortbydate">
        排序
      </b-button>
    </div>
  	<!-- use the modal component, pass in the prop -->
    <input type="text" v-model="searchinfo" placeholder='搜索' @keyup.enter="toSearch" class="form-control" />
    <b-card no-body>
	  <b-tabs pills card>
	    <b-tab title="未完成" active>

	      <table class='table table-bordered table-striped text-center'>
	        <tbody>
	            <template v-for="(item, index) in records">
	                <tr v-if="item.finished === false">
	                    <td>
	                    	<b-form-checkbox @change="item.finished = true">
						            {{ item.text }}
						            </b-form-checkbox>
	                    </td>
	                    <td>
	                        {{ item.date | formatDate }}
	                    </td>
	                </tr>
	            </template>
	        </tbody>
	    </table>
	    </b-tab>
	    <b-tab title="已完成">
	      <table class='table table-bordered table-striped text-center'>
        <tbody>
            <template v-for="(item, index) in records">
                <tr v-if="item.finished === true">
                    <td>
                        {{ item.text }}
                    </td>
                    <td>
                        {{ item.date }}
                    </td>
                    <td>
                        <a href="#" @click="deleteItem(item.text)">删除</a>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
	    </b-tab>
	  </b-tabs>
	</b-card>


</div>
</template>

<script>
import bus from '../assets/bus'
import {formatDate} from '../assets/date.js'

const toLower = text => {
  return text.toString().toLowerCase()
}

const searchByName = (items, term) => {
  if (term) {
    console.log(term)
    return items.filter(item => toLower(item.text).includes(toLower(term)))
  }
  return items
}

const getDatetime = (date) => date.getTime()

const sortbydate = (items) => {
  items.sort(function(a,b){
        return a.date > b.date
  });
  return items;
}

export default {
  data: function() {
  	return {
  		id: 0,
  		records: [],
      searchinfo:'',
      pickerOptions1: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      newdate: '',
  		newItem: {
  		 text: '',
  		 finished: false,
  		 date: new Date().getTime()
  		}
  	}
  },
  computed: {
    allItems() {
      return this.$store.getters.getAllItem;
    }
  },
  created() {
    this.init();
  },
  methods: {
  	init() {
        this.records = this.$store.getters.getTodobyId(this.id).record;
    },
  	createItem: function() {
  		this.$store.commit('addRecord',
  			{id: this.id, text: this.newItem.text, date: this.newdate.getTime()});
  		this.newItem.text = '';
      this.hideModal();
    },
    showModal () {
      this.$refs.myModalRef.show()
    },
    hideModal () {
      this.$refs.myModalRef.hide()
    },
    deleteItem(text) {
    	this.$store.commit('deleteRecord',
  			{id: this.id, text: text});
    },
    toSearch() {
      console.log(this.allItems)
      this.records = searchByName(this.allItems, this.searchinfo)
    },
    sortbydate() {
      this.records = sortbydate(this.records);
    }
  },
  mounted() {
    var self = this;
    bus.$on('toid', function(msg) {
        self.id = msg;
        self.init()
    });
  },
  filters: {
    formatDate(time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    }
  }
}

</script>


<style>


</style>
