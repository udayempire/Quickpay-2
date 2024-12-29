import { SidebarItem } from "../../components/SidebarItem";

export default function Layout({ children, }: { children: React.ReactNode }): JSX.Element {
    return (
        <div className="flex bg-[#ededed]">
            {/* sidebar */}
            <div className="w-72 border-r border-slate-300 min-h-screen mr-4 pt-28 " >
                <div>
                    <SidebarItem href="/dashboard" title="Home" icon={<HomeIcon />} />
                    <SidebarItem href="/transfer" title="Transfer" icon={<TransferIcon />} />
                    <SidebarItem href="/transaction" title="Transaction" icon={<TransactionsIcon />} />
                    <SidebarItem href="/p2p" title="P2P Transfer" icon={<P2PIcon />} />
                </div>
            </div>
            {/* rightbar */}
            {children}
        </div>
    )
}
function HomeIcon() {
    return <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
        </svg>
    </div>
}

function TransferIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
}

function TransactionsIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
}

function P2PIcon(){
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
</svg>

}
