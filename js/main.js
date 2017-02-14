var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// Setup Firebase
var config = {
  apiKey: "AIzaSyBcQ7pCuxkJHgEJzD_yzYyHG34v2snRMXM",
  authDomain: "boi-db-ios-6b583.firebaseapp.com",
  databaseURL: "https://boi-db-ios-6b583.firebaseio.com",
  storageBucket: "boi-db-ios-6b583.appspot.com",
  messagingSenderId: "451043099307"
};
firebase.initializeApp(config);

var usersRef = firebase.database().ref('Pickups')

// create Vue app
var app = new Vue({
  // element to mount to
  el: '#app',
  // initial data
  data: {
    searchQuery: '',
    newUser: {
      name: '',
      email: ''
    },
    data: [],
  },
  // firebase binding
  // https://github.com/vuejs/vuefire
  firebase: {
    users: usersRef
  },
  // computed property for form validation state
  computed: {
    validation: function () {
      return {
        name: !!this.newUser.name.trim(),
        email: emailRE.test(this.newUser.email)
      }
    },
    isValid: function () {
      var validation = this.validation
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    },
    filteredData: function () {
      var sortKey = this.searchQuery
      var filterKey = this.searchQuery && this.searchQuery.toLowerCase()

      var data = this.users.filter(function (row) {
        return Object.keys(row).some(function (key) {
          return String(row[key]).toLowerCase().indexOf(filterKey) > -1
        })
      })

      return data
    }
  },
  // methods
  methods: {
    // addUser: function () {
    //   if (this.isValid) {
    //     usersRef.push(this.newUser)
    //     this.newUser.name = ''
    //     this.newUser.email = ''
    //   }
    // },
    // removeUser: function (user) {
    //   usersRef.child(user['.key']).remove()
    // }
  }
})
