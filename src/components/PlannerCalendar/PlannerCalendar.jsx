import { useCallback, useMemo, useState, memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import dayjs from 'dayjs';
import * as plannerAPI from '../../utils/plannerApi';
import { PlannerCalendarDay } from '../PlannerCalendarDay/PlannerCalendarDay.jsx';
import './PlannerCalendar.css';
const colors = [
  '#4081ec',
  '#5336c5',
  '#a477fb',
  '#154975',
  '#539ab3',
  '#235e31',
  '#13a64f',
  '#799b51',
  '#852405',
  '#db7538',
  '#d5082d',
  '#ae8788',
  '#5e4028',
  '#a27f27',
  '#830c6f',
  '#ed2bb1',
  '#d370a3',
  '#7d0af6'
];

export const PlannerCalendar = memo(function PlannerCalendar(accept) {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isSelected, setIsSelected] = useState(false);
  const [plannerEvents, setPlannerEvents] = useState([
    {
      date: '',
      recipes: []
    }
  ]);
  const [recipeColors, setRecipeColors] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const getRecipeEventBackgroundColors = (plannerEvents) => {
    const flattenedRecipes = plannerEvents
      .flatMap((plannerEvents) => {
        return plannerEvents.recipes.map((recipe) => recipe._id);
      })
      .sort();
    const uniqueRecipes = [...new Set(flattenedRecipes)];
    let i = 0;
    const recipeColorObjs = {};
    uniqueRecipes.forEach((recipeID) => {
      if (i > colors.length - 1) {
        i = 0;
      }
      recipeColorObjs[recipeID] = colors[i];
      i++;
    });
    return recipeColorObjs;
  };

  const getPlanner = useCallback(async () => {
    const month = generateWeeksOfTheMonth;
    const firstDay = month[0][0];
    const lastDay = month[month.length - 1][6];
    try {
      const plannerEvents = await plannerAPI.getEvents({ firstDay, lastDay });
      setRecipeColors(getRecipeEventBackgroundColors(plannerEvents));
      setPlannerEvents(plannerEvents);
    } catch (err) {
      console.log(err.message);
    }
  }, [selectedDate]);

  const currentDay = useMemo(() => dayjs().toDate(), []);

  useEffect(() => {
    getPlanner();
  }, []);

  const firstDayOfTheMonth = useMemo(
    () => selectedDate.clone().startOf('month'),
    [selectedDate]
  );

  const firstDayOfFirstWeekOfMonth = useMemo(
    () => dayjs(firstDayOfTheMonth).startOf('week'),
    [firstDayOfTheMonth]
  );

  const generateFirstDayOfEachWeek = useCallback((day) => {
    const dates = [day];
    for (let i = 1; i < 6; i++) {
      const date = day.clone().add(i, 'week');
      dates.push(date);
    }
    return dates;
  }, []);

  const generateWeek = useCallback((day) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = day.clone().add(i, 'day').toDate();
      dates.push(date);
    }
    return dates;
  }, []);

  const generateWeeksOfTheMonth = useMemo(() => {
    const firstDayOfEachWeek = generateFirstDayOfEachWeek(
      firstDayOfFirstWeekOfMonth
    );
    return firstDayOfEachWeek.map((date) => generateWeek(date));
  }, [generateFirstDayOfEachWeek, firstDayOfFirstWeekOfMonth, generateWeek]);

  const handleDrop = useCallback((day, item) => {
    plannerAPI.addEvent({ recipeID: item.recipeID, date: day }).then(() => {
      getPlanner();
    });
  }, []);

  console.log(shoppingList, '<-shoppingList');

  return (
    <div className="col-12">
      <div className="row d-flex mb-1">
        <div className="col-auto align-self-center">
          <MdKeyboardArrowLeft
            size={40}
            onClick={() => setSelectedDate((date) => date.subtract(1, 'month'))}
          />
          <MdKeyboardArrowRight
            size={40}
            onClick={() => setSelectedDate((date) => date.add(1, 'month'))}
          />
        </div>
        <div className="col-auto align-self-center">
          <span className="h2">{selectedDate.clone().format('MMM YYYY')}</span>
        </div>
        <div className="col-auto ms-auto align-items-center">
          <LinkContainer to="/list" state={{ shoppingList }}>
            <Button variant="primary text-white">Build Shopping List</Button>
          </LinkContainer>
        </div>
      </div>
      <div className="row bg-white rounded border">
        <div className="col-12 d-flex justify-content-around">
          {generateWeeksOfTheMonth[0].map((day, weekIndex) => (
            // Days of the week text
            <div
              className="day-week-header col-auto"
              key={`week-day-${weekIndex}`}
            >
              {dayjs(day).format('dd')}
            </div>
          ))}
        </div>
        <div className="col-12">
          {generateWeeksOfTheMonth.map((week, weekIndex) => {
            let weekRecipes = [];
            return (
              // Weeks of month
              <div className="row" key={`week-${weekIndex}`}>
                <div className="col-12 p-0 d-flex justify-content-around">
                  {week.map((day, dayIndex) => {
                    // Days of week
                    let dateType =
                      selectedDate.clone().toDate().getMonth() !==
                      day.getMonth()
                        ? 'nextMonth'
                        : dayjs(currentDay).isSame(day, 'date')
                        ? 'today'
                        : 'default';
                    let recipes = [];
                    let dayRecipeColors = {};
                    plannerEvents.forEach((event) => {
                      if (
                        dayjs(day).format('YYYY-MM-DD') ===
                        dayjs(event.date).format('YYYY-MM-DD')
                      ) {
                        recipes.push(...event.recipes);
                        weekRecipes.push(...event.recipes);
                        event.recipes.forEach((recipe) => {
                          dayRecipeColors[recipe._id] =
                            recipeColors[recipe._id];
                        });
                      }
                    });
                    return (
                      <PlannerCalendarDay
                        key={`day-${dayIndex}`}
                        accept={['recipe']}
                        dayNumber={day.getDate()}
                        handleOnDrop={(item) => handleDrop(day, item)}
                        recipes={recipes}
                        dateType={dateType}
                        dayRecipeColors={dayRecipeColors}
                        setShoppingList={setShoppingList}
                        shoppingList={shoppingList}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
