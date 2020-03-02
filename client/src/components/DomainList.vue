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
                        <button class="btn btn-info ml-2" @click="openDomain(domain.name)">
                          <span class="fa fa-search"></span>
                        </button>
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
import { mapState, mapActions } from 'vuex';

import AppItemList from "./AppItemList";

export default {
  name: 'App',
  components: {
    AppItemList,
  },
  data: function() {
    return {};
  },
  methods: {
    ...mapActions(["addItem", "deleteItem", "getItems", "generateDomains"]),
    openDomain(domain) {
      this.$router.push({
        path: `/domains/${domain}`
      });
    }
  },
  computed: {
    ...mapState(["items", "domains"])
  },
}
</script>

<style>
</style>
