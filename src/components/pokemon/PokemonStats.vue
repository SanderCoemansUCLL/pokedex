// ...existing code...
<script setup lang="ts">
import type { PokemonDetails } from "../../types";
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import Chart from "chart.js/auto";

const props = defineProps<{ stats: PokemonDetails["stats"] }>();

const capitalize = (s = "") =>
  s ? s.charAt(0).toUpperCase() + s.slice(1) : "—";

const canvasRef = ref<HTMLCanvasElement | null>(null);
let chartInstance: any = null;

const buildChart = () => {
  if (!canvasRef.value) return;
  const labels = [
    "HP",
    "Attack",
    "Defense",
    "Sp. Att.",
    "Sp. Def.",
    "Speed",
  ].map(capitalize);
  const data = props.stats.map((s) => s.base_stat);

  const labelsWithValues = labels.map((label, index) => `${label}: ${data[index]}`);

  chartInstance = new Chart(canvasRef.value, {
    type: "radar",
    data: {
      labels: labelsWithValues,
      datasets: [
        {
          label: "Stats",
          data,
          backgroundColor: "#10B98133",
          borderColor: "#10B981",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          beginAtZero: true,
          max: 255,
          pointLabels: {
            font: {
              size: 12,
              weight: "bold",
            },
            color: "#374151",
          },
          ticks: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
        },
      },
    },
  });
};

onMounted(() => {
  buildChart();
});

watch(
  () => props.stats,
  () => {
    buildChart();
  },
  { deep: true }
);

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
});
</script>

<template>
  <div class="max-w-full">
    <div class="bg-white rounded-xl shadow p-4 text-left max-w-full">
        <canvas ref="canvasRef"></canvas>
    </div>
  </div>
</template>