<template>
    <div class="modal-card" style="width: 660px;">
        <header class="modal-card-head">
            <p class="modal-card-title">Cadastrar Contato</p>
        </header>
        <section class="modal-card-body">
            <ValidationObserver v-slot="{ invalid }">
                <form @submit.prevent="saveContact">
                    <div class="columns">
                        <div class="column">
                            <b-field :label="label">
                                <ValidationProvider name="categoria" rules="required" v-slot="{ errors }">
                                    <b-select v-model="editContact.type" name="categoria">
                                        <option :value="category.key" 
                                                v-for="category in uniques()" 
                                                v-bind:key="category.id">
                                                {{ category.val }}
                                        </option>
                                    </b-select>
                                    <span style="color: red">{{ errors[0] }}</span>
                                </ValidationProvider>
                            </b-field>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <b-field label="Nome">
                                <ValidationProvider name="name" rules="required" v-slot="{ errors }">
                                    <b-input type="text" v-model="editContact.name" name="name"></b-input>
                                    <span style="color: red">{{ errors[0] }}</span>
                                </ValidationProvider>
                            </b-field>
                        </div>
                        <div class="column">
                            <b-field label="Telefone">
                                <b-input type="text" v-model="editContact.phone" name="phone" v-mask="'(##) #####-####'" ></b-input>
                            </b-field>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <b-field label="E-mail">
                                <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                                    <b-input type="email" v-model="editContact.email" name="email"></b-input>
                                    <span style="color: red">{{ errors[0] }}</span>
                                </ValidationProvider>
                            </b-field>
                        </div>
                    </div>
                    <button class="button is-primary" type="submit" :disabled="invalid">Salvar</button>
                </form>
            </ValidationObserver>
        </section>
        <footer class="modal-card-foot">
            <button class="button" type="button" @click="$parent.close()">Cancelar</button>
        </footer>
    </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import store from '../../../store'

export default {
	components: {
		ValidationProvider, ValidationObserver
	},
	props: ['subscription', 'contact'],
	data(){
		return {
			editContact: {
                type: "",
                phone: '',
                email: '',
                name: ''
			},
            categories: [
                { key: "DIR", val: 'Principal dirigente' },  
                { key: "RES", val: 'Responsável Candidatura' },
                { key: "APR", val: 'Apresentador do Case  no Seminário de benchmarking' },
                { key: "REP", val: 'Representante no Seminário de benchmarking' },
                { key: "FOR", val: 'Fornecedor indicado' }
            ], 
            label: `${this.subscription.subscription_category_id === '4' ? 'Tipo de' : 'Categoria do'} Contato`
		}
	},
	created(){
		if (this.contact){
			this.editContact = this.contact
		}
	},
	methods: {
		saveContact(){
            this.subscription.contacts.push(this.editContact)
            store.commit('subscription/setSubscription', this.subscription)
            this.$parent.close()
        },
        uniques() {
            let categories = this.categories.filter(cat => 
                !this.subscription.contacts.some(contact => contact.type === cat.key))
            if (this.subscription.subscription_subcategory_id === '6') {
                categories = categories.filter(cat => cat.key !== 'FOR')
            }   
            return categories 
        }
	}
}
</script>
