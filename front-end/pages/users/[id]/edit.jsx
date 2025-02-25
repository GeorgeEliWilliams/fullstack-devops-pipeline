import Layout from "@/components/layouts/internal";
import Breadcrumb from "@/components/breadcrumb";
import withSession from "@/lib/session";
import auth from "@/lib/middleware";
import {AppContext} from "@/components/context";
import Form from "@/components/users/form";
import {useEffect, useState} from "react";
import Loader from "@/components/loader";
import {useRouter} from "next/router";
import axios from "axios";
import PasswordForm from "@/components/users/password-form";

export const getServerSideProps = withSession(auth);

export default function Settings(props) {
    const router = useRouter();
    const {id} = router.query;
    const [data, setData] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        fetchData(id);
    }, [id]);

    const fetchData = async (id) => {
        setIsFetching(true);
        try {
            const response = await axios.get(`${props.configBundle.backendUrl}/admin/users/${id}`, {
                headers: props.configBundle.authHeader
            });

            if (response.status === 200) {
                setData(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching  data:', error);
        }

        setIsFetching(false);
    };

    return (
        <AppContext.Provider value={props.configBundle}>
            <Layout location="users">
                <Breadcrumb links={[
                    {label: 'Users', url: '/users'},
                    {label: 'Edit', url: '#edit'},
                ]}/>
                <div className="my-4">
                    <header className="text-4xl text-gray-600">Edit</header>
                    <p>
                        <small>Edit user details</small>
                    </p>
                </div>
                <div className="my-10">
                    {isFetching && <Loader/>}
                    {
                        !isFetching && data ? <>
                            <Form initData={data}/>
                            <PasswordForm user={data}/>
                        </> : "-- "
                    }

                </div>
            </Layout>
        </AppContext.Provider>
    )
}