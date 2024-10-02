<template>
    <div class='centered'>
        <table>
            <thead>
                <tr>
                    <th>Prénom</th>
                    <th>Nom</th>
                    <th>Mail</th>
                    <th>Mot de passe</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users " :key="index">
                    <td>{{ user.firstName }}</td>
                    <td>{{ user.lastName }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.password }}</td>
                    <td>
                        <ButtonUser label="Modifier" backgroundColor="green" @click="modifyUser(index)"/>

                        <ButtonUser label="Supprimer" backgroundColor="red" @click="deleteUser(index)"/>
                        
                        <ButtonUser label="Détails" backgroundColor="blue"/>
                  
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import ButtonUser from './ButtonUser.vue';
    export default {
        components:{
            ButtonUser
        },
        
        props: {
            users: Array
        },
        methods:{
            modifyUser(indice){
                let idUserToUpdate = this.users[indice].id;
                this.$router.push({name:'update', params:{id:idUserToUpdate} });
         
            }, 
            deleteUser(loopIndex){
                let user = this.users[loopIndex];
                this.$emit('delete-user', user.id);
            }
        }
    }
</script>

<style>
.centered{
    display: flex;
    justify-content: center;
    align-items:center;
    height:100vh;
}
</style>