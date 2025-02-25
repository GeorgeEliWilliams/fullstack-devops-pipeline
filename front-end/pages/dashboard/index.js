import Layout from "@/components/layouts/internal";
import Breadcrumb from "@/components/breadcrumb";
import withSession from "@/lib/session";
import auth from "@/lib/middleware";
import {AppContext} from "@/components/context";
import Head from "next/head";


export const getServerSideProps = withSession(auth);



export default function Dashboard(props) {
    return (
        <AppContext.Provider value={props.configBundle}>
            <Head>
                <title>Dashboard</title>
            </Head>
            <Layout location="/">
                <Breadcrumb links={[{label: 'Dashboard', url: '/dashboard'}]}/>
                <div className="my-4">
                    <header className="text-4xl text-gray-600">Dashboard</header>
                    <p>
                        <small>Your account and system overview.</small>
                    </p>
                </div>
                <div className="my-10">
                    <div className="bg-gray-50 shadow-sm border px-4 py-10">
                        You are logged in.
                    </div>
                </div>
            </Layout>
        </AppContext.Provider>
    )
}