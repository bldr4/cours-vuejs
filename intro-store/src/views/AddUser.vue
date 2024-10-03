<template>
    <div>
          <!-- Modal de confirmation   -->
    <ModalUser :showModal="showModalConfirmation" :modalBackground="modalBackground">
        <div>
            <p v-if="!isError">Utilisateur ajouté avec succès</p>
            <p v-if="isError">erreur : {{ errorMessage }}</p>
        </div>
    </ModalUser>


         <!--  formulaire pour ajouter un user -->
   <UserForm :user="userData" @updateUser="userData = $event"/>
   <ButtonUser backgroundColor="green" @click="addUser"/>
    </div>
</template>

<script>
import UserForm from '@/components/UserForm.vue';
import ButtonUser from '@/components/ButtonUser.vue';
import ModalUser from '@/components/ModalUser.vue';
import { mapMutations } from 'vuex';

    export default {
        components:{
            UserForm,
            ButtonUser,
            ModalUser
        },
        data(){
            return{
                userData:{},
                showModalConfirmation:false, 
                errorMessage:'',
                isError:false
            }
        },
        methods:{
            ...mapMutations(['addUser']),
            addUser(){
          
                if(!this.userData.firstName || !this.userData.lastName || !this.userData.email || !this.userData.password){
                    this.errorMessage='Veuillez remplir tous les champs';
                    this.showModalConfirmation=true;
                    this.isError=true;
                    setTimeout(() => { this.showModalConfirmation=false;},2000);
                
                    return;
                }

                let checkEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/
                if(!checkEmail.test(this.userData.email)){
                    this.errorMessage='Veuillez saisir un email valide';
                    this.showModalConfirmation=true;
                    this.isError=true;
                    setTimeout(() => { this.showModalConfirmation=false;},2000);
                    return;
                }
                this.$store.commit('addUser',this.userData);

                this.isError=false;
                this.showModalConfirmation=true;
                setTimeout(() => {
                    this.showModalConfirmation=false;
                    // faire une redirection avec le router
                    this.$router.push({name:'list'});
                }, 2000);
                this.userData = {};
            }
        },
        computed:{
            modalBackground(){
                return this.isError ? 'red' : 'lightblue';
            }
        }
    }
</script>

<style scoped>


</style>