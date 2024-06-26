import { Button } from "@/components/ui/button"
import { AuthContext } from "@/context/authContext"
import axios from "axios"
import { useContext, useEffect, useState } from "react"


const StripeSuccessPage = () => {

  const { authedUser, checkAuth } = useContext(AuthContext)

  useEffect(() => {
    checkAuth()

  },[])


  useEffect(() => {
    const sessionId = localStorage.getItem('sessionId')
    console.log("HERE IS THE SESSION ID FROM LOCAL STORAGE", sessionId)
    if (sessionId) {
      const sendStripeConfirmation = async () => {
        const res = await axios.post("http://localhost:3000/payments/verify", { sessionId }, { withCredentials: true })
        console.log(res, "HERE IS STRIPE res")
        localStorage.removeItem('sessionId')
      }
      sendStripeConfirmation()
    }
  }, [authedUser.User?.sessionId])


  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <h1 className="text-3xl font-bold">Success</h1>
          <h2 className="text-balance text-muted-foreground">
            Thankyou for your purchase.
          </h2>
          <Button><a href="/">Home</a></Button>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="../../public/successimage.jpg"
          alt="success-image"
          className="h-[100%] w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}



export default StripeSuccessPage