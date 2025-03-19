import React, { useState, useEffect } from 'react';
import api from '../api/api';
import showToast from '../alert/alert';
import { ToastContainer } from 'react-toastify';
import { useAppContext } from '../context/AppContext';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { assets } from '../assets/assets';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  image: any;
  contact:string
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  contact?:string
}

const Auth: React.FC = () => {
  const {getUser} = useAppContext();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [errors, setErrors] = useState<FormErrors>({});
  const [files, setFiles] = useState("");
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [passwordVisible,setPasswordVisible]=useState({
    password:false,
    rePassword:false
  })
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    image: null,
    contact:''
  });
  


  const handleChange = (e: any): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleFileSelect = async (file: any) => {
    let filePath: any
    if (file) {
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (validTypes.includes(file.type)) {
            setFiles(URL.createObjectURL(file));

            const readAsDataURL = (file: any) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            };

            try {
                const data = await readAsDataURL(file);
                filePath = data;
                setSelectedFile(filePath)
            } catch (error) {
                console.error('Error reading file:', error);
            }
        } else {
        }
    }
};

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.firstName) {
        newErrors.firstName = 'First name is required';
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (formData.contact.length < 8 ) {
        newErrors.contact = 'Contact no is need';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

   useEffect(() => {
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          firstName: '',
          lastName: '',
          image:'',
          contact:''
        });
        setSelectedFile(null);
        setFiles("");
   }, [isLogin])

  const handleSubmit = async (e: any): Promise<void> => {
    e.preventDefault();
    
    if (validate()) {

      if (!isLogin) {
        try {
          const response = await api.post('/user', {
            name: formData.firstName+" "+formData.lastName,
            email: formData.email,
            password:formData.confirmPassword,
            image: selectedFile,
            contact: formData.contact,
            role: "USER"
          });
       
              if (response.status === 201) {

                  localStorage.setItem("email", response.data.data.email);
                  localStorage.setItem("name", response.data.data.name);
                  localStorage.setItem("role", response.data.data.role);
                  localStorage.setItem("token", response.data.data.token);

                  // api.defaults.headers.common[
                  //   "Authorization"
                  // ] = `Bearer ${response.data.data.token}`;
                  
                  setFormData({
                    email: '',
                    password: '',
                    confirmPassword: '',
                    firstName: '',
                    lastName: '',
                    image:'',
                    contact:''
                  });
                  setSelectedFile(null);
                  setFiles("");
                  getUser();
                  showToast('User Created Successfully',"success");
              }

        } catch (error: any) {
          if (error.response && error.response.status === 400) {
            showToast('Invalid credentials. Please check your email and password', 'error');
          } else if(error.response && error.response.status === 409){
            showToast('User email already exist', "error");
          }else{
            showToast('Error Creating User', "error");
          }
        }
      }else{
        try {
          const response = await api.post('/auth/signIn', {
            
            email: formData.email,
            password:formData.password,
            
          });
       
              if (response.status === 200) {
       
                  localStorage.setItem("email", response.data.data.email);
                  localStorage.setItem("name", response.data.data.name);
                  localStorage.setItem("role", response.data.data.role);
                  localStorage.setItem("token", response.data.data.token);

                  // api.defaults.headers.common[
                  //   "Authorization"
                  // ] = `Bearer ${response.data.data.token}`;

                  setFormData({
                    email: '',
                    password: '',
                    confirmPassword: '',
                    firstName: '',
                    lastName: '',
                    image:'',
                    contact:''
                  });
                  setSelectedFile(null);
                  setFiles("");
                  getUser();
                  showToast('User Sign In Successed',"success");
              }

      } catch (error: any) {
        if (error.response && error.response.status === 400) {
          showToast('Invalid credentials. Please check your email and password', 'error');
        } else if(error.response && error.response.status === 404){
          showToast('Invalid User', "error");
        }else{
          showToast('Unexpected error', "error");
        }
        
      }
      }
      
    }
  };

  const toggleForm = (): void => {
    setIsLogin(!isLogin);
    setErrors({});
  };

  return (
    <div className="min-h-screen flex flex-col justify-center pb-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-600">
          {isLogin ? 'Sign in to your account' : 'Create a new account'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account ? " : "Already have an account ? "}
          <button
            className="font-semibold text-[#895025]/60 hover:text-[#E8C2A5] focus:outline-none ml-1"
            onClick={toggleForm}
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>

      <div className="mt-8 mb-12 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#F8F2EE]/60 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
              
            {!isLogin && (
              <div className='flex flex-col'>
                <div className="flex justify-center flex-wrap items-center relative bottom-2">
                  <label>
                    <input
                      onChange={(e: any) => {
                        const updatedFiles = e.target.files[0]
                          ? e.target.files[0]
                          : "";
                          handleFileSelect(updatedFiles);
                      }}
                      type="file"
                      hidden
                    />
                    <img
                      className="max-w-24 cursor-pointer"
                      src={files ? files : assets.upload_area}
                      alt=""
                      width={100}
                      height={100}
                    />
                  </label>
                </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First name
                  </label>
                  <div className="mt-1">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`appearance-none block w-full px-3 py-2 border ${
                        errors.firstName ? 'border-red-300' : 'border-gray-300'
                      } rounded-md shadow-sm placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E8C2A5] focus:border-transparent sm:text-sm`}
                    />
                    {errors.firstName && (
                      <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last name
                  </label>
                  <div className="mt-1">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`appearance-none block w-full px-3 py-2 border 'border-red-300
                       rounded-md shadow-sm placeholder-gray-400 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E8C2A5] focus:border-transparent sm:text-sm`}
                    />
                    
                  </div>
                </div>
              </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E8C2A5] focus:border-transparent sm:text-sm`}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={passwordVisible.password ? "text" : "password"}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  value={formData.password}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E8C2A5] focus:border-transparent sm:text-sm`}
                />
                  <button
                    type="button"
                    onClick={() =>
                      setPasswordVisible((prevData: any) => ({
                        ...prevData,
                        password: !prevData.password, 
                      }))
                    }
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  >
                    {passwordVisible.password ? <VisibilityOff /> : <Visibility />}
                  </button>

                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={passwordVisible.rePassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                    } rounded-md shadow-sm placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E8C2A5] focus:border-transparent sm:text-sm`}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setPasswordVisible((prevData: any) => ({
                        ...prevData,
                        rePassword: !prevData.rePassword, 
                      }))
                    }
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  >
                    {passwordVisible.rePassword ? <VisibilityOff /> : <Visibility />}
                  </button>
                  
                  {errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
            )}
             {!isLogin && (
              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                  Contact No
                </label>
                <div className="mt-1">
                  <input
                    id="contact"
                    name="contact"
                    type="text"
                    value={formData.contact}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errors.contact ? 'border-red-300' : 'border-gray-300'
                    } rounded-md shadow-sm placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E8C2A5] focus:border-transparent sm:text-sm`}
                  />
                  {errors.contact && (
                    <p className="mt-2 text-sm text-red-600">{errors.contact}</p>
                  )}
                </div>
              </div>
            )}
            
            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-[#895025]/70 hover:text-[#895025]/60">
                    Forgot your password?
                  </a>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-[#E8C2A5] text-[#895025] hover:bg-[#e8c2a580] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#895025]/40"
              >
                {isLogin ? 'Sign in' : 'Sign up'}
              </button>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#F8F2EE] text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div>
                  <a
                    href="#"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with Google</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z" />
                    </svg>
                  </a>
                </div>

                <div>
                  <a
                    href="#"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with Facebook</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer className={"overflow-x-hidden"}/>
    </div>
  );
};

export default Auth;