const app = Vue.createApp({
    data(){
        return{
            //  rendu déclaratif
            message: 'Hello world !',
            htmlRaw : '<span style="color: red;">Hello world !</span>',

            // methods & computed
            nb : 5,
            nb2: 10,

            // Les directives 
            // v-bind
            URL:'https://www.google.com',
            image:'https://www.picsum.photos/200/300',
            objectOfAttr : {
                id:'container', 
                class:'wrapper'
            },
            show:false,

            // v-on
            compteur:0,
            x:0,
            y:0,

            // v-model
            inputVal:'valeur',

            // methods vs computed
            compteurA:0,
            compteurB:0,

            // binding css  
            toggleColor:false,


            // structures conditionneles 
            toggleText:false,
            number:0,


            // les boucles v-for
            arr:[1,2,3,4,5,6,7,8,9,10],
            arrFruits:['pomme','banane','poire','fraise','kiwi'],
            arrUsers:{
                name:'John',
                age:25,
                city:'Paris'
            }, 
            arrProd:[
                {
                    nom:'produit 1',
                    prix:10,
                    img:'https://www.picsum.photos/200/300'
                },
                {
                    nom:'produit 2',
                    prix:20,
                    img:'https://www.picsum.photos/200/300'
                },
                {
                    nom:'produit 3',
                    prix:30,
                    img:'https://www.picsum.photos/200/300'
                },
                {
                    nom:'produit 4',
                    prix:40,
                    img:'https://www.picsum.photos/200/300'
                }
            ]
        }
    }, 

    methods:{
        sayHello(){
            return 'Hello world from methods !';
        }, 

        // On utilise les methodes pour les événements 
        augmente(){
            return this.compteur ++;
        },
        baisse(){
            return this.compteur --;
        },
        coords(e){
             
            this.x = e.offsetX;
            this.y = e.offsetY;
        },
        cliqued(){
            alert('Vous avez cliqué  !');
        }, 

        onSubmit(e){
            // e.preventDefault();
            alert('Soumission du formulaire');
        },

        // methods vs computed
        checkValByMethods(){
            console.log('checkValByMethods');
        
            return this.compteurA % 2 === 0 ? 'pair' : 'impair';
        }
    },

    computed:{
        addition(){
            return this.nb + this.nb2;
        },

            // methods vs computed
     checkValByCmputed(){
        console.log('checkValByCmputed');
        return this.compteurA % 2 === 0 ? 'pair' : 'impair';
     },
     objCss(){
        return{
            blue: this.toggleColor,
            box:true
        }
     },
     objCss2(){
        return{
            backgroundColor: this.toggleColor ? 'red':'blue',
            border:this.toggleColor ? '10px solid blue':'10px solid red'
        }
     }
    },
    //  les watcher permettent de surveiller les changements de données
    //  les watchers prennent le nom de la propriété à surveiller
    //  on peut les faire passer deux paramètres newValue et oldValue
    watch:{
        compteurA(){
            setTimeout(()=>{
                this.compteurA = 0;
            }, 3000);
        },
        compteurB(newValue, oldValue){
           alert(`La valeur du compteur B passe de  : ${oldValue} à ${newValue}`);
        }
    },

    //  les hook de cycle de vie du composant, permettent d'executer des actions à des moments précis
    beforeCreate(){
        console.log('Je suis exécuté avant la création de l\'instance vue !');
    },
    mounted(){
        console.log('Je suis exécuté après que l\'instance vue ait été montée dans le DOM ! et les données sont accessibles, je peux afficher une propriété par exemple :', this.message);
    }, 
    beforeUpdate(){
        console.log('Je suis exécuté avant la mise à jour du DOM !');
    },
    updated(){
        console.log('Je suis exécuté après la mise à jour du DOM !');
    }

})
app.mount('#app');