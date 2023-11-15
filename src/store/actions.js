import axios from "axios";

export default {
  async GET_ALL_ARCHIVES({ commit, state }) {
    try {
      const URL_API = `${state.url_api}/api/files`;
      const { data } = await axios.get(URL_API);
      commit("SET_ALL_ARCHIVES", data.data);
    } catch (error) {
      throw error;
    }
  },

  async UPLOAD_ARCHIVE({ commit, state }, FormData) {
    try {
      const URL_API = `${state.url_api}/api/upload`;
      const { data } = await axios.post(URL_API, FormData);

      return data;
    } catch (error) {
      throw error;
    }
  },

  async DELETE_ARCHIVE({ commit, state }, key) {
    try {
      const URL_API = `${state.url_api}/api/files/${key}`;
      const { data } = await axios.delete(URL_API);
      console.log(data);
      return data;
      
    } catch (error) {
      throw error;
    }
  },

  async DOWNLOAD_ARCHIVE({  state }, key) {
    try {
      const URL_API = `${state.url_api}/api/files/${key}`;
      const { data } = await axios.get(URL_API);
      return data;
      console.log(data);
    } catch (error) {
      throw error;
    }
  },
};
