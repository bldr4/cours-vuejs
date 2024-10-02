<template>
        <input type="text" placeholder="votre recherche..." v-model="localSearchQuery" @input="customEvent()">
</template>

<script>
    export default {
        data(){
            return {
                localSearchQuery: ""
            }
        }, 
        methods:{
            customEvent(){
                this.$emit('search', this.localSearchQuery);
            }
        }
    }
</script>

<style>

</style>