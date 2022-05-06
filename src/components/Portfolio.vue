<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Crypto Porfolio</h4>
      <div class="crypto__wrapper">
        <div class="crypto__item">
          <span>{{ ourCryptos[0] }}</span>
          <span> {{ BTCinUSD }} usd</span>
          <div class="crypto__field">
            <input
              type="text"
              class="form-control"
              :placeholder="`Enter crypto`"
              v-model="field.bitcoin"
            />
            <button class="btn btn-primary" @click="BTCportfolio += +field.bitcoin; field.bitcoin='';">+</button>
            <button class="btn btn-secondary" @click="BTCportfolio -= +field.bitcoin; field.bitcoin='';">-</button>
          </div>
          {{BTCportfolio}}btc
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Porfolio Chart</h4>
      <div class="chart__wrapper">
          <PortfolioChart :crypto="BTCportfolio"/>
      </div>
    </div>
  </div>
</template>

<script>
import CryptoDataService from "../services/CryptoDataService"
import PortfolioChart from "../components/charts/PortfolioChart.vue"

export default {
  name: "portfolio",
  components: {
      PortfolioChart
  },
  data() {
    return {
      BTCportfolio: 4,
      ETHportfolio: 56,
      ourCryptos: ["bitcoin", "ethereum"],
      crypto_prices: [],
      ourCurrencies: ["usd"],
      field: {
        bitcoin: "",
        ethereum: "",
      },
    };
  },
  methods: {
    makeCryptoPriceInCurrence(crypto, currence, num) {
      CryptoDataService.getCryptoInCurrence(crypto, currence)
        .then((res) => {
          let price = res.data;
          this.crypto_prices[num] = Number(price[crypto][currence]);
          console.log(price[crypto][currence]);
          console.log(this.crypto_prices);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  async mounted() {
    this.makeCryptoPriceInCurrence(
      this.ourCryptos[0],
      this.ourCurrencies[0],
      0
    );
    this.makeCryptoPriceInCurrence(
      this.ourCryptos[1],
      this.ourCurrencies[0],
      1
    );
  },
  computed: {
    BTCinUSD() {
      return this.crypto_prices[0] * this.BTCportfolio;
    },

    ETHinUSD() {
      return this.ETHportfolio;
    },
  },
};
</script>

<style>
</style>