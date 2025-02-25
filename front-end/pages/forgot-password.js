import Image from "next/image";
import {useState} from "react";
import axios from "axios";
import withSession from "@/lib/session";
import {authGuard} from "@/lib/middleware";
import Link from "next/link";

export default function Index(props) {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [generalError, setGeneralError] = useState(null);
    const [message, setMessage] = useState(null);

    const handleSubmit = async () => {
        setIsProcessing(true);
        setGeneralError(null);
        setErrors({});


        try {
            const url = props.url;
            const response = await axios.post(`${url}/api/password/forgot`, {email});

            if (response.status === 200) {
                setMessage('Password reset link has been sent to your email.');
            }
        } catch (err) {
            // Handle errors and display the error message to the user
            setGeneralError(err.response?.data?.message || 'Something went wrong. Please try again.');
        }

        setIsProcessing(false)
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-bl
         to-red-100 via-white via-30% from-white">
            <div className="flex justify-center items-center mt-20">
                <div className="min-w-[20vw]">
                    <div className="text-center">
                        <header className="text-6xl text-primary">
                            CLMS
                        </header>
                        <p className="text-sm my-3">
                            Reset Password
                        </p>
                    </div>
                    <div className="mt-10">
                        <form action="#reset" className="space-y-4">
                            {
                                message &&
                                <div className="bg-green-500 text-white flex gap-2 px-4 py-4 rounded-lg text-sm">
                                    {message}
                                </div>
                            }
                            {
                                !message && <>
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
                                        <input type="text" placeholder="Type your email"
                                               value={email}
                                               onChange={(e) => setEmail(e.target.value)}
                                               className="input input-bordered w-full max-w-lg"/>
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    <p>
                                        <Link href="/">
                                            Login
                                        </Link>
                                    </p>
                                    <button className="btn btn-primary w-full text-white"
                                            onClick={handleSubmit}
                                            disabled={isProcessing}>
                                        {
                                            isProcessing ? <span className="loading loading-spinner loading-sm"></span> : ''
                                        }
                                        Reset Password
                                    </button>
                                </>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


export const getServerSideProps = withSession(authGuard);