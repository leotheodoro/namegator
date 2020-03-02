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
                      <div class="col-md">
                        {{domain.name}}
                      </div>
                      <div class="col-md text-right">
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
      }
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
        this.getItems(item.type);
      })
    },
    getItems(type) {
      axios({
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
  },
  computed: {
    domains() {
      const domains = [];
      for(const prefix of this.items.prefix) {
        for(const suffix of this.items.suffix) {
          const name = prefix.description + suffix.description;
          const url = name.toLowerCase();
          const checkout = `https://registro.br/busca-dominio?fqdn=${url}`;
          domains.push({
            name,
            checkout
          });
        }
      }

      return domains;
    }
  },
  created() {
    this.getItems("prefix");
    this.getItems("suffix");
  }
}
</script>

<style>
</style>
