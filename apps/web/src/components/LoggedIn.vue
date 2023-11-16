
<template>
  <div class="h-full w-full flex justify-start items-center px-2 ">
    Logged in
    {{ data }}
    {{ error }}
  </div>
</template>

<script lang="ts">
import { LoginDocument, useGetHumansQuery, useLoginMutation } from '@you/db/generated/client/graphql-urql';
import type { Ref } from 'vue';
import { computed, defineComponent, inject } from 'vue';


export default defineComponent({
  setup() {

    const token = inject<Ref<string>>('token')!
    const opts = computed(() => ({
      context: {
        fetchOptions: {
          headers: {
            authorization: `Bearer ${token.value}`,
          }
        }
      },
    }))
    console.log(JSON.stringify(opts.value))
    const { error, data, } = useGetHumansQuery({
      ...opts.value,
      variables: {
        input: {
          id: ''
        }
      }
    })


    return {
      data,
      error

    }
  },
})
</script>
