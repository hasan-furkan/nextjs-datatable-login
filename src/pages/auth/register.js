import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {validationRegisterSchema} from "@/utils/auth/formValidate";
import Link from "next/link";
import {errorToastMessage, succesToastMessage} from "@/components/toasts";
import { useRouter } from 'next/router';
import {registerService} from "@/services/auth";

export default function Register() {
    const router = useRouter();
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(validationRegisterSchema)
    });
    const onSubmit = async (data) => {
        try {
            if(data){
               await registerService(data)
                succesToastMessage("hesabiniz basariyla olusturuldu giris sayfasina yonlendiriliyorsunuz", 1000)
               await router.push("/auth/login")
            }
        }catch (e) {
            errorToastMessage(e)
            console.log(e)
        }
    };
    return (
        <section className="vh-100" style={{backgroundColor: '#eee'}}>
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{borderRadius: '25px'}}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        <p className="text-center h1 fw-bold mb-3 mx-md-4 mt-4">Sign up</p>
                                        <form className="mx-1 mx-md-4" onSubmit={handleSubmit(onSubmit)}>
                                            <div className="d-flex flex-row align-items-center mb-3">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"/>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input
                                                        type="text" id="form3Example1c"
                                                           className="form-control"
                                                           {...register('first_name', {required: true})}
                                                    />
                                                    <label
                                                        className="form-label"
                                                        htmlFor="form3Example1c">
                                                        First Name
                                                    </label>
                                                    <div>
                                                        {errors.fist_name && <span className="text-danger">{errors.fist_name?.message}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-3">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"/>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input
                                                        type="text"
                                                        id="form3Example2c"
                                                        className="form-control"
                                                        {...register('last_name', {required: true})}
                                                    />
                                                    <label className="form-label" htmlFor="form3Example2c">
                                                        Last Name
                                                    </label>
                                                    <div>
                                                        {errors.last_name && <span className="text-danger">{errors.last_name?.message}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-3">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"/>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="email" id="form3Example3c" className="form-control"  {...register('email', {required: true})} />
                                                    <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                                                    <div>
                                                        {errors.email && <span className="text-danger">{errors.email?.message}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-3">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"/>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="password" id="form3Example4c"
                                                           className="form-control"  {...register('password', {required: true})}  />
                                                    <label className="form-label"
                                                           htmlFor="form3Example4c">Password</label>
                                                    <div>
                                                        {errors.password && <span className="text-danger">{errors.password?.message}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-3">
                                                <i className="fas fa-key fa-lg me-3 fa-fw"/>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="tel" id="form3Example5c" className="form-control"  {...register('phone', {required: true})} />
                                                    <label className="form-label" htmlFor="form3Example5c">Phone</label>
                                                    <div>
                                                        {errors.phone && <span className="text-danger">{errors.phone?.message}</span>}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-between align-items-center mx-4 mb-3 mb-lg-4">
                                                <button type="submit" className="btn btn-primary btn-lg">Register
                                                </button>
                                                <Link href="/auth/login">go login</Link>
                                            </div>
                                        </form>
                                    </div>
                                    <div
                                        className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                            className="img-fluid" alt="Sample image"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
