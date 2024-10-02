<template>
    <input type="text" v-model="searchQuery" @input="onSearch" placeholder="Rechercher...">
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: ''
      };
    },
    methods: {
      onSearch() {
        this.$store.commit('setSearchQuery', this.searchQuery);
      }
    }
  };
  </script>
  