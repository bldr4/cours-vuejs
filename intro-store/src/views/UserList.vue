<template>
    <SearchBar />

    <div>    
       <UserTable :users="filteredUsers" v-on:delete-user="promptDeleteUser"/>

       <!-- Modal de validation de suppression -->
    <ModalUser :showModal="showConfirmDeleteModal" modalBackground="lightblue">
        <template #header>
            <h2>Confirmation de suppression</h2>
        </template>

        <template #body>
           <p>êtes-vous sûr de vouloir sipprimer cet utilisateur ? </p>
           <p>Cette action est irréversible !</p>
        </template>

        
        <template #footer>
            <ButtonUser label="Annuler" @click="cancelDeleteUser" backgroundColor="gray" />
             <ButtonUser label="Confirmer" @click="confirmDeleteUser" backgroundColor="red" />
        </template>
    </ModalUser>

        <!-- Modal confirmer la suppression -->
   <ModalUser :showModal="showDeletionModal" modalBackground="lightblue">
        <div>
            <p>Utilisateur supprimé avec succès</p>
        </div>
    </ModalUser>
    </div>
</template>

<script>
import UserTable from '@/components/UserTable.vue';
import SearchBar from '@/components/SearchBar.vue';
import ModalUser from '@/components/ModalUser.vue';
import ButtonUser from '@/components/ButtonUser.vue';
// On importe les helpers avant de pouvoir les utiliser
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';

    export default {
        components: {
            UserTable, 
            SearchBar,
            ModalUser,
            ButtonUser
        },
        data() {
            return {
     
            }
        },
        methods: {
            // Fonctions helpers permmettant d'appeler les éléments du store plus facilement, !!! il faut importer les helpers avant des les utiliser !!!
            // on importe les mutations et les actions dans les méthods 
                ...mapMutations(['setShowConfirmDeleteModal', 'setUserToDelete',  ]), 
                ...mapActions(['confirmDelete']),

                promptDeleteUser(userId) {
                    this.setUserToDelete(userId);
                    this.setShowConfirmDeleteModal(true); 
                },

                confirmDeleteUser() {
                    this.confirmDelete();
                },

                cancelDeleteUser() {
                     this.setShowConfirmDeleteModal(false); 
                },
            },
        computed:{
            // les states et les getters sont importés dans les computed
            ...mapState(['showConfirmDeleteModal', 'showDeletionModal']),
            //  autre manière d'importer les states 
            // loadModaConfirmBoolean(){
            //     return this.$store.state.showConfirmDeleteModal;
            // },
            ...mapGetters(['filteredUsers']) 
        },
        mounted(){
    // Appeler l'action du store pour charger les utilisateurs
      this.$store.dispatch('loadUsers');
        }
        
    }
</script>

<style scoped>
.modal-overlay{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,0.5);
    display:flex;
    justify-content:center;
    align-items:center;
}
.modal{
    background-color: #fff;
    padding:40px;
    border-radius:10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
}

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