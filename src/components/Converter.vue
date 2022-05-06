<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Crypto List</h4>
      <ul class="list-group">
        <template v-if="crypto_list && crypto_list.length">
          <li
            class="list-group-item"
            v-for="(crypto, idx) in crypto_list"
            :key="idx"
            :class="{ active: idx == currentIndex }"
            @click="setActiveCrypto(crypto, idx)"
          >
            {{ crypto.name }}
            <div>
              <input
                type="text"
                class="form-control"
                :placeholder="`Enter ${crypto.symbol} count`"
                v-model="field[crypto.id]"
              />
            </div>
          </li>
          <div>
            <ul class="crypto__inCurrence">
              <li>
                {{ Bitcoin }}
                <span>{{ ourCurrencies[0] }}</span>
              </li>
              <li>
                {{ Ethereum }}
                <span>{{ ourCurrencies[0] }}</span>
              </li>
            </ul>
          </div>
        </template>
      </ul>
    </div>
    <div class="col-md-6">
      <h4>Crypto Graphics</h4>
      <Chart/>
    </div>
  </div>
</template>
<script>
import CryptoDataService from "../services/CryptoDataService";
import Chart from "./charts/LineChart.vue"

export default {
  name: "crypto-list",
  components: {
    Chart
  },
  data() {
    return {
      crypto_list: [],
      currentCrypto: false,
      currentIndex: -1,
      field: {
        bitcoin: "",
        ethereum: "",
      },
      converters: {
        bitcoin: 0,
        ethereum: 0,
      },
      ourCryptos: ["bitcoin", "ethereum"],
      crypto_prices: [],
      ourCurrencies: ["usd"],
      crypto_prices_dayly: [],
      days: 14,
    };
  },

  methods: {
    retrieveCryptoList() {
      CryptoDataService.getAll()
        .then((res) => {
          let all = res.data;
          this.crypto_list[0] = all.find(
            (item) => item.id === this.ourCryptos[0]
          );
          this.crypto_list[1] = all.find(
            (item) => item.id === this.ourCryptos[1]
          );
          console.log(this.crypto_list);
        })
        .catch((e) => {
          console.log(e);
        });
    },

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

    dataCryptoInCurrenceDaily(crypto, currence, days, num) {
      CryptoDataService.getCryptoInCurrenceDaily(crypto, currence, days)
        .then((res) => {
          let prices = res.data;
          this.crypto_prices_dayly[num] = prices.prices;
          console.log(this.crypto_prices_dayly);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

  async mounted() {
    this.dataCryptoInCurrenceDaily(
      this.ourCryptos[0],
      this.ourCurrencies[0],
      this.days,
      0
    );
    this.dataCryptoInCurrenceDaily(
      this.ourCryptos[1],
      this.ourCurrencies[0],
      this.days,
      1
    );
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
    this.retrieveCryptoList();
  },

  computed: {
    Bitcoin() {
      return this.crypto_prices[0] * this.field["bitcoin"];
    },
    Ethereum() {
      return this.crypto_prices[1] * this.field["ethereum"];
    },
  },
};
</script>