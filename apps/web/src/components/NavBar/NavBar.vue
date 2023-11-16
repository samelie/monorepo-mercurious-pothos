
<template>
  <div class="h-full w-full flex justify-start items-center px-2 " />
</template>

<script lang="ts">
import { LoginDocument, useGetHumansQuery, useLoginMutation } from '@you/db/generated/client/graphql-urql';
import { defineComponent } from 'vue';



export default defineComponent({
  setup() {


    // const login = useLoginMutation()

    async function calls() {

      // await login.executeMutation({ input: { email: 'sam@add.dog', password: 'passverd' } }).then(result => {
      //   if (result.error) {
      //     console.error('Oh no!', result.error);
      //   }
      // });
      const { error, data, } = useGetHumansQuery({
        variables: {
          input: {
            id: ''
          }
        }
      })
    }

    // calls()




    return {
      // data,
      // error

    }
  },
})
</script>
