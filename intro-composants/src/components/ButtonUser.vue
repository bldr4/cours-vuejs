<template>
     <button :class="btnClass">{{ label }}</button>
</template>

<script>
    export default {
        props:{
            label:{
                type:String,
                default:'Ajouter un utilisateur'
            }, 
            backgroundColor:String
        }, 
        computed:{
            btnClass(){
                return {
                    'green-button': this.backgroundColor === 'green',
                    'red-button': this.backgroundColor === 'red',
                    'blue-button': this.backgroundColor === 'blue'
                }
            }
        }
        
    }
</script>

<style>
.green-button{
    background-color: green;
    color: white;
}
.red-button{
    background-color: red;
    color: white;
}
.blue-button{
    background-color: blue;
    color: white;
}
</style>