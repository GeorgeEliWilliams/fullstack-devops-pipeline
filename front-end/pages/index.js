import Link from "next/link";
import {useState} from "react";
import axios from "axios";
import Head from "next/head";


export default function Index() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [generalError, setGeneralError] = useState(null);
    const [isRedirecting, setIsRedirecting] = useState(false);

    const handleLogin = async () => {
        setIsAuthenticating(true);
        setGeneralError(null);
        setErrors({});


        try {
            const response = await axios.post("/api/login", {username, password});
            if (response.status === 200) {
                const {logged_in} = response.data;

                if (logged_in) {
                    setIsRedirecting(true);
                    window.location.assign('/dashboard');
                }

                if (!logged_in && !response.data.errors) {
                    setGeneralError(response.data.status);
                }

                if (response.data.errors) {
                    setGeneralError(response.data.status);
                    setErrors(response.data.errors);
                }
            }
            setIsAuthenticating(false);
        } catch (err) {
            setIsAuthenticating(false);
        }
    }

    return (
        <div className=" bg-gradient-to-br my-0 to-white via-white via-10% from-white min-h-screen">
            <Head>
                <title>Login</title>
            </Head>
            <div
                className="flex w-full items-center justify-center pt-20 ">
                <div className="min-w-[25vw]">
                    <div className="text-center">
                        <div className="text-red-500 text-8xl  py-2 px-4">
                            CLM
                        </div>
                        <p className="text-center text-gray-900 font-light">
                            CLM System
                        </p>
                        <p className="text-sm text-gray-500 my-2">
                            Strengthening Systems.
                        </p>
                    </div>
                    <form action="" className="mt-10">
                        {
                            isRedirecting &&
                            <div className="bg-green-700 flex gap-2 text-white px-4 py-4 rounded-lg text-sm">
                                <span className="loading loading-spinner loading-sm"></span>
                                Logging in ....
                            </div>
                        }
                        {
                            generalError &&
                            <div className="bg-red-400 flex gap-2 text-white px-4 py-4 rounded-lg text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5"
                                     stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/>
                                </svg>
                                {generalError}
                            </div>
                        }
                        <div className="max-w-lg my-4">
                            <label htmlFor="input-label"
                                   className="block text-sm font-medium mb-2 dark:text-white">Username</label>
                            <input type="text" placeholder="Type your username"
                                   value={username}
                                   onChange={(e) => setUsername(e.target.value)}
                                   className="input input-bordered w-full max-w-lg"/>
                            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                        </div>
                        <div className="max-w-lg my-5">
                            <label htmlFor="input-label"
                                   className="block text-sm font-medium mb-2 dark:text-white">Password</label>
                            <input type="password" placeholder="Type password"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   className="input input-bordered w-full max-w-lg"/>
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}

                        </div>
                        <button
                            className="btn btn-primary w-full text-white mb-2"
                            onClick={handleLogin}
                            disabled={isRedirecting || isAuthenticating}>
                            {
                                isAuthenticating ? <span className="loading loading-spinner loading-sm"></span> : ''
                            }
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}