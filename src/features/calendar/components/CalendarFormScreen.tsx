import React, {useState} from 'react';
import {Text} from 'react-native';
import {CalendarStackScreenProps} from '../../../common/models';
import {ListItem} from '@rneui/themed';
import {CATEGORIES} from '../../../common/constants';
import styled from 'styled-components/native';
import DatePicker from 'react-native-date-picker';
import MyCalendar from './Calendar';
import {useSelector} from 'react-redux';
import {setSelectedDate} from '../calendarSlice';
import dayjs from 'dayjs';
import Button from '../../../common/components/Button';

const listItemStyle = {
  borderRadius: 8,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: '#E6E6E6',
};
function CalendarFormScreen({
  route,
}: CalendarStackScreenProps<'CalendarFormScreen'>) {
  const selectedDate = useSelector(state => state.calendar.selectedDate);

  const [date, setDate] = useState(new Date());

  // data state
  const [selectedTime, setSelectedTime] = useState<string>();
  const [selectedCategory, setSelectedCategory] = useState<string>();

  // expand state
  const [expandCalendar, setExpandedCalendar] = useState<boolean>(true);
  const [expandedCategory, setExpandedCategory] = useState<boolean>();
  const [expandedTime, setExpandedTime] = useState<boolean>();

  const onPress = name => {
    setSelectedCategory(name);
    setTimeout(() => setExpandedCategory(!expandedCategory), 200);
  };

  return (
    <Container>
      <ListItem.Accordion
        containerStyle={listItemStyle}
        content={
          <ListItem.Content>
            <Title>일정등록</Title>
            <SubTitle>
              {selectedDate?.dateString ? (
                <Text>{selectedDate.dateString}</Text>
              ) : (
                '날짜를 선택해주세요'
              )}
            </SubTitle>
          </ListItem.Content>
        }
        isExpanded={expandCalendar}
        onPress={() => {
          setExpandedCalendar(!expandCalendar);
        }}>
        <MyCalendar />
      </ListItem.Accordion>
      <ListItem.Accordion
        containerStyle={listItemStyle}
        content={
          <ListItem.Content>
            <Title>카테고리</Title>
            <SubTitle>
              {selectedCategory ? selectedCategory : '카테고리를 선택해주세요'}
            </SubTitle>
          </ListItem.Content>
        }
        isExpanded={expandedCategory}
        onPress={() => {
          setExpandedCategory(!expandedCategory);
        }}>
        {CATEGORIES.map(name => (
          <StyledListItem
            key={name}
            selectedCategory={selectedCategory === name}
            onPress={() => onPress(name)}>
            <Text>{name}</Text>
          </StyledListItem>
        ))}
      </ListItem.Accordion>
      <ListItem.Accordion
        containerStyle={listItemStyle}
        content={
          <ListItem.Content>
            <Title>시간</Title>
            <SubTitle>
              {selectedTime ? selectedTime : '시간을 선택해주세요'}
            </SubTitle>
          </ListItem.Content>
        }
        isExpanded={expandedTime}
        onPress={() => {
          setExpandedTime(!expandedTime);
        }}>
        <DatePicker
          locale="ko"
          mode="time"
          date={date}
          onDateChange={date => {
            setSelectedTime(dayjs(date).format('HH:mm'));
          }}
        />
      </ListItem.Accordion>
      <Button styleType="primary">저장</Button>
    </Container>
  );
}

const Container = styled.ScrollView`
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 14px;
`;

const SubTitle = styled.Text`
  font-size: 18px;
  color: #b3b3b3; ;
`;

// @ts-ignore
const StyledListItem = styled.Pressable`
  display: flex;
  padding-left: 20px;
  justify-content: center;
  background-color: ${({selectedCategory}) =>
    selectedCategory ? '#D9D9D9' : 'white'};
  height: 53px;
`;

export default CalendarFormScreen;
