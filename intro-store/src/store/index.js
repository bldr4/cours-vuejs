import { createStore } from 'vuex';

const store = createStore({
    state:{
        users: [],
        filteredUsers: [],
        searchQuery: '',

        showConfirmDeleteModal: false, 
        showDeletionModal: false,
        showUserDetailsModal: false,

        userToDeleteId: null, 
        currentUser: {}, 
    },
    mutations:{
    // Permet de mettre à jour le state 
    setUsers(state, users) {
        state.users = users;
        state.filteredUsers = users; 

    // Pour initialiser filteredUsers
      },
      setSearchQuery(state, query) {
        state.searchQuery = query;
      },

    //   mutation pour gérer l'affichage des modal
       setShowUserDetailsModal(state, flag) {
          state.showUserDetailsModal = flag;
        },
        setShowDeletionModal(state, flag) {
          state.showDeletionModal = flag;
        },
        setShowConfirmDeleteModal(state, flag) {
          state.showConfirmDeleteModal = flag;
        },

        setCurrentUser(state, user) {
            state.currentUser = user;
        },
        setUserToDelete(state, userId) {
        state.userToDeleteId = userId;
        },


        // Supprimer un utilisateur 
        deleteUser(state) {
            const index = state.users.findIndex(user => user.id === state.userToDeleteId);
            if (index !== -1) {
              state.users.splice(index, 1);
              localStorage.removeItem(`user_${state.userToDeleteId}`);
              state.filteredUsers = state.users;
              state.userToDeleteId = null;
            }
          },
  

    },
    actions:{

    loadUsers(context) {
      const users = Object.keys(localStorage)
        .filter(key => key.startsWith('user_'))
        .map(key => JSON.parse(localStorage.getItem(key)));
      context.commit('setUsers', users);
    },
    loadUser(context, userId) {
      const userStr = localStorage.getItem(`user_${userId}`);
      if (userStr) {
        const userObj = JSON.parse(userStr);
        context.commit('setCurrentUser', userObj);
      } else {
        alert('Utilisateur non trouvé');
        
      }
    },

    confirmDelete(context) {
      context.commit('deleteUser');
      context.commit('setShowConfirmDeleteModal', false);
      context.commit('setShowDeletionModal', true);
      setTimeout(() => {
        context.commit('setShowDeletionModal', false);
      }, 3000);
    }, 


    },
    getters:{
        filteredUsers(state) {
            if (!state.searchQuery) return state.users;
            const query = state.searchQuery.toLowerCase();
            return state.users.filter(user =>
              user.firstName.toLowerCase().includes(query) ||
              user.lastName.toLowerCase().includes(query) ||
              user.email.toLowerCase().includes(query)
            );
          },
    }
});

export default store;