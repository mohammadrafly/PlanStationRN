import React, { Component } from 'react';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const AgendaScreen = () => {
    return <CalendarList
    onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
    pastScrollRange={50}
    futureScrollRange={50}
    scrollEnabled={true}
    showScrollIndicator={true}
  />
}

export default AgendaScreen
