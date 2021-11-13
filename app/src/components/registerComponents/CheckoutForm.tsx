import { Box, Button, TextField, Typography } from '@mui/material';
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
      <Typography variant="h3">Your Account</Typography>
      <Typography variant="h4">Create your Territory Counter account.</Typography>
      <TextField
        name="name"
        value={name}
        onChange={handleNameChange}
        label="Your Full Name"
        margin="normal"
        fullWidth
      />
      <TextField
        name="email"
        value={email}
        onChange={handleEmailChange}
        label="Your Email Address"
        margin="normal"
        fullWidth
      />
      <TextField
        name="confirmEmail"
        value={confirmEmail}
        onChange={handleConfirmEmailChange}
        label="Confirm Your Email"
        margin="normal"
        fullWidth
      />
      <hr />
      {apiAccess && (
        <>
          <Typography variant="h3">Payment Method</Typography>
          <TextField
            name="cardholderName"
            value={cardholderName}
            onChange={handleCardholderNameChange}
            label="Cardholder's Name"
            margin="normal"
            fullWidth
          />

          <Box>
            <CardElement options={{ style: { base: {} } }} />
          </Box>
          <hr />
        </>
      )}
      <Typography variant="body2">
        Once {apiAccess && 'your payment is processed and'} we have set up your congregation we will
        send you a confirmation email.
      </Typography>
      <Typography variant="body2">
        To finish setting up your account, please click the link in the confirmation email and
        complete the form.
      </Typography>
      <Button onClick={prevPage}>Back</Button>
      <Button onClick={handleSubmit}>Next</Button>
    </>
  );
};

export default CheckoutForm;
