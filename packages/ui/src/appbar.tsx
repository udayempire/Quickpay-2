
import { Button } from "./button.js"
interface AppbarProps {
    user?: {
        name?: string | null
    }
    onSignin: () => void,
    onSignout: () => void
}

export const Appbar = ({ user, onSignout, onSignin  }: AppbarProps) => {
    return <div className="flex justify-between border-b-[3px]  px-4 bg-[#ededed]">
        <div className="text-xl flex flex-col font-bold   justify-center">
            QuickPay
        </div>
        <div className="flex  justify-center pt-2 gap-4">
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-800 hover:bg-gray-900 rounded-full ">
                <span className="font-medium text-white capitalize ">{user?.name?.[0]}</span>
            </div>

            <Button onClick={user ? onSignout : onSignin} > {user ? "Logout" : "Login"}</Button>
        </div>
    </div >
}
