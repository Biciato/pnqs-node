<template>
	<form action="">
		<div class="modal-card" style="width: 660px;">
			<header class="modal-card-head">
				<p class="modal-card-title">Incluir local com força de trabalho</p>
			</header>
			<section class="modal-card-body">
                <ValidationObserver v-slot="{ invalid }">
                    <form @submit.prevent="savePlace">
                        <div class="columns">
                            <div class="column is-half">
                                <b-field label="CEP">
                                    <ValidationProvider name="zipcode" rules="required" v-slot="{ errors }">
                                        <b-input type="text" name="zipcode" v-model="editedPlace.zipcode" autocomplete="post-code" :disabled="isLoading"></b-input>
                                        <span style="color: red">{{ errors[0] && 'Campo obrigatório' }}</span>
                                    </ValidationProvider>
                                </b-field>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <b-field label="Nome">
                                    <ValidationProvider name="name" rules="required" v-slot="{ errors }">
                                        <b-input type="text" name="name" v-model="editedPlace.name"></b-input>
                                        <span style="color: red">{{ errors[0] && 'Campo obrigatório' }}</span>
                                    </ValidationProvider>
                                </b-field>
                            </div>
                            <div class="column">
                                <b-field label="Quantidade de Pessoas na força de trabalho (aprox.)">
                                    <ValidationProvider name="numberFT" rules="required" v-slot="{ errors }" ref="numberFT" >
                                        <b-input type="number" name="numberFT" min="1" step="1" v-model="editedPlace.persons_qtd"></b-input>
                                        <span style="color: red">{{ errors[0] && 'Campo obrigatório' }}</span>
                                    </ValidationProvider>
                                </b-field>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <b-field label="Logradouro">
                                    <ValidationProvider name="street" rules="required" v-slot="{ errors }">
                                        <b-input type="text" name="street" v-model="editedPlace.street" :disabled="isLoading" autocomplete="address-line1"></b-input>
                                        <span style="color: red">{{ errors[0] && 'Campo obrigatório' }}</span>
                                    </ValidationProvider>
                                </b-field>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <b-field label="Número">
                                    <ValidationProvider name="number" rules="required" v-slot="{ errors }">
                                        <b-input type="number" name="number" min="1" step="1" v-model="editedPlace.number" :disabled="isLoading"></b-input>
                                        <span style="color: red">{{ errors[0] && 'Campo obrigatório' }}</span>
                                    </ValidationProvider>
                                </b-field>
                            </div>
                            <div class="column">
                                <b-field label="Complemento">
                                    <b-input type="text" :disabled="isLoading" v-model="editedPlace.complement"></b-input>
                                </b-field>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <b-field label="Cidade">
                                    <ValidationProvider name="city" rules="required" v-slot="{ errors }">
                                        <b-input type="text" name="city" v-model="editedPlace.city" :disabled="isLoading"></b-input>
                                        <span style="color: red">{{ errors[0] && 'Campo obrigatório' }}</span>
                                    </ValidationProvider>
                                </b-field>
                            </div>
                            <div class="column">
                                <b-field label="Bairro">
                                    <ValidationProvider name="neighborhood" rules="required" v-slot="{ validate, errors }">
                                        <b-input type="text" name="neighborhood" v-model="editedPlace.neighborhood" :disabled="isLoading"></b-input>
                                        <span style="color: red">{{ errors[0] && 'Campo obrigatório' }}</span>
                                    </ValidationProvider>
                                </b-field>
                            </div>
                            <div class="column">
                                <b-field label="Estado">
                                    <ValidationProvider name="state" rules="required" v-slot="{ errors }">
                                        <b-select id="estado" name="state" v-model="editedPlace.state" :disabled="isLoading">
                                            <option value="AC">Acre</option>
                                            <option value="AL">Alagoas</option>
                                            <option value="AM">Amazonas</option>
                                            <option value="AP">Amapá</option>
                                            <option value="BA">Bahia</option>
                                            <option value="CE">Ceará</option>
                                            <option value="DF">Distrito Federal</option>
                                            <option value="ES">Espírito Santo</option>
                                            <option value="GO">Goiás</option>
                                            <option value="MA">Maranhão</option>
                                            <option value="MT">Mato Grosso</option>
                                            <option value="MS">Mato Grosso do Sul</option>
                                            <option value="MG">Minas Gerais</option>
                                            <option value="PA">Pará</option>
                                            <option value="PB">Paraíba</option>
                                            <option value="PR">Paraná</option>
                                            <option value="PE">Pernambuco</option>
                                            <option value="PI">Piauí</option>
                                            <option value="RJ">Rio de Janeiro</option>
                                            <option value="RN">Rio Grande do Norte</option>
                                            <option value="RO">Rondônia</option>
                                            <option value="RS">Rio Grande do Sul</option>
                                            <option value="RR">Roraima</option>
                                            <option value="SC">Santa Catarina</option>
                                            <option value="SE">Sergipe</option>
                                            <option value="SP">São Paulo</option>
                                            <option value="TO">Tocantins</option>
                                        </b-select>
                                        <span style="color: red">{{ errors[0] && 'Por Favor, selecione um Estado' }}</span>
                                    </ValidationProvider>
                                </b-field>
                            </div>
                        </div>
                        <button type="submit" class="button is-primary" :disabled="invalid">Salvar</button>
                    </form>
				</ValidationObserver>
			</section>
			<footer class="modal-card-foot">
				<button class="button" type="button" @click="$parent.close()">Cancelar</button>
			</footer>
		</div>
	</form>
</template>

<script>

import axios from 'axios'
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
	components: {
		ValidationProvider, ValidationObserver
	},
	props: ['subscription', 'place'],
	data(){
		return {
			isLoading: false,
			masks: {
				cep: {
					delimiters: ['-'],
					blocks: [5,3],
					//numericOnly: true
				}
			},
            editedPlace: null
		}
	},
	watch: {
		"editedPlace.zipcode"(newValue){
			var cep = newValue.split("-").join("")
			if (cep.length >= 8) {
                axios.defaults.headers.common = {}
				axios.get(`https://viacep.com.br/ws/${cep}/json/`, {ignoreheaders: true}).then((res) => {
					let address = res.data
					this.editedPlace.neighborhood = address.bairro
					this.editedPlace.city = address.localidade
					this.editedPlace.street = address.logradouro
					this.editedPlace.state = address.uf
					this.editedPlace.country = "Brazil"
					this.isLoading = false
				})
			}
		}
	},
	created(){
		if (!this.place){
			this.editedPlace = {
				zipcode: "",
				street: "",
				state: "",
				neighborhood: "",
				city: "",
				country: ""
			}
		} else {
            this.editedPlace = this.place
        }
	},
	methods: {
		savePlace(){
			this.$emit('added-place', this.editedPlace)
            this.$parent.close()
		}
	}
}
</script>
