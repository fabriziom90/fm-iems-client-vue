<script setup>
import { ref, reactive, onMounted, watch } from "vue";

const props = defineProps({
  months: Object,
  type: Number,
});

const monthsName = ref([]);

let options = ref({
  chart: {
    id: "chart",
    zoom: {
      enabled: false,
    },
  },
});
let series = ref([
  {
    name: "series-1",
    data: [],
  },
]);

onMounted(() => {
  const reversedMonths = [...props.months].reverse();
  monthsName.value = reversedMonths.map((item) => {
    return item.month.substring(0, 3);
  });

  options.value = {
    chart: {
      id: "line-chart",
      zoom: {
        enabled: false,
      },
    },
    colors: setColors(),
    xaxis: {
      categories: monthsName.value,
    },
  };

  series.value = setValues(reversedMonths, props.type);
});

const setColors = () => {
  if (props.type === 1) {
    return ["#198754"];
  } else if (props.type === 2) {
    return ["#DC3545"];
  } else {
    return ["#198754", "#DC3545"];
  }
};

const setValues = (reversedMonths, type) => {
  let graphValues;
  if (type === 1) {
    const incomesValues = reversedMonths.map((item) => {
      return item.incomes.reduce((prev, curr) => {
        prev = prev + curr.value;

        return parseFloat(prev.toFixed(2));
      }, 0);
    });

    graphValues = [
      {
        name: "Entrate",
        type: "line",
        data: incomesValues,
      },
    ];
  } else if (type === 2) {
    const exitsValues = reversedMonths.map((item) => {
      return item.exits.reduce((prev, curr) => {
        prev = prev + curr.value;

        return parseFloat(prev.toFixed(2));
      }, 0);
    });

    graphValues = [
      {
        name: "Uscite",
        type: "line",
        data: exitsValues,
      },
    ];
  } else {
    const incomesValues = reversedMonths.map((item) => {
      return item.incomes.reduce((prev, curr) => {
        prev = prev + curr.value;

        return parseFloat(prev.toFixed(2));
      }, 0);
    });

    const exitsValues = reversedMonths.map((item) => {
      return item.exits.reduce((prev, curr) => {
        prev = prev + curr.value;

        return parseFloat(prev.toFixed(2));
      }, 0);
    });

    graphValues = [
      {
        name: "Entrate",
        type: "line",
        data: incomesValues,
      },
      {
        name: "Uscite",
        type: "line",
        data: exitsValues,
      },
    ];
  }

  return graphValues;
};
</script>
<template lang="">
  <div>
    <apexchart :options="options" :series="series"></apexchart>
  </div>
</template>
<style lang=""></style>
