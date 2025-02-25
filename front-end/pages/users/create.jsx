import Layout from "@/components/layouts/internal";
import Breadcrumb from "@/components/breadcrumb";
import withSession from "@/lib/session";
import auth from "@/lib/middleware";
import {AppContext} from "@/components/context";
import Form from "@/components/users/form";

export const getServerSideProps = withSession(auth);

export default function Settings(props) {
    return (
        <AppContext.Provider value={props.configBundle}>
            <Layout location="users">
                <Breadcrumb links={[
                    {label: 'Users', url: '/users'},
                    {label: 'Create', url: '#create'},
                ]}/>
                <div className="my-4">
                    <header className="text-4xl text-gray-600">Register</header>
                    <p>
                        <small>Register user</small>
                    </p>
                </div>
                <div className="my-10">
                    <Form/>
                </div>
            </Layout>
        </AppContext.Provider>
    )
}