import React from 'react';
import education from '@/assists/Education.json';


const Education = () => {
    return (
        <section>
            <h1 className='text-4xl font-bold my-5'>Education Qualification</h1>

            <div className='space-y-5'>

                {
                    education.map((item, idx) =>
                        <div className='space-y-2 p-5 borderNew2 text-start' key={idx}>
                            <div className='flex justify-between'>
                                <div>
                                    <h2 className='text-2xl font-semibold'>{item.title}</h2>
                                    <p>{item.institution} <span>({item.startDate} - {item.endDate})</span></p>
                                </div>
                                <h1 className='bgcolor w-fit rounded-lg my-auto px-4 py-2 font-semibold'>{item.CGPA}/{item.outOf}</h1>
                            </div>
                            <p>{item.description}</p>
                        </div>
                    )
                }

            </div>

        </section>
    );
};

export default Education;