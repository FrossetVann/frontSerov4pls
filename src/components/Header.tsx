import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css'


const Header: React.FC = () => {
    const token = localStorage.getItem('token');
    const login = localStorage.getItem('login')

    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.clear();
      navigate('/register');
  };

    return (
        <header className='w-[100vw] h-24 bg-slate-900 relative flex justify-center ' >
            <div className='container '>
                <nav className='flex justify-between items-center h-full flex-wrap gap-10'>
                    <a className='text-neutral-200 text-2xl' href="/">
                        Новости
                    </a>
                    {token ? (
                        <>
                        <a className='text-neutral-200 text-2xl' href="/newnew">
                            Создать Новость
                        </a>
                        <a className='text-neutral-200 text-2xl'>
                            {login}
                        </a>
                        <a onClick={() => handleLogout()} className='text-neutral-200 text-2xl'>
                            Выйти
                        </a>
                        </>
                    ) : (
                        <div className='flex flex-wrap gap-10'>
                            <a className='text-neutral-200 text-2xl' href="/login">
                                Вход
                            </a>
                            <a className='text-neutral-200 text-2xl' href="/register">
                                Регистрация
                            </a>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
