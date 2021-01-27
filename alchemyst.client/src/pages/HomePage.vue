<template>
  <div class="container-fluid">
    <div class="row justify-content-around mt-5">
      <button class="btn col-5 btn-primary" @click="buttonClick(1)">
        {{ state.button1 }}
      </button>
      <button class="btn col-5 btn-danger" @click="buttonClick(2)">
        {{ state.button1 }}
      </button>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed, reactive, onMounted } from 'vue'
import { valueService } from '../services/ValueService'
import { socketService } from '../services/SocketService'
export default {
  name: 'Component',
  setup() {
    const state = reactive({
      button1: computed(() => AppState.button1),
      button2: computed(() => AppState.button2)

    })
    onMounted(async() =>
      socketService.emit('join:room', 'general'))
    return {
      state,
      buttonClick(num) {
        valueService.buttonClick(num)
      }
    }
  }
}
</script>

<style scoped>

</style>
