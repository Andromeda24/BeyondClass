
def getMockActivity():
    return {
  "level": -2,
  "activities": [
    {
      "id": "11",
      "name": "Junior Basketball",
      "description": "Junior Basketball introduces students to teamwork, coordination, and athletic discipline. Participants learn dribbling, passing, shooting, and defensive techniques through structured drills and friendly scrimmages. The program emphasizes sportsmanship and confidence-building, helping young athletes develop both physical skills and a positive mindset.",
      "weekday": "Monday",
      "time": "2:30 p.m. to 3:30 p.m.",
      "levels": "Grades 3–6",
      "cost": 180.0,
      "txtoptionalcosts": "Uniform ($25)",
      "optionals": [
        {
          "concept": "Uniform",
          "value": 25.0
        }
      ],
      "imageUrl": "",
      "match": "all activities"
    },
    {
      "id": "12",
      "name": "Girls’ Soccer Training",
      "description": "Girls’ Soccer Training focuses on agility, endurance, and teamwork. Students practice ball control, passing, defensive positioning, and goal-scoring techniques in a supportive environment that encourages growth and camaraderie.",
      "weekday": "Monday",
      "time": "2:30 p.m. to 3:30 p.m.",
      "levels": "Grades 4–7",
      "cost": 170.0,
      "txtoptionalcosts": "Transportation ($30)",
      "optionals": [
        {
          "concept": "Transportation",
          "value": 30.0
        }
      ],
      "imageUrl": "http://localhost:5173/public/pictures/soccer.png",
      "match": "all activities"
    },
    {
      "id": "13",
      "name": "Junior Volleyball",
      "description": "Junior Volleyball teaches serving, passing, setting, and teamwork. Students participate in drills and friendly matches designed to build confidence and coordination.",
      "weekday": "Monday",
      "time": "2:30 p.m. to 3:30 p.m.",
      "levels": "Grades 5–8",
      "cost": 190.0,
      "txtoptionalcosts": "Knee pads ($15)",
      "optionals": [
        {
          "concept": "Knee pads",
          "value": 15.0
        }
      ],
      "imageUrl": "http://localhost:5173/public/pictures/volleyball.jpg",
      "match": "all activities"
    },
    {
      "id": "21",
      "name": "Piano Foundations",
      "description": "Piano Foundations offers young musicians a welcoming introduction to musical expression. Students explore rhythm, melody, and basic music theory while learning proper hand position and technique. Each lesson blends structured practice with creative activities that encourage students to experiment with sound.",
      "weekday": "Wednesday",
      "time": "2:30 p.m. to 3:30 p.m.",
      "levels": "Grades 1–5",
      "cost": 250.0,
      "txtoptionalcosts": "Sheet-music pack ($15)",
      "optionals": [
        {
          "concept": "Sheet-music pack",
          "value": 15.0
        }
      ],
      "imageUrl": "http://localhost:5173/public/pictures/piano.jpg",
      "match": "all activities"
    },
    {
      "id": "31",
      "name": "Creative Painting Studio",
      "description": "Creative Painting Studio encourages students to explore color, texture, and artistic expression. Each session introduces a new technique—watercolor, acrylic, or mixed media—while allowing students to develop their personal style.",
      "weekday": "Saturday",
      "time": "10:00 a.m. to 11:30 a.m.",
      "levels": "Grades 2–6",
      "cost": 220.0,
      "txtoptionalcosts": "Paintbrush set ($12)",
      "optionals": [
        {
          "concept": "Paintbrush set",
          "value": 12.0
        }
      ],
      "imageUrl": "http://localhost:5173/public/pictures/painting.png",
      "match": "all activities"
    },
    {
      "id": "32",
      "name": "Drama & Theater Workshop",
      "description": "Drama & Theater Workshop helps students build confidence through acting exercises, improvisation, and scene work. Participants learn voice projection, character development, and stage presence.",
      "weekday": "Wednesday",
      "time": "2:30 p.m. to 3:30 p.m.",
      "levels": "Grades 4–12",
      "cost": 240.0,
      "txtoptionalcosts": "Costume materials ($20)",
      "optionals": [
        {
          "concept": "Costume materials",
          "value": 20.0
        }
      ],
      "imageUrl": "http://localhost:5173/public/pictures/teather.png",
      "match": "all activities"
    },
    {
      "id": "33",
      "name": "Digital Photography Basics",
      "description": "Students learn composition, lighting, and camera settings while exploring creative storytelling through photography. Each session includes hands-on practice and mini-projects.",
      "weekday": "Saturday",
      "time": "10:00 a.m. to 11:30 a.m.",
      "levels": "Grades 6–12",
      "cost": 260.0,
      "txtoptionalcosts": "Photo editing software license ($25)",
      "optionals": [
        {
          "concept": "Photo editing software license",
          "value": 25.0
        }
      ],
      "imageUrl": "http://localhost:5173/public/pictures/photo.png",
      "match": "all activities"
    },
    {
      "id": "34",
      "name": "Ballet",
      "description": "Ballet Dance Basics teaches rhythm, coordination, and expressive movement through beginner-friendly choreography. Students build confidence while learning to move with energy and style. Only for girls",
      "weekday": "Monday",
      "time": "2:30 p.m. to 3:30 p.m.",
      "levels": "Grades 2–8",
      "cost": 210.0,
      "txtoptionalcosts": "Dance T-shirt ($12)",
      "optionals": [
        {
          "concept": "Dance T-shirt",
          "value": 12.0
        }
      ],
      "imageUrl": "http://localhost:5173/public/pictures/dance.png",
      "match": "all activities"
    },
    {
      "id": "41",
      "name": "Robotics Club",
      "description": "Robotics Club introduces students to engineering, coding, and problem-solving through hands-on robot-building challenges. Participants design, assemble, and program robots to complete tasks, learning teamwork and critical thinking along the way.",
      "weekday": "Saturday",
      "time": "8:00 a.m. to 9:30 a.m.",
      "levels": "Grades 4–8",
      "cost": 300.0,
      "txtoptionalcosts": "Robotics kit rental ($20)",
      "optionals": [
        {
          "concept": "Robotics kit rental",
          "value": 20.0
        }
      ],
      "imageUrl": "",
      "match": "all activities"
    },
    {
      "id": "42",
      "name": "Beginner Coding with Python",
      "description": "This course introduces students to programming fundamentals using Python. They learn variables, loops, conditionals, and simple algorithms while building small projects such as games and calculators.",
      "weekday": "Saturday",
      "time": "8:00 a.m. to 9:30 a.m.",
      "levels": "Grades 6–12",
      "cost": 280.0,
      "txtoptionalcosts": "USB drive ($10)",
      "optionals": [
        {
          "concept": "USB drive",
          "value": 10.0
        }
      ],
      "imageUrl": "",
      "match": "all activities"
    },
    {
      "id": "43",
      "name": "3D Printing & Design",
      "description": "Students learn 3D modeling and printing fundamentals, creating their own small prototypes and designs. The activity encourages creativity, spatial reasoning, and hands-on experimentation.",
      "weekday": "Saturday",
      "time": "8:00 a.m. to 9:30 a.m.",
      "levels": "Grades 5–12",
      "cost": 290.0,
      "txtoptionalcosts": "Filament pack ($18)",
      "optionals": [
        {
          "concept": "Filament pack",
          "value": 18.0
        }
      ],
      "imageUrl": "",
      "match": "all activities"
    },
    {
      "id": "51",
      "name": "Chess Strategy Lab",
      "description": "Chess Strategy Lab teaches students how to think ahead, analyze patterns, and develop strategic reasoning. Through puzzles, guided matches, and tournaments, students strengthen concentration and problem-solving skills.",
      "weekday": "Wednesday",
      "time": "2:30 p.m. to 3:30 p.m.",
      "levels": "Grades 3–12",
      "cost": 160.0,
      "txtoptionalcosts": "Tournament set ($18)",
      "optionals": [
        {
          "concept": "Tournament set",
          "value": 18.0
        }
      ],
      "imageUrl": "",
      "match": "all activities"
    },
    {
      "id": "52",
      "name": "Creative Writing Circle",
      "description": "Creative Writing Circle helps students develop their voice through poetry, short stories, and narrative exercises. They learn structure, imagery, and revision techniques while exploring their imagination.",
      "weekday": "Wednesday",
      "time": "2:30 p.m. to 3:30 p.m.",
      "levels": "Grades 5–12",
      "cost": 150.0,
      "txtoptionalcosts": "Writing journal ($8)",
      "optionals": [
        {
          "concept": "Writing journal",
          "value": 8.0
        }
      ],
      "imageUrl": "",
      "match": "all activities"
    },
    {
      "id": "53",
      "name": "Advanced Math Problem-Solving",
      "description": "This course challenges students with logic puzzles, competition-style problems, and advanced reasoning tasks that strengthen analytical thinking and mathematical creativity.",
      "weekday": "Wednesday",
      "time": "2:30 p.m. to 3:30 p.m.",
      "levels": "Grades 6–12",
      "cost": 270.0,
      "txtoptionalcosts": "Workbook ($12)",
      "optionals": [
        {
          "concept": "Workbook",
          "value": 12.0
        }
      ],
      "imageUrl": "",
      "match": "all activities"
    },
    {
      "id": "61",
      "name": "Environmental Science Explorers",
      "description": "Students explore ecosystems, sustainability, and environmental stewardship through hands-on experiments and outdoor observations. The activity encourages curiosity and responsibility toward the natural world.",
      "weekday": "Saturday",
      "time": "10:00 a.m. to 11:30 a.m.",
      "levels": "Grades 3–8",
      "cost": 200.0,
      "txtoptionalcosts": "Field notebook ($6)",
      "optionals": [
        {
          "concept": "Field notebook",
          "value": 6.0
        }
      ],
      "imageUrl": "",
      "match": "all activities"
    },
    {
      "id": "62",
      "name": "STEM Experiments Lab",
      "description": "STEM Lab engages students in hands-on experiments involving physics, chemistry, and engineering concepts. Each session includes a guided experiment and reflection to deepen understanding.",
      "weekday": "Saturday",
      "time": "10:00 a.m. to 11:30 a.m.",
      "levels": "Grades 3–10",
      "cost": 300.0,
      "txtoptionalcosts": "Safety goggles ($12)",
      "optionals": [
        {
          "concept": "Safety goggles",
          "value": 12.0
        }
      ],
      "imageUrl": "",
      "match": "all activities"
    },
    {
      "id": "71",
      "name": "Junior Cooking & Nutrition",
      "description": "Students learn basic cooking techniques, kitchen safety, and healthy eating habits. Each session includes hands-on preparation of simple, nutritious recipes that build confidence and independence.",
      "weekday": "Saturday",
      "time": "8:00 a.m. to 9:30 a.m.",
      "levels": "Grades 3–8",
      "cost": 300.0,
      "txtoptionalcosts": "Apron ($10)",
      "optionals": [
        {
          "concept": "Apron",
          "value": 10.0
        }
      ],
      "imageUrl": "",
      "match": "all activities"
    },
    {
      "id": "72",
      "name": "Gardening & Urban Farming",
      "description": "Students learn how to plant, care for, and harvest vegetables and herbs while exploring sustainability and ecology. The activity promotes responsibility and environmental awareness.",
      "weekday": "Wednesday",
      "time": "2:30 p.m. to 3:30 p.m.",
      "levels": "Grades 2–8",
      "cost": 180.0,
      "txtoptionalcosts": "Gardening gloves ($8)",
      "optionals": [
        {
          "concept": "Gardening gloves",
          "value": 8.0
        }
      ],
      "imageUrl": "",
      "match": "all activities"
    },
    {
      "id": "81",
      "name": "Spanish Conversation Club",
      "description": "Students practice conversational Spanish through games, role-play, and cultural activities that build confidence and fluency. The club provides a relaxed environment for practicing vocabulary and pronunciation.",
      "weekday": "Monday",
      "time": "2:30 p.m. to 3:30 p.m.",
      "levels": "Grades 4–12",
      "cost": 160.0,
      "txtoptionalcosts": "Vocabulary flashcards ($10)",
      "optionals": [
        {
          "concept": "Vocabulary flashcards",
          "value": 10.0
        }
      ],
      "imageUrl": "",
      "match": "all activities"
    }
  ]
}

test  = getMockActivity()
print (test)

def getActivitiesCatalog():
  tmp = getMockActivity()
  return tmp.activities;
