<script setup lang="ts">
import { ref } from 'vue'
import { createTRPCClient, setAuthorization } from "@you/trpc/client/client"
defineProps<{ msg: string }>()

</script>

<template>
  <h1 class="text">
    {{ msg }}
  </h1>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
