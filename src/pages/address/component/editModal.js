import {Button, Modal} from 'react-bootstrap';
import { useForm} from "react-hook-form";
import {errorToastMessage, succesToastMessage} from "@/components/toasts";
import {useSelector} from "react-redux";
import {putAddressService} from "@/services/address";

export default function EditModal({ editShow, selectedRows, setEditShow }) {
    const {title, owner, first_name, id} = selectedRows
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const token = useSelector(state => state.token.token)
    const onSubmit = async (data) => {
        try {
            if(data){
                await putAddressService(id, data, token.access)
                succesToastMessage("basariyla guncellendi")
                setEditShow(false)
            }
            reset()

        }catch (e) {
            errorToastMessage("hata", 1000)
            console.log(e)
        }
    }
    const handleClose = () => setEditShow(false);

    return(
        <Modal show={editShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Adres Ekle</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="mx-1 mx-md-4 mb-2">
                    <div className="form-outline flex-fill mb-1">
                        <label className="form-label w-auto me-2" htmlFor="form3Example3c">Owner</label>
                        <input type="text" id="form3Example3c" defaultValue={owner} className="form-control" {...register('owner', {required: true})} />
                        <div>
                            {errors.owner && <span className="text-danger">{errors.owner?.message}</span>}
                        </div>
                    </div>
                    <div className="form-outline flex-fill mb-1">
                        <label className="form-label w-auto me-2" htmlFor="form3Example3c">Title</label>
                        <input type="text" id="form3Example3c" defaultValue={title} className="form-control" {...register('title', {required: true})} />
                        <div>
                            {errors.title && <span className="text-danger">{errors.title?.message}</span>}
                        </div>
                    </div>
                    <div className="form-outline flex-fill mb-1">
                        <label className="form-label w-auto me-2" htmlFor="form3Example3c">First Name</label>
                        <input type="text" id="form3Example3c" defaultValue={first_name} className="form-control"  {...register('first_name', {required: true})} />
                        <div>
                            {errors.first_name && <span className="text-danger">{errors.first_name?.message}</span>}
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Kapat
                </Button>
                <Button type="submit" variant="success" onClick={handleSubmit(onSubmit)}>
                    Kaydet
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
