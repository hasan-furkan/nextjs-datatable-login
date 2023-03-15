import {Button, Modal} from 'react-bootstrap';
import {useForm} from "react-hook-form";
import {errorToastMessage, succesToastMessage} from "@/components/toasts";
import {addAddressService} from "@/services/address";
import {useSelector} from "react-redux";

export default function AddModal({show, setShow}) {
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const token = useSelector(state => state.token.token)
    const onSubmit = async (data) => {
        try {
            if(data){
              const response = await addAddressService(data,token.access)
                console.log(response.data)
                succesToastMessage("adres eklendi", 1000)
                setShow(false)
            }
            reset()
        }catch (e) {
            console.log(e)
            errorToastMessage("hata", 1000)
        }
    }
    const handleClose = () => setShow(false);

    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Adres Ekle</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="mx-1 mx-md-4 mb-2">
                        <div className="form-outline flex-fill mb-1">
                            <label className="form-label w-auto me-2" htmlFor="form3Example3c">Owner</label>
                            <input
                                type="text"
                                id="form3Example3c"
                                className="form-control"
                                   {...register('owner', {required: true})}
                            />
                            <div>
                                {errors.owner && <span className="text-danger">{errors.owner?.message}</span>}
                            </div>
                        </div>
                        <div className="form-outline flex-fill mb-1">
                            <label className="form-label w-auto me-2" htmlFor="form3Example3c">Title</label>
                            <input type="text" id="form3Example3c" className="form-control"  {...register('title', {required: true})} />
                            <div>
                                {errors.title && <span className="text-danger">{errors.title?.message}</span>}
                            </div>
                        </div>
                    <div className="form-outline flex-fill mb-1">
                        <label className="form-label w-auto me-2" htmlFor="form3Example3c">First Name</label>
                        <input type="text" id="form3Example3c" className="form-control"  {...register('first_name', {required: true})} />
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
