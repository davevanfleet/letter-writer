import { Box, Button, Typography } from '@mui/material';
import React, { ReactNode, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { config } from '../../constants';
import { useUserContext } from '../../contexts/UserContext';
import Ban from '../../icons/Ban';
import Briefcase from '../../icons/Briefcase';
import Clipboard from '../../icons/Clipboard';
import Envelope from '../../icons/Envelope';
import User from '../../icons/User';
import { IUser } from '../../shared/interfaces';
import UpdatePublisher from './UpdatePublisher';

interface IPublisherItemProps {
  icon: ReactNode;
  primary: ReactNode;
  secondary: ReactNode;
}

const PublisherItem = ({ icon, primary, secondary }: IPublisherItemProps): JSX.Element => (
  <Box display="flex" flexDirection="row">
    <Box mr={2}>{icon}</Box>
    <Box mb={3} sx={{ textAlign: 'left' }}>
      <Typography variant="subtitle2" gutterBottom>
        {primary}
      </Typography>
      <Typography variant="body2">{secondary}</Typography>
    </Box>
  </Box>
);

const Publisher = () => {
  const { currentUser } = useUserContext();
  const { id } = useParams<Record<string, string | undefined>>();
  const [user, setUser] = useState<IUser | undefined>();
  useEffect(() => {
    if (currentUser && id) {
      fetch(`${config.url.API_URL}/congregations/${currentUser.congregation.id}/users/${id}`)
        .then((r) => r.json())
        .then((d) => {
          setUser(d);
        });
    }
  }, [currentUser, id]);

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const roleIcon: { [index: string]: ReactNode } = {
    Admin: <Clipboard />,
    Publisher: user?.email ? <Briefcase /> : <Ban />,
  };

  return (
    <>
      <Typography variant="h1">Publisher</Typography>
      {user && (
        <Box maxWidth={300} mx="auto">
          <PublisherItem icon={<User />} primary="Name" secondary={user.name} />
          <PublisherItem
            icon={roleIcon[user.role]}
            primary="Role"
            secondary={user.email ? user.role : 'No Account'}
          />
          {user.email && (
            <>
              <PublisherItem icon={<Envelope />} primary="Email" secondary={user.email} />
              <Button onClick={() => setOpen(true)}>Edit</Button>
              <UpdatePublisher open={open} handleClose={handleClose} publisher={user} />
            </>
          )}
        </Box>
      )}
    </>
  );
};

export default Publisher;
