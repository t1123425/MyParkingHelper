import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

export const showErrorAlert = (msg) => {
  MySwal.fire({
    // position:'top-end',
    icon: 'error',
    title:msg,
    showConfirmButton:false
   })
}
