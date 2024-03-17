import React, { useState } from 'react';

const Heropage = () => {
    const [faq, setFaq] = useState([
        {
            question: 'What are the risk factors for cervical cancer?',
            answer: 'Patients and doctors may want to know about the factors that increase the risk of developing cervical cancer, such as HPV infection, smoking, and immunosuppression.',
            open: false
        },
        {
            question: 'How often should women undergo cervical cancer screening?',
            answer: 'Both patients and doctors may have questions about the frequency and timing of cervical cancer screenings, including Pap smears and HPV tests, based on age, medical history, and other risk factors.',
            open: false
        },
        {
            question: 'What are the symptoms of cervical cancer?',
            answer: 'Patients may inquire about the signs and symptoms of cervical cancer, including abnormal vaginal bleeding, pelvic pain, and unusual discharge, while doctors may seek clarification on identifying potential warning signs during clinical examinations.',
            open: false
        },
        {
            question: 'What treatment options are available for cervical cancer?',
            answer: 'Patients and doctors may seek information about the various treatment modalities for cervical cancer, ranging from surgery and radiation therapy to chemotherapy and immunotherapy, as well as the potential side effects and outcomes associated with each option.',
            open: false
        },
        {
            question: 'Is cervical cancer preventable?',
            answer: 'Both patients and healthcare providers may want to know about preventive measures for cervical cancer, including HPV vaccination, regular screenings, and lifestyle modifications.',
            open: false
        },
        {
            question: 'What are the stages of cervical cancer?',
            answer: 'Patients and doctors may inquire about the staging system used for cervical cancer, which categorizes the disease based on the extent of tumor growth and spread, influencing treatment decisions and prognosis.',
            open: false
        },
        {
            question: 'Are there any risk-reducing behaviors for cervical cancer?',
            answer: 'Patients may be interested in learning about lifestyle modifications and risk-reducing behaviors that can lower the risk of developing cervical cancer, such as quitting smoking, practicing safe sex, and maintaining a healthy diet and weight.',
            open: false
        },
        {
            question: 'What are the side effects of cervical cancer treatment?',
            answer: 'Patients undergoing treatment for cervical cancer may have concerns about potential side effects, such as nausea, fatigue, hair loss, and infertility, and may seek information on managing these symptoms.',
            open: false
        },
        {
            question: 'Can cervical cancer recur after treatment?',
            answer: 'Patients who have completed treatment for cervical cancer may want to know about the possibility of disease recurrence, the signs and symptoms to watch for, and the importance of follow-up care and surveillance.',
            open: false
        },
        {
            question: 'How can I support a loved one with cervical cancer?',
            answer: 'Family members and friends of individuals diagnosed with cervical cancer may seek guidance on providing emotional support, assisting with practical tasks, and navigating the healthcare system during the treatment journey.',
            open: false
        }
    ]);

    const toggleFaq = (index) => {
        setFaq(faq.map((item, i) => {
            if (i === index) {
                item.open = !item.open;
            } else {
                item.open = false;
            }

            return item;
        }));
    }

    return (
        <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Frequently Asked Questions</h2>
                    <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do</p>
                </div>

                <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
                    {faq.map((item, index) => (
                        <div key={index} className="transition-all duration-200 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50">
                            <button type="button" className="flex items-center justify-between w-full px-4 py-5 sm:p-6" onClick={() => toggleFaq(index)}>
                                <span className="flex text-lg font-semibold text-black"> {item.question} </span>

                                <svg className={`w-6 h-6 text-gray-400 ${item.open ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <div className={`${item.open ? 'block' : 'hidden'} px-4 pb-5 sm:px-6 sm:pb-6`}>
                                <p dangerouslySetInnerHTML={{ __html: item.answer }}></p>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="text-center text-gray-600 textbase mt-9">Didn’t find the answer you are looking for? <a href="#" title="" className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline">Contact our support</a></p>
            </div>
        </section>
    );
}

export default Heropage;
