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
                        
                        <ButtonUser label="Détails" backgroundColor="blue" @click="openUserDetails(user)"/>
                  
                    </td>
                </tr>
            </tbody>
        </table>
        <ModalUser :showModal="showUserDetailsModal" modalBackground="lightblue">
            <div>
                <h2>Détails de l'utilisateur</h2>
                <p>Prénom: {{currentUser.firstName}}</p>
                <p>Nom: {{currentUser.lastName}} </p>
                <p>Mail:{{currentUser.email}} </p>
                <p>Mot de passe: {{currentUser.password}}</p>
                <ButtonUser label="Fermer" backgroundColor="red" @click="closeModal()"/>
            </div>
        </ModalUser>
    </div>
</template>

<script>
import ButtonUser from './ButtonUser.vue';
import ModalUser from './ModalUser.vue';
import { mapState, mapMutations } from 'vuex';
    export default {
        data(){
            return{
       
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
            ...mapMutations(['setShowUserDetailsModal', 'setCurrentUser']),
            modifyUser(indice){
                let idUserToUpdate = this.users[indice].id;
                this.$router.push({name:'update', params:{id:idUserToUpdate} });
         
            }, 
            deleteUser(loopIndex){
                let user = this.users[loopIndex];
                this.$emit('delete-user', user.id);
            }, 
            // récupérer l'utilisateur sur lequel on a cliqué puis afficher le modal de détails 
            openUserDetails(utilisateur){
               this.$store.commit('setCurrentUser', utilisateur);
               this.$store.commit('setShowUserDetailsModal', true);
            },
            closeModal(){
                this.$store.commit('setShowUserDetailsModal', false);
                this.$store.commit('setCurrentUser', {});
            }
        }, 
        computed:{
            ...mapState(['currentUser', 'showUserDetailsModal'])
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