import React, { useState } from "react"
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "./CheckoutForm";

const Register = (props) => {
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

    const [ page, setPage ] = useState(0)
    const nextPage = () => {
        setPage(prevPage => prevPage + 1)
    }
    const prevPage = () => {
        setPage(prevPage => prevPage - 1)
    }

    const [ congName, setCongName ] = useState("")
    const handleCongNameChange = e => {
        setCongName(e.currentTarget.value)
    }

    const [ lang, setLang ] = useState("English")
    const handleLangChange = e => {
        setLang(e.currentTarget.value)
    }

    const [ apiAccess, setApiAccess ] = useState(true)
    const handleApiAccessChange = e => {
        if (e.currentTarget.value === "1") {
            setApiAccess(true)
        }
        else{
            setApiAccess(false)
        }
    }

    switch (page) {
        case 0:
            return (
                <>
                    <h2>First, tell us about your congregation.</h2>
                    <div id="new-congregation-form-body">
                        <div className="input-row">
                            <label htmlFor="congName">Congregation Name: </label>
                            <input type="text"
                                   name="congName"
                                   value={congName}
                                   onChange={handleCongNameChange} />
                        </div>
                        <div className="input-row">
                            <label htmlFor="lang">Language: </label>
                            <select name="lang"
                                    value={lang}
                                    onChange={handleLangChange}>
                                <option value="English">English</option>
                                <option value="Spanish">Spanish</option>
                                <option value="Chinese">Chinese</option>
                            </select>
                        </div>
                    </div>
                    <hr />
                    <button onClick={nextPage} className="btn btn-primary">Next</button>
                </>
            )
        case 1:
            return (
                <>
                    <div id="new-congregation-form-body">
                        <h2>Would you like access to our address database?</h2>
                        <p className="form-info">This paid feature will give you access to names, contacts, and phone numbers (when available) of those in your congregation territory. If you are an English congregation, this will include all available records.  If you are a Spanish or foreign language congregation, the contacts will be filtered to include only those whose primary language is that of your congregation.</p>
                        <div className="radio-row">
                            <input type="radio"
                                   name="apiAccess"
                                   value="1"
                                   checked={apiAccess}
                                   onChange={handleApiAccessChange} />
                            <label htmlFor="apiAccess">Yes, we would like access. ({(lang === "English" || lang === "Spanish") ? "$500" : "$300"} yearly subscription for your congregation)</label>
                        </div>
                        <div className="radio-row">
                            <input type="radio"
                                   name="noApiAccess"
                                   value="0"
                                   checked={!apiAccess}
                                   onChange={handleApiAccessChange} />
                            <label htmlFor="noApiAccess">No, we have our own list we will upload and maintain.</label>
                        </div>
                    </div>
                    <hr />
                    <button onClick={prevPage} className="btn btn-primary">Back</button>
                    <button onClick={nextPage} className="btn btn-primary">Next</button>
                </>
            )
        case 2:
            return (
                <>
                    <Elements stripe={stripePromise}>
                        <div id="new-congregation-form-body">
                            <CheckoutForm congName={congName}
                                          lang={lang}
                                          apiAccess={apiAccess}
                                          prevPage={prevPage} />
                        </div>
                    </Elements>
                </>
            )
        default:
            return (
                <>
                </>
            )
    }
}

export default Register