<script setup lang="ts">
import { Client, provideClient, cacheExchange, fetchExchange } from '@urql/vue';
import { client } from '@you/urql/urql-vue'
import HelloWorld from './components/HelloWorld.vue'
import NavBar from './components/NavBar/NavBar.vue';
import Layout from './components/system/Layout.vue';
import AppProvider from './components/AppProvider.vue';
import LoggedIn from './components/LoggedIn.vue';
provideClient(client);
</script>
<template>
  <div class="w-screen min-h-screen">
    <Layout class="h-full w-full">
      <template #header>
        <NavBar />
      </template>
      <template #body>
        <Suspense>
          <AppProvider>
            <LoggedIn />
          </AppProvider>
          <template #fallback>
            <span class="text-3xl">initializing connection...</span>
          </template>
        </Suspense>
      </template>
    </Layout>
  </div>
</template>

<style scoped></style>
