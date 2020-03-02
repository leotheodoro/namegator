<template>
  <div>
    <div id="main">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <AppItemList :items="items.prefix" type="prefix" title="Prefixos" v-on:addItem="addItem" v-on:deleteItem="deleteItem"/>
          </div>
          <div class="col-md-6">
            <AppItemList :items="items.suffix" type="suffix" title="Sufixos" v-on:addItem="addItem" v-on:deleteItem="deleteItem"/>
          </div>
        </div>
        <br/>
        <div class="row">
          <div class="col-md-12">
            <h5>Domínios <span class="badge badge-info">{{domains.length}}</span></h5>
            <div class="card">
              <div class="card-body">
                <ul class="list-group">
                  <li class="list-group-item" v-for="domain in domains" :key="domain.name">
                    <div class="row">
                      <div class="col-md-6">
                        {{domain.name}}
                      </div>
                      <div class="col-md-3">
                        <span class="badge" v-bind:class="[domain.available ? 'badge-primary' : 'badge-danger']">{{(domain.available ? 'Disponível' : 'Não Disponível')}}</span>
                      </div>
                      <div class="col-md-3 text-right">
                        <a v-bind:href="domain.checkout" target="_blank" class="btn btn-success">
                          <span class="fa fa-shopping-cart"></span>
                        </a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css"
import "font-awesome/css/font-awesome.css"
import AppItemList from "./AppItemList";
import axios from "axios/dist/axios";

export default {
  name: 'App',
  components: {
    AppItemList,
  },
  data: function() {
    return {
      items: {
        prefix: [],
        suffix: [],
      },
      domains: [],
    }
  },
  methods: {
    addItem(item) {
      axios({
        url: "http://localhost:4000",
        method: 'POST',
        data: {
          query: `
            mutation($item: ItemInput) {
              newItem: saveItem(item: $item) {
                id
                type
                description
              }
            }
          `,
          variables: {
            item
          }
        }
      }).then(res => {
        const query = res.data;
        const newItem = query.data.newItem;
        this.items[newItem.type].push(newItem);
        this.generateDomains();
      });
    },
    deleteItem(item) {
      axios({
        url: "http://localhost:4000",
        method: 'POST',
        data: {
          query: `
            mutation($id: Int) {
              deleted: deleteItem(id: $id)
            }
          `,
          variables: {
            id: item.id
          }
        }
      }).then(() => {
        this.items[item.type].splice(this.items[item.type].indexOf(item), 1);
        this.generateDomains();
      })
    },
    getItems(type) {
      return axios({
        url: 'http://localhost:4000',
        method: 'POST',
        data: {
          query: `
            query($type: String) {
              items: items(type: $type){
                id
                type
                description
              }
            }
          `,
          variables: {
            type
          }
        }
      }).then(res => {
        const query = res.data;
        this.items[type] = query.data.items;
      });
    },
    generateDomains() {
      axios({
        url: 'http://localhost:4000',
        method: 'POST',
        data: {
          query: `
            mutation {
              domains: generateDomains {
                name
                checkout
                available
              }
            }
          `
        }
      }).then(res => {
        const query = res.data;
        this.domains = query.data.domains;
      });
    }
  },
  created() {
    Promise.all([
      this.getItems("prefix"),
      this.getItems("suffix")
    ]).then(() => {
      this.generateDomains();
    });
  }
}
</script>

<style>
</style>
