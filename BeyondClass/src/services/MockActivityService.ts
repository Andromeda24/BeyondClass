

export const fetchActivities = async (level: string, filter: string, lang:String) => {
  return [
    {
      id: 1,
      name: "Activity 1",
      description: "Description of Activity 1",
      weekday: "Monday",
      time: "10:00",
      levels: "1",
      imageUrl: "http://localhost:5173/public/pictures/piano.jpg",
      match: ""
    },
    {
      id: 2,
      name: "Activity 2",
      description: "Description of Activity 2",
      weekday: "Tuesday",
      time: "11:00",
      levels: "2",
      imageUrl: "http://localhost:5173/public/pictures/soccer.png",
      match: ""
    },
    {
      id: 3,
      name: "Activity 3",
      description: "Description of Activity 3",
      weekday: "Wednesday",
      time: "12:00",
      levels: "2",
      imageUrl: "/src/assets/activity.jpg",
      match: ""
    },
    {
      id: 4,
      name: "Activity 1",
      description: "Description of Activity 1",
      weekday: "Thursday",
      time: "10:00",
      levels: "1",
      imageUrl: "/src/assets/activity.jpg",
      match: ""
    },
    {
      id: 5,
      name: "Activity 2",
      description: "Description of Activity 2",
      weekday: "Friday",
      time: "11:00",
      levels: "2",
      imageUrl: "/src/assets/activity.jpg",
      match: ""
    },
    {
      id: 6,
      name: "Activity 3",
      description: "Description of Activity 3",
      weekday: "Saturday",
      time: "12:00",
      levels: "2",
      imageUrl: "/src/assets/activity.jpg",
      match: ""
    },
    {
      id: 7,
      name: "Jumping",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      weekday: "Saturday",
      time: "10:00 a.m. to 12:00 m",
      levels: "2 to 6 ",
      imageUrl: "",
      match: ""
    }
  ];  
};
