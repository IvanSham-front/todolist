export default {
  state: {
    activeModal: "",
    modalShow: false
  },
  getters: {
    activeModal: state => state.activeModal,
    modalShow: state => state.modalShow,
  },
  mutations: {
    set_active_modal: (state, modalName) => {
      state.activeModal = modalName
    },
    set_modal_show: (state, payload) => {
      state.modalShow = payload
    }
  },
  actions: {
    SET_OPEN_MODAL: (state, modalName) => {
      state.commit("set_active_modal", modalName)
      state.commit("set_modal_show", true)
    },
    SET_CLOSE_MODAL: (state) => {
      state.commit("set_active_modal", '')
      state.commit("set_modal_show", false)
    }
  },
}