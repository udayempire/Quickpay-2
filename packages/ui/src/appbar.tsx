import { Button } from "./button.js"

interface AppbarProps {
    user?: {
        name?: string | null
    }
    onSignin: any,
    onSignout: any
}

export const Appbar = ({ user, onSignout, onSignin }: AppbarProps) => {
    return <div className="flex justify-between border-b px-4">
        <div className="text-lg flex flex-col  justify-center">
            QuickPay
        </div>
        <div className="flex flex-col justify-center pt-2">
            <Button onClick={user ? onSignout : onSignin} > { user ? "Logout": "Login"}</Button>
        </div>
    </div >

}
