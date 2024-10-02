<template>
    <div>
        <input type="text" placeholder="Votre prénom" v-model="localUserData.firstName">
        <input type="text" placeholder="Votre Nom" v-model="localUserData.lastName">
        <input type="text" placeholder="Votre Email" v-model="localUserData.email">
        <input type="text" placeholder="Votre mot de passe" v-model="localUserData.password">
    </div>
</template>

<script>
    export default {
        props:['user'], 
        computed:{
            localUserData:{
                get(){
                    return this.user;
                },
                set(newValue){
                    this.$emit('updateUser', newValue);
                }
            }
        }
    }
</script>

<style>

</style>