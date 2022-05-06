import http from "../http-commons";
class CryptoDataService {
  getAll() {
    return http.get("/coins/list");
  }
  getCryptoInCurrence(crypto, currence) {
    return http.get(`/simple/price?ids=${crypto}&vs_currencies=${currence}`)
  }
  getCryptoInCurrenceDaily(crypto, currence, days) {
    return http.get(`/coins/${crypto}/market_chart?vs_currency=${currence}&days=${days}&interval=daily`)
  }
//   get(id) {
//     return http.get(`/tutorials/${id}`);
//   }
//   create(data) {
//     return http.post("/tutorials", data);
//   }
//   update(id, data) {
//     return http.put(`/tutorials/${id}`, data);
//   }
//   delete(id) {
//     return http.delete(`/tutorials/${id}`);
//   }
//   deleteAll() {
//     return http.delete(`/tutorials`);
//   }
//   findByTitle(title) {
//     return http.get(`/tutorials?title=${title}`);
//   }
}
export default new CryptoDataService();