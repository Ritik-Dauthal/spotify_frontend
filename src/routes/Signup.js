import React, { useContext, useState } from 'react'
import { Icon } from "@iconify/react";
import TextInput from "../Components/Shared/TextInput";
import PasswordInput from "../Components/Shared/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { makeUnauthenticatedPOSTRequest } from '../Utils/helper';
import { useCookies } from 'react-cookie';
import CalenderInputYear from '../Components/Shared/CalenderInputYear';
import CalenderInputMonth from '../Components/Shared/CalenderInputMonth';
import CalenderInputDay from '../Components/Shared/CalenderInputDay';
import { userContext } from '../App';
import LoginSignupLoader from '../Components/Shared/LoginSignupLoader';


export default function Signup() {
    const [cookie, setCookie] = useCookies(["token"]);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { setUser } = useContext(userContext)

    const SignupSchema = Yup.object().shape({
        email: Yup.string().email().required("You need to enter your email"),
        confirmEmail: Yup.string()
            .email()
            .required("Confirm email is a required field")
            .test('emails-match', 'Please enter correct email', function (value) {
                return value === this.parent.email;
            }),
        password: Yup.string().min(8).required("You need to enter a password"),
        fname: Yup.string().required("Enter a name for your profile"),
        username: Yup.string().required("Please select a username"),
        year: Yup.number().integer("Year must be an integer")
            .min(1900, "Year must be greater than or equal to 1900")
            .max(new Date().getFullYear(), "Year cannot be in the future")
            .required("Enter a valid year"),
        Month: Yup.string().required("Enter a valid month"),
        day: Yup.number().required("Enter a valid day")
            .integer('Day must be an integer')
            .min(1, 'Day must be at least 1')
            .max(31, 'Day must be at most 31'),
    });

    const { values,
        isValid,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit } = useFormik({
            initialValues: { email: '', confirmEmail: '', password: '', username: '', fname: '', lname: '', year: '', Month: '', day: '' },
            onSubmit: async (values) => {
                setLoading(true)
                const { email, password, username, fname, lname, year, Month, day } = values
                const data = { email, password, username, firstName: fname, lastName: lname, year, month: Month, day }
                const response = await makeUnauthenticatedPOSTRequest("/auth/register", data)


                if (response && !response.err) {
                    const userData = { firstName: response.firstName, lastName: response.lastName, email: response.email, username: response.username, year: response.year, month: response.month, day: response.day }
                    const token = response.token
                    const date = new Date()
                    date.setDate(date.getDate() + 30)
                    setCookie("token", token, { path: "/", expires: date })
                    setLoading(false)
                    setUser(userData)
                    navigate("/")
                }
                else if (response && response.err === "Already exist") {
                    alert("Email already exist. 🙁")
                    setLoading(false)
                }

                else if (response && response.err === "Username already exist") {
                    alert("username already exist 🙁, please select another username!")
                    setLoading(false)
                }
                else {
                    alert("Registration failed! 😢")
                    setLoading(false)
                }


            },
            validationSchema: SignupSchema
        })

    return (
        <div className="flex flex-col items-center w-full h-full">
            {loading && (
                <LoginSignupLoader
                />
            )}
            <div className="flex justify-center w-full p-5 border-b border-gray-300 border-solid logo">
                <Icon icon="logos:spotify" width="150" />
            </div>
            <div className="flex flex-col items-center justify-center w-[90%] py-10 md:w-1/3 inputRegion">
                <div className="mb-4 text-lg font-bold md:text-2xl mb:text-2xl">
                    Sign up for free to start listening.
                </div>

                <form onSubmit={handleSubmit}>
                    <TextInput
                        label="What's your email address?"
                        placeholder="Enter your email."
                        className="my-6"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        touched={touched}
                        errors={errors}


                    />
                    <TextInput
                        label="Confirm Email Address"
                        placeholder="Enter your email again"
                        className="mb-6"
                        type="email"
                        name="confirmEmail"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmEmail}
                        touched={touched}
                        errors={errors}

                    />
                    <TextInput
                        label="Username"
                        placeholder="Enter your username"
                        className="mb-6"
                        type="text"
                        name="username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                        touched={touched}
                        errors={errors}

                    />
                    <PasswordInput
                        label="Create a password"
                        placeholder="Create a password"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        touched={touched}
                        errors={errors}

                    />
                    <div className='flex flex-col w-full my-4 md:items-center md:justify-between md:space-x-8 md:flex-row'>
                        <CalenderInputYear
                            type="number"
                            label={"Year"}
                            name="year"
                            placeholder="YYYY"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.year}
                            touched={touched}
                            errors={errors}
                        />
                        <CalenderInputMonth
                            name="Month"
                            label={"Month"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.Month}
                            touched={touched}
                            errors={errors} />

                        <CalenderInputDay className="my-6"
                            type="number"
                            label={"Day"}
                            name="day"
                            placeholder="DD"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.day}
                            touched={touched}
                            errors={errors} />
                    </div>

                    <div className="flex flex-col w-full md:items-center md:justify-between md:space-x-8 md:flex-row">
                        <TextInput
                            label="What should we call you?"
                            placeholder="Enter Your First Name"
                            className="mb-6"
                            type="text"
                            name="fname"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.fname}
                            touched={touched}
                            errors={errors}

                        />
                        <TextInput
                            label="Last Name"
                            placeholder="Enter Your Last Name"
                            className="mb-6"
                            type="text"
                            name="lname"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lname}
                            touched={touched}
                            errors={errors}

                        />
                    </div>
                    <div className="flex items-center justify-center w-full my-8 ">
                        <button type='submit' disabled={!isValid}
                            className="p-3 px-10 font-semibold bg-green-400 rounded-full hover:bg-green-700 disabled:bg-gray-600"

                        >
                            Sign Up
                        </button>
                    </div>
                </form>


                <div className="w-full border border-gray-300 border-solid"></div>
                <div className="my-6 text-sm font-semibold md:text-lg">
                    Already have an account?
                </div>
                <div className="flex items-center justify-center w-full py-4 text-sm font-bold text-gray-500 border border-gray-500 rounded-full md:text-lg">
                    <Link to="/login">LOG IN INSTEAD</Link>
                </div>
            </div>
        </div>
    )
}
