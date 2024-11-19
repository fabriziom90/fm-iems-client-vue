<template lang="">
  <div class="col-12">
    <table class="table table-striped" id="detail">
      <tbody>
        <tr :key="`row-${month.month_id}`" v-for="month in months">
          <td class="p-0">
            <div class="head-cell">Mese</div>
            <div class="p-3">{{ month.month }}</div>
          </td>
          <td class="p-0">
            <div class="head-cell bg-success">Entrate</div>

            <div class="p-3" v-if="month.incomes.length > 0">
              <div
                v-for="income in month.incomes"
                :key="`income-month-${income.id}`"
              >
                {{ income.value }}€
              </div>
            </div>
            <div v-else>0€</div>
            <div class="border-top border-dark py-2">
              <strong>Totale: </strong>
              <span class="text-success">
                {{ sumValues(month.incomes, "incomes") }}€
              </span>
            </div>
          </td>

          <td class="p-0" v-if="taxesVisible">
            <div class="head-cell bg-warning">Tasse</div>
            <div class="p-3">
              <div class="p-3" v-if="month.incomes.length > 0">
                <div
                  v-for="income in month.incomes"
                  :key="`taxes-month-${income.id}`"
                >
                  {{ (income.value * 0.7).toFixed(2) }}€
                </div>
              </div>
              <div v-else>0€</div>
            </div>
            <div class="border-top border-dark py-2">
              <strong>Totale: </strong>
              <span class="text-warning">
                {{ sumValues(month.incomes, "taxes") }}€
              </span>
            </div>
          </td>

          <td class="p-0">
            <div class="head-cell bg-danger">Uscite</div>
            <div class="p-3">
              <div class="p-3" v-if="month.exits.length > 0">
                <div v-for="exit in month.exits" :key="`exit-month-${exit.id}`">
                  {{ exit.value }}€
                </div>
              </div>
              <div v-else>0€</div>
            </div>
            <div class="border-top border-dark py-2">
              <strong>Totale: </strong>
              <span class="text-danger">
                {{ sumValues(month.exits, "exits") }}€
              </span>
            </div>
          </td>
          <td class="p-0">
            <div class="head-cell bg-dark">Totale</div>
            <div class="p-3">
              <span
                v-if="taxesVisible"
                :class="
                  rowIncomes(month.incomes) -
                    rowExits(month.exits) -
                    rowTaxes(month.incomes) <
                  0
                    ? 'text-danger'
                    : 'text-success'
                "
              >
                {{
                  (
                    rowIncomes(month.incomes) -
                    rowExits(month.exits) -
                    rowTaxes(month.incomes)
                  ).toFixed(2)
                }}€
              </span>
              <span
                v-else
                :class="
                  rowIncomes(month.incomes) - rowExits(month.exits) < 0
                    ? 'text-danger'
                    : 'text-success'
                "
              >
                {{
                  (rowIncomes(month.incomes) - rowExits(month.exits)).toFixed(
                    2
                  )
                }}€
              </span>
            </div>
          </td>
        </tr>

        <tr>
          <td class="bg-primary text-white">Totali</td>
          <td>
            <span class="text-success"
              >{{ (fullIncomes = colValues(months, "incomes")) }}€
            </span>
          </td>
          <!-- Condizione se tasse visibili -->
          <td class="text-warning" v-if="taxesVisible">
            {{ (fullTaxes = colValues(months, "taxes")) }} €
          </td>

          <td>
            <span class="text-danger"
              >{{ (fullExits = colValues(months, "exits")) }}€</span
            >
          </td>
          <td
            class="head-cell"
            :class="
              taxesVisible
                ? fullIncomes - fullExits - fullTaxes > 0
                  ? 'bg-success'
                  : 'bg-danger'
                : fullIncomes - fullExits > 0
                ? 'bg-success'
                : 'bg-danger'
            "
          >
            <span v-if="taxesVisible">
              {{ (fullIncomes - fullExits - fullTaxes).toFixed(2) }}€
            </span>
            <span v-else> {{ (fullIncomes - fullExits).toFixed(2) }}€ </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";

defineProps({
  months: Array,
  taxesVisible: Boolean,
});

let visible = ref(true);
let fullIncomes = ref(0);
let fullExits = ref(0);
let fullTaxes = ref(0);

const showValues = (incomes, month, type) => {};

const sumValues = (array, type) => {
  return array
    .reduce(
      (partialSum, a) =>
        type === "taxes" ? partialSum + a.value * 0.3 : partialSum + a.value,
      0
    )
    .toFixed(2);
};

const rowIncomes = (incomes) => {
  return incomes.reduce((partialSum, a) => partialSum + a.value, 0).toFixed(2);
};

const rowExits = (exits) => {
  return exits.reduce((partialSum, a) => partialSum + a.value, 0).toFixed(2);
};

const rowTaxes = (incomes) => {
  return incomes
    .reduce((partialSum, a) => partialSum + a.value * 0.3, 0)
    .toFixed(2);
};

const colValues = (months, type) => {
  let total = 0;
  months.forEach((month) => {
    if (type === "incomes" || type === "taxes") {
      total += parseFloat(sumValues(month.incomes, type));
    } else {
      total += parseFloat(sumValues(month.exits, type));
    }
  });

  return total.toFixed(2);
};
</script>
<style lang=""></style>
