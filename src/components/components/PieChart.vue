<script setup>
import { ref, onMounted, watch } from "vue";

const props = defineProps({
  months: Object,
  visible: Boolean,
});

let options = ref({
  chart: {
    id: "chart-pie",
    zoom: {
      enabled: false,
    },
    type: "pie",
  },
});
let series = ref([
  {
    name: "series-1",
    data: [],
  },
]);

const monthsName = ref([]);

onMounted(() => {
  setGraph(props.visible);
});

watch(
  () => props.visible,
  (prec) => {
    setGraph(prec);
  }
);

const setGraph = (prec) => {
  const reversedMonths = [...props.months].reverse();
  monthsName.value = reversedMonths.map((item) => {
    return item.month.substring(0, 3);
  });

  options.value = {
    chart: {
      id: "pie-chart",
      zoom: {
        enabled: false,
      },
    },
    colors: setColors(prec),
    labels: setLabels(prec),
  };

  series.value = setValues(reversedMonths, prec);
};

// Function for the graph's labels
const setLabels = (visible) => {
  let labels;
  visible
    ? (labels = ["Entrate", "Uscite", "Tasse"])
    : (labels = ["Entrate", "Uscite"]);
  return labels;
};

// Function for the graph's colors
const setColors = (visible) => {
  let colors;
  visible
    ? (colors = ["#198754", "#DC3545", "#FFC107"])
    : (colors = ["#198754", "#DC3545"]);
  return colors;
};

const setValues = (reversedMonths, visible) => {
  const incomesValues = reversedMonths.map((item) => {
    return item.incomes.reduce((prev, curr) => {
      prev = prev + curr.value;

      return parseFloat(prev.toFixed(2));
    }, 0);
  });

  const totalIncomes = incomesValues.reduce(
    (prev, curr) => (prev = prev + curr)
  );

  const exitsValues = reversedMonths.map((item) => {
    return item.exits.reduce((prev, curr) => {
      prev = prev + curr.value;

      return parseFloat(prev.toFixed(2));
    }, 0);
  });

  const totalExits = exitsValues.reduce((prev, curr) => (prev = prev + curr));

  let totalTaxes;
  let percTaxes;

  let totals;
  if (visible) {
    totalTaxes = incomesValues.reduce(
      (prev, curr) => (prev = prev + curr * 0.7)
    );

    totals = totalIncomes + totalExits + totalTaxes;
    percTaxes = (totalTaxes * 100) / totals;
  } else {
    totals = totalIncomes + totalExits;
  }

  const percIncomes = (totalIncomes * 100) / totals;
  const percExits = (totalExits * 100) / totals;

  let returns;
  visible
    ? (returns = [percIncomes, percExits, percTaxes])
    : (returns = [percIncomes, percExits]);

  return returns;
};
</script>
<template lang="">
  <div>
    <apexchart type="pie" :options="options" :series="series"></apexchart>
  </div>
</template>
<style lang=""></style>
