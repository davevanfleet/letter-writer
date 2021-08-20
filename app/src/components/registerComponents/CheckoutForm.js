import React, { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';


const CheckoutForm = (props) => {
    const stripe = useStripe()
    const elements = useElements()

    const [ validationErrors, setValidationErrors ] = useState("")
    const addValidationError = (error) => {
        setValidationErrors(error)
    }

    const [ processing, setProcessing ] = useState(false)
    const [ processingMessage, setProcessingMessage ] = useState("")

    const [ name, setName ] = useState("")
    const handleNameChange = (e) => {
        setName(e.currentTarget.value)
    }

    const [ email, setEmail ] = useState("")
    const handleEmailChange = (e) => {
        setEmail(e.currentTarget.value)
    }

    const [ confirmEmail, setConfirmEmail ] = useState("")
    const handleConfirmEmailChange = (e) => {
        setConfirmEmail(e.currentTarget.value)
    }

    const [ cardholderName, setCardholderName ] = useState("")
    const handleCardholderNameChange = (e) => {
        setCardholderName(e.currentTarget.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if ((stripe && elements) && (email === confirmEmail)){
            const {error, paymentMethod} = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
            })
            // If anything goes wrong above, error will be created.  Add it to validation errors.
            if (error){
                addValidationError(error.message)
            }
            // If createPaymentMethod succeeds, paymentMethod will be created,
            // handle appropriate AJAX calls here
            else if (paymentMethod){
                setProcessing(true)
                setProcessingMessage("Processing payment...")
                const payload = {
                    paymentMethodId: paymentMethod.id,
                }

                const configObj = {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json",
                        'Accepts': "application/json",
                    },
                    body: JSON.stringify(payload)
                }
                fetch(`${process.env.REACT_APP_BACKEND_URL}/api/subscriptions`, configObj)
                    .then(r => {
                        if(!r.ok){throw r}
                        else{return r.json()}
                    })
                    .then(d => {
                        console.log(d)
                    })
                    .catch(e => {
                        console.log(e)
                    })
            }
        }
    }

    return (
        <>
            <h3>Your Account</h3>
            <h4>Create your Territory Counter account.</h4>
            
            <div className="input-row">
                <label htmlFor="name">Your Full Name</label>
                <input type="text"
                       name="name"
                       value={name}
                       onChange={handleNameChange} />
            </div>
            <div className="input-row"> 
                <label htmlFor="email">Your Email Address</label>
                <input type="email"
                       name="email"
                       value={email}
                       onChange={handleEmailChange} />
            </div>
            <div className="input-row">
                <label htmlFor="confirmEmail">Confirm Your Email</label>
                <input type="email"
                       name="confirmEmail"
                       value={confirmEmail}
                       onChange={handleConfirmEmailChange} />
            </div>

            <p className="form-info"><em>Once your payment is processed and we have set up your congregation we will send you a confirmation email.</em></p>
            <p className="form-info"><em>To finish setting up your account, please click the link in the confirmation email and complete the form.</em></p>

            <hr />
            <div id="payment-section">
                <h3>Payment Method</h3>
                <div className="input-row">
                    <label htmlFor="cardholderName">Cardholder's Name</label>
                    <input type="text"
                           name="cardholderName"
                           value={cardholderName}
                           onChange={handleCardholderNameChange}
                           id="cardholder-name" />
                </div>
                <div id="stripe-elements-wrapper">
                    <CardElement options={{style: {base: {}}}}/>
                </div>
            </div>
            <hr />
        </>
    )
}

export default CheckoutForm