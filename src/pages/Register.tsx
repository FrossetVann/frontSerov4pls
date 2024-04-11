import React, { useState, useEffect } from 'react';
import '../index.css'
import { useForm, SubmitHandler, Controller, FieldValues } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/FormData';
import { url } from "../utils/api";
import Header from '../components/Header';
const Register: React.FC = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<User>();

    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [accData, setAccData] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            navigate('/');
        }
    }, [navigate]);

    const fetchData = async (token: string) => {
        try {
            const response = await axios.get(`${url}/api/token/`, {
                headers: {
                    token: token
                }
            });
            setAccData(response.data);
            console.log(response.data);
            localStorage.setItem('id', response.data.id);
            localStorage.setItem('login', response.data.login);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const onSubmit: (data: User) => Promise<void> = async (data: User) => {
      try {
          const response = await axios.post(
              `${url}/api/register/`,
              {
                  login: data.username,
                  password: data.password,
                  role: 'user'
              },
              {
                  headers: {
                      'Content-Type': 'application/json'
                  }
              }
          );
  
          if (response.status === 200) {
              localStorage.setItem('token', response.data.user);
              localStorage.setItem('login', response.data.user);
              const storedToken = localStorage.getItem('token');
              if (storedToken) {
                  fetchData(storedToken);
                  navigate('/');
              }
          }
      } catch (error) {
          console.error('Authentication error', error);
          setError('Authentication failed');
      }
  };

    return (
        <div className="form text-neutral-200">
            <Header />
            <form className='flex justify-center items-center flex-col p-20 mt-20 bg-slate-950' onSubmit={handleSubmit(onSubmit)}>
                <h3 className='text-2xl text-center pb-10'>Регистрация</h3>
                <div>
                    <Controller
                        name="username"
          
                        control={control}
                        rules={{ required: 'обязательное поле' }}
                        render={({ field }: { field: FieldValues }) => (
                            <input 
                            className='h-10 bg-gray-200 text-black'
                            {...field} />
                        )}
                    />
                    {errors.username && <span>{errors.username.message}</span>}
                </div>
                <br />
                <div>
                    <Controller
                        name="password"
      
                        control={control}
                        rules={{ required: 'обязательное поле' }}
                        render={({ field }: { field: FieldValues }) => (
                            <input 
                            className='h-10 bg-gray-200 text-black'
                                {...field}
                            />
                        )}
                    />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>
                <br />
                <button className='w-[50%] bg-blue-900 flex justify-center items-center h-10' type="submit">
                    Зарегистрироваться
                </button>
                {error && <p className="text-red-800 p-10">{error}</p>}
            </form>
        </div>
    );
};

export default Register;
