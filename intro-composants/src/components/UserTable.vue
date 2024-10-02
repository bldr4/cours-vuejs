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
                        
                        <ButtonUser label="Détails" backgroundColor="blue" @click="showModal(user)"/>
                  
                    </td>
                </tr>
            </tbody>
        </table>


        <!-- Modal qui affiche le détail d'un utilisateur -->
        <ModalUser :showModal="showModalDetail" >
            <template #header>
                <h2>Détails de l'utilisateur {{ selectedUser.firstName }} {{ selectedUser.lastName }}</h2>
            </template>

            <template #body>
            <p>Nom : {{ selectedUser.lastName }}</p>
            <p>Prénom : {{ selectedUser.firstName }}</p>
            <p>Email : {{ selectedUser.email }}</p>

            <ButtonUser label="Fermer" backgroundColor="red" @click="closeModal(index)"/>
            </template>
        </ModalUser>
    </div>
</template>

<script>
import ButtonUser from './ButtonUser.vue';
import ModalUser from './ModalUser.vue';
    export default {
        data(){
            return{
                showModalDetail:false,
                selectedUser:{}
            }
        },
        components:{
            ButtonUser,
            ModalUser
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
            },
            showModal(utilisateur){
                this.showModalDetail = true;
                this.selectedUser = utilisateur;
            },
            closeModal(){
               return (this.showModalDetail = false);
            },
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