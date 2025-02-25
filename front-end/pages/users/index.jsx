import Layout from "@/components/layouts/internal";
import Breadcrumb from "@/components/breadcrumb";
import withSession from "@/lib/session";
import auth from "@/lib/middleware";
import {AppContext} from "@/components/context";
import Link from "next/link";
import UsersIndex from "@/components/users";


export const getServerSideProps = withSession(auth);

export default function Index(props) {
    return (
        <AppContext.Provider value={props.configBundle}>
            <Layout location="users">
                <Breadcrumb links={[{label: 'Users', url: '/users'}]}/>
                <div className="my-4">
                    <header className="text-4xl text-gray-600">Users</header>
                    <p>
                        <small>Create and manage user accounts.</small>
                    </p>
                </div>
                <div className="my-10">
                    <div className="my-4">
                        <Link href="/users/create" className="btn btn-primary">
                            New User
                        </Link>
                    </div>
                    <UsersIndex/>
                </div>
            </Layout>
        </AppContext.Provider>
    )
}