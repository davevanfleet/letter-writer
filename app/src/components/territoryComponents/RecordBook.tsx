import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { IAssignment, ITerritory, IUser } from '../../shared/interfaces';
import React, { useEffect, useState } from 'react';
import { config } from '../../constants';

interface IRecordBookProps {
  currentUser: IUser;
}

const RecordBook = ({ currentUser }: IRecordBookProps): JSX.Element => {
  const [territories, setTerritories] = useState<ITerritory[]>([]);

  useEffect(() => {
    fetch(`${config.url.API_URL}/congregations/${currentUser.congregation.id}/territories`)
      .then((r) => {
        if (!r.ok) {
          throw r;
        }
        return r.json();
      })
      .then((d) => {
        setTerritories(d);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const styles = StyleSheet.create({
    page: {
      display: 'flex',
      flexDirection: 'row',
      padding: '5%',
    },
    territoryCol: {
      display: 'flex',
      flexDirection: 'column',
      width: '18%',
      border: '1px solid black',
    },
    territoryName: {
      width: '100%',
    },
    assignmentBox: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    assignmentBoxName: {
      display: 'flex',
      width: '100%',
      borderBottom: '1px solid black',
      borderTop: '1px solid black',
      height: '1.5em',
    },
    assignmentNameText: {
      textAlign: 'center',
      width: '100%',
    },
    assignmentBoxDatesRow: {
      display: 'flex',
      flexDirection: 'row',
      height: '1.5em',
      borderBottom: '1px solid black',
    },
    assignmentBoxCheckOut: {
      width: '50%',
      borderRight: '1px solid black',
    },
    assignmentBoxCheckIn: {
      width: '50%',
    },
  });

  const assignmentBoxes = (assignments: IAssignment[]) => {
    const boxes = [];
    for (let i = 0; i++, i < 25; ) {
      if (assignments[i - 1]) {
        let assignment = assignments[i - 1];
        boxes.push(
          <View style={styles.assignmentBox}>
            <View style={styles.assignmentBoxName}>
              <Text style={styles.assignmentNameText}>{assignment.publisher}</Text>
            </View>
            <View style={styles.assignmentBoxDatesRow}>
              <View style={styles.assignmentBoxCheckOut}>
                <Text>{assignment.checked_out}</Text>
              </View>
              <View style={styles.assignmentBoxCheckIn}>
                <Text>{assignment.checked_in}</Text>
              </View>
            </View>
          </View>,
        );
      } else {
        boxes.push(
          <View style={styles.assignmentBox}>
            <View style={styles.assignmentBoxName}></View>
            <View style={styles.assignmentBoxDatesRow}>
              <View style={styles.assignmentBoxCheckOut}></View>
              <View style={styles.assignmentBoxCheckIn}></View>
            </View>
          </View>,
        );
      }
    }
    return boxes;
  };

  const territoryCols = territories.map((territory: ITerritory) => {
    return (
      <View style={styles.territoryCol} key={territory.id}>
        <View style={styles.territoryName}>{territory.name}</View>
        {assignmentBoxes(territory.sorted_assignments)}
      </View>
    );
  });

  // const pages = () => {
  //     let result = [];
  //     let i = 0;
  //     while (i < )
  // }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {territoryCols.slice(0, 5)}
      </Page>
    </Document>
  );
};

export default RecordBook;
