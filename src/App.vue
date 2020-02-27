<template>
  <div>
    <div id="slogan" class="text-center">
      <h1>Namegator</h1>
      <br/>
      <h6 class="text-secondary">Gerador de nomes utilizando Vue.js, GraphQL e Node</h6>
    </div>
    <div id="main">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h5>Prefixos <span class="badge badge-info">0</span></h5>
            <div class="card">
              <div class="card-body">
                <ul class="list-group">
                  <li class="list-group-item" v-for="prefix in prefixes" :key="prefix">
                    {{prefix}}
                  </li>
                </ul>
                <br/>
                <input type="text" placeholder="Digite o prefixo..." class="form-control">
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <h5>Sufixos <span class="badge badge-info">0</span></h5>
            <div class="card">
              <div class="card-body">
                <ul class="list-group">
                  <li class="list-group-item" v-for="sufix in sufixes" :key="sufix">
                    {{sufix}}
                  </li>
                </ul>
                <br/>
                <input type="text" placeholder="Digite o sufixo..." class="form-control">
              </div>
            </div>
          </div>
        </div>
        <br/>
        <div class="row">
          <div class="col-md-12">
            <h5>Domínios <span class="badge badge-info">0</span></h5>
            <div class="card">
              <div class="card-body">
                <ul class="list-group">
                  <li class="list-group-item" v-for="domain in domains" :key="domain">
                    {{domain}}
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

export default {
  name: 'App',
  data: function() {
    return {
      prefixes: ['Air', 'Jet', 'Flight'],
      sufixes: ['Hub', 'Station', 'Mart'],
      domains: ['AirHub', 'AirStation', 'AirMart', 'JetHub', 'JetStation', 'JetMart']
    }
  }
}
</script>

<style>
#slogan {
  margin-bottom: 30px;
  margin-top: 30px;
}

#main {
  background-color: #f1f1f1;
  padding-top: 30px;
  padding-bottom: 30px;
}
</style>
