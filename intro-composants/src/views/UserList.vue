<template>
    <SearchBar @search="filterUsers"/>

    <div>    
       <UserTable :users="filteredUsers" v-on:delete-user="promptDeleteUser"/>

       <!-- Modal de validation de suppression -->
        <!-- ici nous utilisons des solt nommés on y fat référence grâce à la syntaxe #LeNomDuSlot qui est bindé avec l'attirbut "name" du slot dans le composant enfant -->
    <ModalUser :showModal="showDeleteModalConfirmation">
        <template #header>
            <h2>Confirmation de suppression</h2>
        </template>

        <template #body>
           <p>êtes-vous sûr de vouloir supprimer cet utilisateur ? </p>
           <p>Cette action est irréversible !</p>
        </template>

        
        <template #footer>
            <ButtonUser label="Confirmer" backgroundColor="green" @click="deleteUser()"/>
            <ButtonUser label="Annuler" backgroundColor="red" @click="cancelDeleteUSer()"/>
        </template>
    </ModalUser>

        <!-- Modal confirmer la suppression -->
         <!-- Utilisation des slots non nommés -->
   <ModalUser :showModal="showDeleteModal" >
        <div>
            <p>L'utilisateur supprimé avec succès</p>
        </div>
    </ModalUser>
    </div>
</template>

<script>
import UserTable from '@/components/UserTable.vue';
import SearchBar from '@/components/SearchBar.vue';
import ModalUser from '@/components/ModalUser.vue';
import ButtonUser from '@/components/ButtonUser.vue';

    export default {
        components: {
            UserTable, 
            SearchBar,
            ModalUser,
            ButtonUser
        },
        data() {
            return {
                users: [
                    {
                        firstName: 'John',
                        lastName: 'Doe',
                        email: 'john@doe.com',
                        password: 'password'
                    },
                    {
                        firstName: 'Jane',
                        lastName: 'test',
                        email: 'jane@test.com',
                        password: 'password2'
                    }
                ],
                selectedUser: {},
                filteredUsers: [],
                showDeleteModal: false,
                showDeleteModalConfirmation: false,
                idUserToDelete:null
            }
        },
        methods: {
   
            // query correspond à la valeur de searchQuery dans le composant SearchBar, searchQuery est passé au composant UserList via l'évenement personnalisé $emit de searchBar 
            filterUsers(query){
                
                this.filteredUsers = this.users.filter(user =>{
                   return user.firstName.toLowerCase().includes(query.toLowerCase())||
                    user.lastName.toLowerCase().includes(query.toLowerCase())||
                    user.email.toLowerCase().includes(query.toLowerCase())
      
                })
                
            }, 
            cancelDeleteUSer(){
                this.showDeleteModalConfirmation = false;
                this.idUserToDelete = null;
            },
            promptDeleteUser(id){
                this.showDeleteModalConfirmation = true;
                this.idUserToDelete = id;
            }  ,    
            deleteUser(){
                let arrayIndex = this.users.findIndex(user => user.id ===  this.idUserToDelete);
                if(arrayIndex !== -1){
                    if(this.idUserToDelete){
                    localStorage.removeItem(`user_${this.idUserToDelete}`)
                    this.users.splice(arrayIndex, 1);
                    this.filteredUsers = [...this.users];
                    this.showDeleteModalConfirmation = false
                    this.showDeleteModal = true;
                    setTimeout(() => { this.showDeleteModal = false;},2000);
                    }
                    }else{
                        alert('Utilisateur introuvable');
                    }
                }
            },
        computed:{
        },
        mounted(){
            this.users = Object.keys(localStorage)
            .filter(key => key.includes('user_'))
            .map(key => JSON.parse(localStorage.getItem(key)));
            this.filteredUsers = [...this.users];
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