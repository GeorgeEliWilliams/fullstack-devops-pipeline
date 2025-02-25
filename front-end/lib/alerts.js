// utils/alert.js
import Swal from "sweetalert2";

export const successAlert = async (title = "Success", text = "Operation was successful!") => {
    await Swal.fire({
        title: title,
        text: text,
        icon: "success",
        confirmButtonColor: "#4CAF50", // Customize button color if needed
        confirmButtonText: "Okay",
    });
};

export const errorAlert = (title = "Error", text = "Something went wrong!") => {
    Swal.fire({
        title: title,
        text: text,
        icon: "error",
        confirmButtonColor: "#E53E3E", // Customize button color if needed
        confirmButtonText: "Try Again",
    });
};

export const sweetConfirm = async (title = "Are you sure?", text = "This action cannot be undone.") => {
    const result = await Swal.fire({
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes,Proceed',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#4CAF50',
    });

    return result.isConfirmed;
};