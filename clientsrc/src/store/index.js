import Vue from 'vue';
import Vuex from 'vuex';
import { $resource } from "./resource";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profile: {},
    pins: []
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setPins(state, pins) {
      state.pins = pins;
    },
    addPin(state, pin) {
      state.pins.push(pin);
    },
    removePin(state, pinId) {
      let removedIndex = state.pins.findIndex(p => p.id == pinId);
      if (removedIndex == -1) {
        throw new Error("Could not find pin in store with Id " + pinId);
      }

      state.pins.splice(removedIndex, 1);
    }
  },
  actions: {
    async getProfile({ commit }) {
      let profile = await $resource.get("api/profile");
      commit("setProfile", profile);
    },

    async updateProfile({ commit }, update) {
      let profile = await $resource.put("api/profile", update);
      commit("setProfile", profile);
    },


    async getPins({ commit }) {
      let pins = await $resource.get("api/pins");
      commit("setPins", pins);
    },
    async createPin({ commit }, pinData) {
      let pin = await $resource.post("api/pins", pinData);
      pin.creator = pinData.creator;
      commit("addPin", pin);
    },

    async removePin({ dispatch, commit }, id) {
      let result = await $resource.delete("api/pins/" + id);

      if (!result.id) {
        throw new Error("Pin was not deleted");
      }
      commit("removePin", result.id);
    }

  },
  modules: {
  }
});
