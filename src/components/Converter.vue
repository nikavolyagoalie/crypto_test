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
            {{ item }}
          </li>
        </template>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentCrypto">
        <h4>Crypto</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentCrypto.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label>
          {{ currentCrypto.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label>
          {{ currentCrypto.published ? "Published" : "Pending" }}
        </div>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Crypto...</p>
      </div>
    </div>
  </div>
</template>
<script>
import CryptoDataService from "../services/CryptoDataService";

export default {
  name: "crypto-list",
  data() {
    return {
      crypto_list: [],
      currentCrypto: false,
      currentIndex: -1,
      title: "",
      ourCryptos: ["bitcoin", "ethereum"],
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
  },

  mounted() {
    this.retrieveCryptoList();
  },
};
</script>