import FormError from "@/components/form-error";
import {useContext, useState} from "react";
import axios from "axios";
import {AppContext} from "@/components/context";
import Swal from "sweetalert2";

export default function PasswordForm({user}) {
    const config = useContext(AppContext);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);


    const processData = async () => {
        setIsProcessing(true);
        setErrors({});

        try {
            const formData = {
                password: password,
                password_confirmation: confirmPassword,
            }
            const response = await axios.patch(`${config.backendUrl}/users/${user.id}/change-password`, formData, {
                headers: {...config.authHeader,}
            });

            if (response.status === 200) {
                 Swal.fire({
                    title: 'Success!',
                    text: 'Operation successfully completed.',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })

                setPassword('');
                setConfirmPassword('');
            }
        } catch (err) {
            handleError(err);
        }

        setIsProcessing(false);
    }


    const handleError = (err) => {
        let message = "Oops! Something went wrong";
        if (err.response && err.response.status === 422) {
            setErrors(err.response.data.errors);
            message = err.response.data.message;
        }

        console.error(err);

        enqueueSnackbar(message, {
            variant: 'error',
            preventDuplicate: false
        });
    }


    return (
        <div>
            <div className="bg-gray-50 px-4 py-4 mt-10 mb-4">
                <div>
                    Security Options
                </div>
                <div className="text-sm text-gray-500">
                    Use these settings to reset the password for this account.
                </div>
            </div>
            <div className="grid grid-cols-1  lg:grid-cols-3 gap-10">
                <form action="#">
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Password</span>
                        </div>
                        <input type="password"
                               className={`input input-bordered flex items-center gap-2 ${errors.password && 'input-error'}`}
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               placeholder="Type passord" required/>
                        <FormError error={errors.password}/>
                    </label>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Confirm Password</span>
                        </div>
                        <input type="password"
                               className={`input input-bordered flex items-center gap-2 ${errors.password_confirmation && 'input-error'}`}
                               value={confirmPassword}
                               onChange={(e) => setConfirmPassword(e.target.value)}
                               placeholder="Re-enter password" required/>
                        <FormError error={errors.password_confirmation}/>
                    </label>
                    <button type="button" className="btn btn-primary my-4" onClick={processData}>
                        {isProcessing && <span className="loading loading-spinner loading-md"></span>}
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
}