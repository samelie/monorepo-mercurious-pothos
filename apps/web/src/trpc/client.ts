import { ref } from 'vue'
import {
  createTRPCClient,
  setAuthorization,
} from '@you/trpc/client/client'

const trpc = createTRPCClient(import.meta.env.VITE_TRPC_URL)

export async function signInWithEmail() {
  const r = await trpc.loginUser.query()
  // const { data: user, error } = await supabase.auth.signUp({
  //   email: 'sam@sam.sam', password: 'password'
  // })
  // console.log(user, error)
}
