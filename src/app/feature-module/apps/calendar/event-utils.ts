import { EventInput } from '@fullcalendar/core';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
    // November 1, 2023
    {
      id: createEventId(),
      title: 'Morning Cardio',
      start: '2023-11-01T07:00:00',
      end: '2023-11-01T08:00:00',
    },
    {
      id: createEventId(),
      title: 'Evening Yoga',
      start: '2023-11-01T18:30:00',
      end: '2023-11-01T20:00:00',
    },
    
    // November 10, 2023
    {
      id: createEventId(),
      title: 'Morning Strength Training',
      start: '2023-11-10T09:00:00',
      end: '2023-11-10T10:30:00',
    },
    {
      id: createEventId(),
      title: 'Evening Pilates',
      start: '2023-11-10T18:30:00',
      end: '2023-11-10T19:30:00',
    },
  
    // November 20, 2023
    {
      id: createEventId(),
      title: 'Morning Yoga',
      start: '2023-11-20T06:30:00',
      end: '2023-11-20T08:00:00',
    },
    {
      id: createEventId(),
      title: 'Evening Zumba',
      start: '2023-11-20T19:00:00',
      end: '2023-11-20T20:00:00',
    },
  
    // December 5, 2023
    {
      id: createEventId(),
      title: 'Morning HIIT Workout',
      start: '2023-12-05T06:00:00',
      end: '2023-12-05T07:00:00',
    },
    {
      id: createEventId(),
      title: 'Evening Spin Class',
      start: '2023-12-05T18:30:00',
      end: '2023-12-05T19:30:00',
    },
  
    // December 15, 2023
    {
      id: createEventId(),
      title: 'Morning Pilates',
      start: '2023-12-15T08:00:00',
      end: '2023-12-15T09:00:00',
    },
    {
      id: createEventId(),
      title: 'Evening Core Conditioning',
      start: '2023-12-15T18:30:00',
      end: '2023-12-15T19:30:00',
    },
  
    // December 28, 2023
    {
      id: createEventId(),
      title: 'Morning Zumba',
      start: '2023-12-28T08:30:00',
      end: '2023-12-28T09:30:00',
    },
    {
      id: createEventId(),
      title: 'Evening Dance Fitness',
      start: '2023-12-28T19:30:00',
      end: '2023-12-28T20:30:00',
    },
  
    // January 3, 2024
    {
      id: createEventId(),
      title: 'Morning Spin Class',
      start: '2024-01-03T06:30:00',
      end: '2024-01-03T07:30:00',
    },
    {
      id: createEventId(),
      title: 'Evening TRX Training',
      start: '2024-01-03T18:00:00',
      end: '2024-01-03T19:00:00',
    },
  
    // January 12, 2024
    {
      id: createEventId(),
      title: 'Morning Core Conditioning',
      start: '2024-01-12T08:30:00',
      end: '2024-01-12T09:30:00',
    },
    {
      id: createEventId(),
      title: 'Evening Body Pump',
      start: '2024-01-12T18:30:00',
      end: '2024-01-12T19:30:00',
    },
  
    // January 25, 2024
    {
      id: createEventId(),
      title: 'Morning Kickboxing',
      start: '2024-01-25T07:30:00',
      end: '2024-01-25T08:30:00',
    },
    {
      id: createEventId(),
      title: 'Evening MMA Conditioning',
      start: '2024-01-25T19:00:00',
      end: '2024-01-25T20:00:00',
    },
  
    // Additional Events
    {
      id: createEventId(),
      title: 'Morning Stretching',
      start: '2024-02-05T08:30:00',
      end: '2024-02-05T09:30:00',
    },
    {
      id: createEventId(),
      title: 'Morning CrossFit',
      start: '2024-02-15T07:00:00',
      end: '2024-02-15T08:00:00',
    },
    {
      id: createEventId(),
      title: 'Morning Barre Class',
      start: '2024-02-25T09:30:00',
      end: '2024-02-25T10:30:00',
    },
    {
      id: createEventId(),
      title: 'Evening Yoga Sculpt',
      start: '2024-03-05T18:30:00',
      end: '2024-03-05T19:30:00',
    },
    {
      id: createEventId(),
      title: 'Evening Body Combat',
      start: '2024-03-15T19:00:00',
      end: '2024-03-15T20:00:00',
    },
    {
      id: createEventId(),
      title: 'Evening Bootcamp',
      start: '2024-03-25T18:00:00',
      end: '2024-03-25T19:00:00',
    },
    {
      id: createEventId(),
      title: 'Morning Spinning',
      start: '2024-04-05T06:30:00',
      end: '2024-04-05T07:30:00',
    },
    {
      id: createEventId(),
      title: 'Morning Bootcamp',
      start: '2024-04-15T09:00:00',
      end: '2024-04-15T10:00:00',
    },
]
  
export function createEventId() {
  return String(eventGuid++);
}