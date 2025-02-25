import Link from "next/link";

export default function Breadcrumb(props) {
    let links = props.links;

    if (links === undefined) {
        links = [];
    }
    return (
        <div className="breadcrumbs text-sm">
            <ul>
                <li><Link href={"/dashboard"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"
                         fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round"
                         strokeLinejoin="round"
                         className="icon icon-tabler icons-tabler-outline icon-tabler-layout-dashboard">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path
                            d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1"/>
                        <path
                            d="M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1"/>
                        <path
                            d="M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1"/>
                        <path
                            d="M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1"/>
                    </svg>
                </Link></li>
                {
                    links.map((link, index) => <li key={index}><Link href={link.url}>{link.label}</Link></li>)
                }
            </ul>
        </div>
    )
}