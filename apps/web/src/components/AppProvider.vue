<template>
  <slot />
</template>

<script lang="ts">
import { useLoginMutation } from '@you/db/generated/client/graphql-urql';
import { defineComponent, provide, ref } from 'vue'


export default defineComponent({
  name: 'AppProvider',
  async setup() {
    const tRef = ref('')
    const token = provide('token', tRef)
    const login = useLoginMutation()
    await login.executeMutation({ input: { email: 'sam@add.dog', password: 'passverd' } }).then(result => {
      if (result.error) {
        console.error('Oh no!', result.error);
      }
      console.log(result)
      tRef.value = result.data!.login!.token
    });
    console.log('done')
  },
})
</script>
