import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import ROUTES from '@/constants/routes';
import React from 'react'

const Home = async() => {
  const session = await auth();
  console.log("session", session);
  return (
    <>
      <h1 className="text-light-500 h1-bold font-space-grotesk">Whereas disregard and contempt for human rights have resulted</h1>
      <h1 className="h1-bold ">Whereas disregard and contempt for human rights have resulted</h1>
      <form className='px-10 pt-[100px]' action={
        async() => {
          "use server"
          await signOut({redirectTo: ROUTES.SIGN_IN})
        }
      }>
        <Button variant="secondary" type='submit'>Logout</Button>
      </form>
    </>
  )
}

export default Home