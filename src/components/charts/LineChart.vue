<template>
  <div class="container">
    <Line v-if="loaded" :chart-data="chartData" :chart-id="chartId"/>
  </div>
</template>

<script>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";
import axios from "axios";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

export default {
  name: "BarChart",
  components: { Line },
  props: {
    chartId: {
      type: String,
      default: "line-chart",
    },
  },
  data: () => ({
    loaded: false,
    btc_prices: [],
    eth_prices: [],
    chart_labels: [],
    btc_prices_data: [],
    eth_prices_data: [],
    chartData: null,
  }),
  async mounted() {
    this.loaded = false;

    await axios
      .get(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=14&interval=daily"
      )
      .then((res) => {
        let prices = res.data["prices"];
        this.btc_prices = prices;
        this.loaded = true;
        this.chart_labels = this.btc_prices.map((item) => item[0]);
        this.btc_prices_data = this.btc_prices.map((item) => item[1]);
        this.updateCharts();
      })
      .catch((e) => {
        console.log(e);
      });

    await axios
      .get(
        "https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=14&interval=daily"
      )
      .then((res) => {
        let prices = res.data["prices"];
        this.eth_prices = prices;
        this.loaded = true;
        this.eth_prices_data = this.eth_prices.map((item) => item[1]);
        this.updateCharts();
      })
      .catch((e) => {
        console.log(e);
      });
  },

  methods: {
    datePrepare(date) {
      let d = new Date(date);
      return `${d.getdate()} ${d.getMonth()} ${d.getFullYear()}`;
    },

    updateCharts() {
      this.chartData = {
        labels: this.chart_labels,
        datasets: [
          {
            label: "Bitcoin",
            data: this.btc_prices_data,
            backgroundColor: "red",
          },

          {
            label: "Ethereum",
            data: this.eth_prices_data,
            backgroundColor: "blue",
          },
        ],
      };
    },
  },
};
</script>