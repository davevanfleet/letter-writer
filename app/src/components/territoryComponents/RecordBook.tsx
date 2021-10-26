import { Document, PDFViewer, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { IAssignment, ITerritory, IUser } from '../../shared/interfaces';
import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import { config } from '../../constants';

const RecordBook = (): JSX.Element => {
  const { currentUser } = useContext(UserContext);
  const [territories, setTerritories] = useState<ITerritory[]>([]);

  useEffect(() => {
    fetch(`${config.url.API_URL}/congregations/${currentUser!.congregation.id}/territories`)
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
      fontSize: '12pt',
      textAlign: 'center',
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
      height: '14pt',
    },
    assignmentNameText: {
      textAlign: 'center',
      fontSize: '10pt',
    },
    assignmentBoxDatesRow: {
      display: 'flex',
      flexDirection: 'row',
      height: '14pt',
      borderBottom: '1px solid black',
      fontSize: '8pt',
      textAlign: 'center',
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
        <View style={styles.territoryName}>
          <Text>{territory.name}</Text>
        </View>
        {assignmentBoxes(territory.sorted_assignments)}
      </View>
    );
  });

  const pages = () => {
    let result = [];
    let i = 0;
    while (i < territories.length) {
      result.push(
        <Page size="A4" style={styles.page}>
          {territoryCols.slice(i, i + 5)}
        </Page>,
      );
      i += 5;
    }
    return result;
  };

  return <Document>{pages()}</Document>;
};

export default RecordBook;
