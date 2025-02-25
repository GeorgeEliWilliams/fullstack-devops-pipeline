import Layout from "@/components/layouts/internal";
import Breadcrumb from "@/components/breadcrumb";
import Link from "next/link";
import withSession from "@/lib/session";
import auth from "@/lib/middleware";
import {AppContext} from "@/components/context";
import {useEffect, useState} from "react";
import SettingsForm from "@/components/users/settings-form";
import PasswordForm from "@/components/users/password-form";


export const getServerSideProps = withSession(auth);

export default function AccountSettings(props) {

    return (
        <AppContext.Provider value={props.configBundle}>
            <Layout location="account">
                <Breadcrumb links={[{label: 'Account Settings', url: '/account-settings'}]}/>
                <div className="my-4">
                    <header className="text-4xl text-gray-600">Account Settings</header>
                    <p>
                        <small>Manage your account settings.</small>
                    </p>
                </div>
                <SettingsForm initData={props.configBundle.user}/>
                <PasswordForm user={props.configBundle.user}/>
            </Layout>
        </AppContext.Provider>
    )
}