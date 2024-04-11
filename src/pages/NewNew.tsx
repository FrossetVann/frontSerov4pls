import React, { useState } from "react";
import '../index.css'
import axios from "axios";
import Header from "../components/Header";
import {url} from '../utils/api'
import {EventData} from "../types/AddEvent";
import {useNavigate} from "react-router-dom";

export const NewNew: React.FC = () => {
    const navigate = useNavigate()
    const [eventData, setEventData] = useState<EventData>({
      title:'',
        body:'',
        created_at:'',
        user_id:0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEventData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setEventData((prevData) => ({
            ...prevData,
            [name]: checked,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(`${url}/api/post`, eventData);
            navigate('/')
            console.log("Данные отправлены:", eventData);
        } catch (error) {
            console.error("Ошибка: ", error);
        }
    };

    return (
        <>
            <Header/>
            <br/>
        <form onSubmit={handleSubmit}>
            <input
                className='h-10 bg-gray-200 text-black'
                name="title"
                value={eventData.title}
                onChange={handleChange}
                required
            />  <br/>  <br/>
            <input
                className='h-20 bg-gray-200 text-black'
                name="body"
                value={eventData.body}
                onChange={handleChange}
                required
            />  <br/>  <br/>

            <input
                className='h-10 bg-gray-200 text-black'
                name="created_at"
                type="date"
                value={eventData.created_at}
                onChange={handleChange}
                required
            />  <br/>  <br/>

            <button className='w-[50%] bg-blue-900 flex justify-center items-center h-10 text-neutral-200' type="submit">
                Создать Новость
            </button>
        </form>
        </>
    );
};

export default NewNew;
