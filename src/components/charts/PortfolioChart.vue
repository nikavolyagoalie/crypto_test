<template>
  <div class="container">
    <Bar v-if="loaded" :chart-data="chartData" :chart-id="chartId"/>
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
);

export default {
  name: "PortfolioChart",
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    crypto: {
      type: Number
    }
  },
  data: () => ({
    loaded: false,
    cryptos: [crypto],
    chartData: null,
  }),
  mounted() {
    this.loaded = false;
    this.updateCharts()
    // await axios
    //   .get(
    //     "https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=14&interval=daily"
    //   )
    //   .then((res) => {
    //     let prices = res.data["prices"];
    //     this.eth_prices = prices;
    //     this.loaded = true;
    //     this.eth_prices_data = this.eth_prices.map((item) => item[1]);
    //     this.updateCharts();
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  },

  methods: {
    updateCharts() {
      this.chartData = {
        labels: ['btc'],
        datasets: [
          {
            label: "Bitcoin",
            data: [5],
            backgroundColor: "red",
          },
        ],
      };
      this.loaded = true;
    },
  },
};
</script>