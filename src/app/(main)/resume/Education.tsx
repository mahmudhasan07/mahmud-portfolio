import React from 'react';
import education from '@/assists/Education.json';


const Education = () => {
    return (
        <section>
            <h1 className='text-4xl font-bold'>Education Qualification</h1>

            <div>

                {
                    education.map((item, idx) =>
                        <div className='space-y-2' key={idx}>
                            <div>
                                <div>
                                    <h2 className='text-xl font-semibold'>{item.title}</h2>
                                    <p>{item.institution} <span>({item.startDate} - {item.endDate})</span></p>
                                </div>
                                <h1 className='bgcolor w-fit rounded-lg px-4 py-2 font-semibold'>{item.CGPA}/{item.outOf}</h1>
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