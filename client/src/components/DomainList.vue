<template>
  <div>
    <div id="main">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <AppItemList :items="prefixes" title="Prefixos" v-on:addItem="addPrefix" v-on:deleteItem="deletePrefix"/>
          </div>
          <div class="col-md-6">
            <AppItemList :items="sufixes" title="Sufixos" v-on:addItem="addSufix" v-on:deleteItem="deleteSufix"/>
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
      prefixes: [],
      sufixes: [],
    }
  },
  methods: {
    addPrefix(prefix) {
      this.prefixes.push(prefix);
    },
    addSufix(sufix) {
      this.sufixes.push(sufix);
    },
    deletePrefix(prefix) {
      this.prefixes.splice(this.prefixes.indexOf(prefix), 1);
    },
    deleteSufix(sufix) {
      this.sufixes.splice(this.sufixes.indexOf(sufix), 1);
    },
  },
  computed: {
    domains() {
      const domains = [];
      for(const prefix of this.prefixes) {
        for(const sufix of this.sufixes) {
          const name = prefix + sufix;
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
    axios({
      url: 'http://localhost:4000',
      method: 'POST',
      data: {
        query: `
          {
            prefixes: items(type: "prefix"){
              id
              type
              description
            }

            sufixes: items(type: "sufix"){
              id
              type
              description
            }
          }
        `
      }
    }).then(res => {
      const query = res.data;
      this.prefixes = query.data.prefixes.map(prefix => prefix.description);
      this.sufixes = query.data.sufixes.map(sufix => sufix.description);
      console.log(query.data);
    });
  }
}
</script>

<style>
</style>
