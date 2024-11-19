<template lang="">
    <div class="row gy-3">
        <div class="col-3">
          <label class="control-label">Anno</label>
          <select
            class="form-select"
            id="year"
            name="year"
            v-model="year"
          >
            <option value="">Seleziona anno</option>
            <option v-for="year in years" :key="year.id" :value="year.id">
                {{year.year}}
            </option>
          </select>
        </div>
        <div class="col-3">
          <label htmlFor="" class="control-label">
            Mese
          </label>
          <select
            name="month"
            id="month"
            class="form-select"
            v-model="month"
          >
            <option value="">Seleziona mese</option>
                <option v-for="month in months" :key="month.id" :value="month.id">
                  {{month.month_name}}
                </option>
          </select>
        </div>
        <div class="col-3">
          <label htmlFor="" class="control-label">
            Importo
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            class="form-control"
            placeholder="Importo"
            name="amount"
            id="amount"
            v-model="amount"  
          />
        </div>
        <div class="col-12">
          <label htmlFor="" class="control-label">
            Fonte
          </label>
          <textarea
            name="customer"
            id="customer"
            class="form-control"
            placeholder="Fonte"
            v-model="customer"
          ></textarea>
        </div>
        <div class="col-12">
            <button
                type="button"
              class="btn btn-sm btn-success rounded-0 mt-3"
              @click="setFormData()"
            >
              Salva
            </button>
          </div>
      </div>
</template>
<script setup>
    import { ref, defineEmits } from 'vue';

    let year = ref('');
    let month = ref('');
    let amount = ref('');
    let customer = ref('');

    defineProps({
        years: Array,
        months: Array,
    })

    const emit = defineEmits(['handleFormData'])

    const setFormData = () => {
        const formData = {
            year: year.value,
            month: month.value,
            amount: amount.value,
            customer: customer.value
        }


        emit('handleFormData', formData)
    }


    
</script>
<style lang="">
    
</style>