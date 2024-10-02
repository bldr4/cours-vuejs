<template>
       <div class="modal-overlay" v-if="showModal">
            <div class="modal" :style="{ backgroundColor: modalBackground }">
                <div>
                    <!-- Ici on inject un contenu perso avec un slot non nommé -->
                     <slot></slot>

                     <!-- Slot nommé pour structurer un élément  -->
                        <div v-if="$slots.header">
                            <slot name="header">
                            </slot>
                        </div>
              

                        <div v-if="$slots.body">
                            <slot name="body">
                            </slot>
                        </div>

                        <div v-if="$slots.footer">
                            <slot name="footer">
                            </slot>
                        </div>
                        
                </div>
            </div>
         </div>
</template>

<script>
    export default {
        props:{
        showModal:Boolean,
        modalBackground:{
            type:String, 
         default: 'lightblue'
        }
        },
    }
</script>

<style>
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


</style>