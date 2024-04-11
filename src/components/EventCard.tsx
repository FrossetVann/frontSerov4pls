import React, { useEffect, useState } from 'react';
import '../index.css'
import axios from 'axios';
import {url} from "../utils/api";
import {EventType} from "../types/EventType";
import {Link} from "react-router-dom";


const Eventdiv: React.FC = () => {
    const [events, setEvents] = useState<EventType[]>([]);
    const user = localStorage.getItem('id')
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<EventType[]>(`${url}/api/post`);
                setEvents(response.data);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async(id:number)=>{
        try {
              axios.delete(`${url}/api/post/${id}`)
        }catch (e) {
            console.error(e)
        }
    }

    // const handleRegister = async(user_id:number,event_id:number)=>{
    //     try {
    //         axios.put(`${url}/api/events/${event_id}/register/${user_id}`)
    //         alert(`Вы успешно зарегистрированны на мероприятие`)
    //     }catch (e) {
    //         console.error(e)
    //     }
    // }

    return (
        <div className='flex w-full justify-center items-center gap-6 snap-x flex-wrap'>
            {events.map((event) => (
                <div key={event.id} className='w-64 h-96 bg-slate-900 text-neutral-200 p-5'>

                    <div className='flex flex-col h-96'>
                        <h2 className='text-3xl py-4 h-[20%]'>
                            {event.title}
                        </h2>
                        <p className='h-[40%]'>
                            {event.body}
                        </p>
                       
                        <p className='text-ms py-4'>
                            Создано {new Date(event.created_at).toLocaleDateString()}
                        </p>
                        <div className="flex">
                        <Link  className='w-[50%] bg-blue-900 flex justify-center items-center h-10' to={`event/${event.id}`}> <button>Читать</button></Link>
                        {token ? (
                        <button className='w-[50%] bg-red-900 '  onClick={() => handleDelete(event.id)}>Удалить</button>
                        ): (
                          ''
                        )}
                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default Eventdiv;
