
      Vue.component("uncompleted", {
        props: ["text", "done", "index", "id"],
        template: `
				<div class="collection-item valign-wrapper row">
					<label class="valign-wrapper col s10">
						<i class="material-icons black-text left" v-on:click="$emit('act-update', {id, done})">check_box_outline_blank</i>						
				        <span>{{text}}</span>
				    </label>
					<i v-on:click="$emit('act-remove', text)" class=" right-align material-icons red-text col s2">close</i>
				</div>
			`
      });
      Vue.component("completed", {
        props: ["text", "done", "index", "id"],
        template: `
				<div class="collection-item valign-wrapper row">
					<label class="valign-wrapper col s10">
						<i class="material-icons black-text left" v-on:click="$emit('act-update', {id, done})">check</i>						
				        <span>{{text}}</span>
				    </label>
					<i v-on:click="$emit('act-remove', text)" class=" right-align material-icons red-text col s2">close</i>
				</div>
			`
      });
      let app = new Vue({
        el: "#app",
        data: {
          itemName: "",
          showCompleted: true,
          items: []
        },
        methods: {
          addToList() {
            if (this.itemName == "") {
              M.toast({ html: "Please enter something" });
              this.itemName = "";
              return;
            } else {
              axios
                .post("/profile/add", { text: app.itemName })
                .then(function(response) {
                  app.itemName = "";
                  app.loadData();
                })
                .catch(function(error) {
                  console.log(error);
                });
            }
          },
          removeFromList(index) {
            console.log(index);
            axios
              .post("/profile/delete", { text: index })
              .then(function(response) {
                app.loadData();
              })
              .catch(error => {
                console.log(error);
              });
          },
          updateStatus(index) {
            axios
              .post("/profile/update", { taskID: index.id, done: !index.done })
              .then(function(response) {
                app.loadData();
              })
              .catch(error => {
                console.log(error);
              });
          },
          loadData() {
            M.toast({ html: '<i class="material-icons medium">sync</i>', inDuration: "0" });
            axios
              .get("/profile/load")
              .then(response => {
                if (response.data == "login") {
                  window.location.replace("/login");
                } else {
                  app.items = [];
                  for (var i = 0; i < response.data.length; i++) {
                    app.items.push(response.data[i]);
                  }
                }
              })
              .then(() => {
                M.Toast.dismissAll();
              })
              .catch(error => {
                console.log(error);
              });
          }
        },
        mounted() {
          console.log("App mounted");
          this.loadData();
        }
      });