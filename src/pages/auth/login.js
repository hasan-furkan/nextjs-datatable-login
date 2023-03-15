import Link from 'next/link'
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {validationLoginSchema} from "@/utils/auth/formValidate";
import {useDispatch} from "react-redux";
import {setUser} from "@/redux/components/auth";
import { useRouter } from 'next/router';
import {errorToastMessage, succesToastMessage} from "@/components/toasts";
import {loginService} from "@/services/auth";
import {setToken} from "@/redux/components/token";

export default function Login() {
    const dispatch = useDispatch()
    const router = useRouter();
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(validationLoginSchema)
    });

    const onSubmit = async (data) => {
       try {
           if(data){
              const response = await loginService(data)
               dispatch(setUser({
                   email: data.email
               }))
               dispatch(setToken({
                   access: response.data.access,
                   refresh: response.data.refresh
               }))
               succesToastMessage("giris basarili")
              await router.push("/")
           }
       }catch (e) {
           console.log(e)
           errorToastMessage(e)
       }
    };
    return ( 
        <section className="vh-100" style={{backgroundColor: '#eee'}}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{borderRadius: '25px'}}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        <p className="text-center h1 fw-bold mb-3 mx-md-4 mt-4">Sign In</p>
                                        <form className="mx-1 mx-md-4" onSubmit={handleSubmit(onSubmit)}>
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

                                            <div className="d-flex align-items-center justify-content-between mx-4 mb-3 mb-lg-4">
                                                <button type="submit" className="btn btn-primary btn-lg">Login
                                                </button>
                                                <Link href="/auth/register">go register</Link>

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
