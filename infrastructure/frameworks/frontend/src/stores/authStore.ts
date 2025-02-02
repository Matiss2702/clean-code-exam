import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  actions: {
    setUser(userData: any) {
      this.user = userData;
    },
    setToken(token: string) {
      this.token = token;
      localStorage.setItem("token", token);
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
    }
  }
});
