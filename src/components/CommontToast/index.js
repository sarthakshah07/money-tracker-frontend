import Swal from "sweetalert2";

 const CommonToast = ({severity, message}) => {
    // const { severity, message } = props
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        zIndex: 1,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });
    setTimeout(() => {
        Toast.fire({
            icon: severity,
            title: message,
            timer: 1500
        });
    }, 500);
}
export default CommonToast