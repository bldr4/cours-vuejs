<template>
    <div>

             <!-- Modal de confirmation   -->
             <ModalUser :showModal="showModalConfirmation" :modalBackground="modalBackground">
                <div>
                    <p v-if="!isError">Utilisateur ajouté avec succès</p>
                    <p v-if="isError">erreur : {{ errorMessage }}</p>
                </div>
            </ModalUser>

<!-- ici on utilise l'event personnalisé updateUser qui est défini dans le composant UserForm et qui stock les données entrés dans le formulaire, on fait passer ces données dans la propriété de données userData via userData = $event -> $event représente newValue dans le composant UserForm  -->
    <UserForm :user="userData" @updateUser="userData = $event"/>
    <ButtonUser label="Modifier un utilisateur" backgroundColor="green" @click="updateUser()"/>

    </div>
</template>

<script>
// importer un composant enfant
//  Première étapes -> l'impoter
import UserForm from '@/components/UserForm.vue';
import ButtonUser from '@/components/ButtonUser.vue';
import ModalUser from '@/components/ModalUser.vue';

    export default {
        // Deuxième étapes -> l'exposer 
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
            updateUser(){
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
                //  enregistrer les modifs dans le localStorage
                localStorage.setItem(`user_${this.userData.id}`, JSON.stringify(this.userData));
                // faire une redirection après mise à jour
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
        },

        mounted(){
            // récupérer les paramètre passé depuis le composant userList
            let userId = this.$route.params.id;
            this.userData = JSON.parse(localStorage.getItem(`user_${userId}`));

        }
        
    }
</script>

<style scoped>


</style>