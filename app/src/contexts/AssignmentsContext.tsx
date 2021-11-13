import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { IAssignment, IUser } from '../shared/interfaces';
import { config } from '../constants';
import { useUserContext } from './UserContext';

interface IAssignmentsProviderProps {
  children: JSX.Element;
}

interface IAssignmentsProviderValues {
  inProgressAssignments: IAssignment[];
  completedAssignments: IAssignment[];
}

const AssignmentsContext = createContext({} as IAssignmentsProviderValues);

const AssignmentsProvider = ({ children }: IAssignmentsProviderProps): JSX.Element => {
  const { currentUser } = useUserContext();
  const [inProgressAssignments, setInProgressAssignments] = useState<IAssignment[]>([]);
  const [completedAssignments, setCompletedAssignments] = useState<IAssignment[]>([]);

  useEffect(() => {
    if (currentUser) {
      fetch(`${config.url.API_URL}/assignments?user_id=${currentUser?.id}`)
        .then((r) => r.json())
        .then((json) => {
          setInProgressAssignments(json.in_progress_assignments);
          setCompletedAssignments(json.completed_assignments);
        });
    }
  }, [currentUser]);

  return (
    <AssignmentsContext.Provider
      value={{
        inProgressAssignments,
        completedAssignments,
      }}
    >
      {children}
    </AssignmentsContext.Provider>
  );
};

const useAssignmentsContext = (): IAssignmentsProviderValues => useContext(AssignmentsContext);

export { AssignmentsProvider, useAssignmentsContext };
