import { Appbar } from "@repo/ui/appbar"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
export const AppbarClient=()=>{
    const router = useRouter();
    const session = useSession();
    return <div>
        <Appbar onSignin={signIn} onSignout={async()=>{
            await signOut()
            router.push("/api/auth/signin")
        }} user={session.data?.user}  
        />
    </div>
}