import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { config } from '../../constants';

interface ICheckoutFormProps {
  congName: string;
  lang: string;
  apiAccess: boolean;
  prevPage: () => void;
}

const CheckoutForm = ({ congName, lang, apiAccess, prevPage }: ICheckoutFormProps): JSX.Element => {
  const stripe = useStripe();
  const elements = useElements();

  const [validationErrors, setValidationErrors] = useState<string | undefined>('');
  const addValidationError = (error: string | undefined) => {
    setValidationErrors(error);
  };

  const [processing, setProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState('');

  const [name, setName] = useState('');
  const handleNameChange = (e: any) => {
    setName(e.currentTarget.value);
  };

  const [email, setEmail] = useState('');
  const handleEmailChange = (e: any) => {
    setEmail(e.currentTarget.value);
  };

  const [confirmEmail, setConfirmEmail] = useState('');
  const handleConfirmEmailChange = (e: any) => {
    setConfirmEmail(e.currentTarget.value);
  };

  const [cardholderName, setCardholderName] = useState('');
  const handleCardholderNameChange = (e: any) => {
    setCardholderName(e.currentTarget.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (stripe && elements && email === confirmEmail) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)!,
      });
      // If anything goes wrong above, error will be created.  Add it to validation errors.
      if (error) {
        addValidationError(error.message);
      }
      // If createPaymentMethod succeeds, paymentMethod will be created,
      // handle appropriate AJAX calls here
      else if (paymentMethod) {
        setProcessing(true);
        setProcessingMessage('Processing payment...');
        const payload = {
          congregation: {
            name: congName,
            api_access: apiAccess,
          },
          user: {
            name: name,
            email: email,
          },
        };

        const configObj = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accepts: 'application/json',
          },
          body: JSON.stringify(payload),
        };
        fetch(`${config.url.API_URL}/congregations`, configObj)
          .then((r) => {
            if (!r.ok) {
              throw r;
            } else {
              return r.json();
            }
          })
          .then((d) => {
            if (apiAccess) {
              let priceId;
              if (lang === 'English') {
                priceId = config.priceIds.english;
              } else if (lang === 'Spanish') {
                priceId = config.priceIds.spanish;
              } else {
                priceId = config.priceIds.foreignLang;
              }
              const configObj = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Accepts: 'application/json',
                },
                body: JSON.stringify({
                  subscription: {
                    payment_method_id: paymentMethod.id,
                    price_id: priceId,
                  },
                }),
              };
              fetch(`${config.url.API_URL}/congregations/${d.id}/subscriptions`, configObj)
                .then((r) => {
                  if (!r.ok) {
                    throw r;
                  }
                  return r.json();
                })
                .then((d) => {
                  console.log(d);
                })
                .catch((e) => {
                  console.log(e);
                });
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  };

  return (
    <>
      <h3>Your Account</h3>
      <h4>Create your Territory Counter account.</h4>

      <div className="input-row">
        <label htmlFor="name">Your Full Name</label>
        <input type="text" name="name" value={name} onChange={handleNameChange} />
      </div>
      <div className="input-row">
        <label htmlFor="email">Your Email Address</label>
        <input type="email" name="email" value={email} onChange={handleEmailChange} />
      </div>
      <div className="input-row">
        <label htmlFor="confirmEmail">Confirm Your Email</label>
        <input
          type="email"
          name="confirmEmail"
          value={confirmEmail}
          onChange={handleConfirmEmailChange}
        />
      </div>

      <p className="form-info">
        <em>
          Once {apiAccess && 'your payment is processed and'} we have set up your congregation we
          will send you a confirmation email.
        </em>
      </p>
      <p className="form-info">
        <em>
          To finish setting up your account, please click the link in the confirmation email and
          complete the form.
        </em>
      </p>

      <hr />
      {apiAccess && (
        <>
          <div id="payment-section">
            <h3>Payment Method</h3>
            <div className="input-row">
              <label htmlFor="cardholderName">Cardholder&apos;s Name</label>
              <input
                type="text"
                name="cardholderName"
                value={cardholderName}
                onChange={handleCardholderNameChange}
                id="cardholder-name"
              />
            </div>

            <div id="stripe-elements-wrapper">
              <CardElement options={{ style: { base: {} } }} />
            </div>
          </div>
          <hr />
        </>
      )}
      <button onClick={prevPage} className="btn btn-primary">
        Back
      </button>
      <button onClick={handleSubmit} className="btn btn-primary">
        Next
      </button>
    </>
  );
};

export default CheckoutForm;
