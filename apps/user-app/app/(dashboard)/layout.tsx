import { Sidebar } from "../../components/SidebarItem";

export default function Layout({children}:{children:React.ReactNode}):JSX.Element{
    return (
        <div>
            <div>
                <div>
                    <div>
                        <Sidebar/>
                    </div>
                </div>
            </div>
        </div>
    )
}