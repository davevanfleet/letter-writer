import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Box } from '@mui/system';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { config } from '../../constants';
import { loadStripe } from '@stripe/stripe-js';

const Register = (): JSX.Element => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);

  const [page, setPage] = useState(0);
  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const prevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const [congName, setCongName] = useState('');
  const handleCongNameChange = (e: any) => {
    setCongName(e.currentTarget.value);
  };

  const [lang, setLang] = useState('eng');
  const handleLangChange = (e: any) => {
    setLang(e.currentTarget.value);
  };

  const [apiAccess, setApiAccess] = useState('t');
  const handleApiAccessChange = (e: any) => {
    setApiAccess(e.currentTarget.value);
  };

  const languageOptions = [];
  for (const [code, language] of Object.entries(config.languageMapping)) {
    languageOptions.push(<MenuItem value={code}>{language}</MenuItem>);
  }

  switch (page) {
    case 0:
      return (
        <>
          <Typography variant="h2">First, tell us about your congregation.</Typography>
          <TextField
            name="congName"
            value={congName}
            onChange={handleCongNameChange}
            label="Congregation Name"
            margin="normal"
            fullWidth
          />
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel>Language</InputLabel>
            <Select name="lang" value={lang} onChange={handleLangChange} label="Language">
              {languageOptions}
            </Select>
          </FormControl>
          <hr />
          <Button onClick={nextPage}>Next</Button>
        </>
      );
    case 1:
      return (
        <>
          <Box mb={4}>
            <Typography variant="h2">Would you like access to our address database?</Typography>
            <Typography variant="caption">
              This paid feature will give you access to names, contacts, and phone numbers (when
              available) of those in your congregation territory. If you are an English
              congregation, this will include all available records. If you are a Spanish or foreign
              language congregation, the contacts will be filtered to include only those whose
              primary language is that of your congregation.
            </Typography>
          </Box>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              defaultValue="t"
              name="api-access"
              value={apiAccess}
              onChange={handleApiAccessChange}
            >
              <FormControlLabel
                value="t"
                control={<Radio />}
                label={`Yes, we would like access. (${
                  lang === 'eng' || lang === 'spa' ? '$500' : '$300'
                } 
              yearly subscription for your congregation)`}
              />
              <FormControlLabel
                value="f"
                control={<Radio />}
                label="No, we have our own list we will upload and maintain."
              />
            </RadioGroup>
          </FormControl>
          <hr />
          <Button onClick={prevPage}>Back</Button>
          <Button onClick={nextPage}>Next</Button>
        </>
      );
    case 2:
      return (
        <>
          <Elements stripe={stripePromise}>
            <CheckoutForm
              congName={congName}
              lang={lang}
              apiAccess={apiAccess === 't'}
              prevPage={prevPage}
            />
          </Elements>
        </>
      );
    default:
      return <></>;
  }
};

export default Register;
