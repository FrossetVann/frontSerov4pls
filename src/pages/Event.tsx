import React, { useState, useEffect } from 'react';
import '../index.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { url } from "../utils/api";
import { EventType } from "../types/EventType";
import Header from "../components/Header";

const Event = () => {
    const navigate = useNavigate();
    const { event_id } = useParams();
    const [event, setEvent] = useState<EventType | null>(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get<EventType>(`${url}/api/post/${event_id}`);
                setEvent(response.data);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchEvent();
    }, [event_id]);

    if (!event) {
        return <div className='text-red-800 text-3xl'>чета нету 404 типа</div>;
    }

    return (
        <>
            <Header/>
<div className="flex flex-col justify-center items-center p-20 bg-slate-950">
<h2 className='text-3xl text-neutral-200 pb-20'>{event.title}</h2>
            <p className='text-neutral-200 mb-10'>{event.body}</p>
            <p className='text-neutral-200'>Создано {new Date(event.created_at).toLocaleDateString()}</p>
</div>
        </>
    );
};

export default Event;
