import "@radix-ui/themes/styles.css";
import  { useState } from "react";
import {
  Flex,
  Card,
  Heading,
  Text,
  Checkbox,
  Select,  
} from "@radix-ui/themes";

import { CommentWithStatus } from "./CommentWithStatus";

import { format } from "date-fns";

type Activity = { id: string; name: string };
type Student = { id: string; name: string; grade: string };

const activities: Activity[] = [
  { id: "reading", name: "Reading Circle" },
  { id: "ballet", name: "Ballet " },
  { id: "science", name: "Science Lab" },
];

const roster: Record<string, Student[]> = {
  reading: [
    { id: "1", name: "Alice Johnson", grade: "3" },
    { id: "2", name: "Ben Carter", grade: "3" },
  ],
  ballet: [
    { id: "3", name: "Diana Smith", grade: "4" },
    { id: "4", name: "Emma Parker", grade: "3" },
  ],
  science: [
    { id: "5", name: "Mia Gomez", grade: "5" },
    { id: "6", name: "Noah Patel", grade: "5" },
  ],
};

export default function RosteringModule() {
  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const students = selectedActivity ? roster[selectedActivity] : [];

  return (
    <Flex  direction="column" gap="5" px="5" py="0" style={{ width: "100%" }} >
      <Card
        size="1"
        style={{
          backgroundColor: "var(--gray-1)",
          border: "1px solid var(--gray-6)",
          width: "100%"
        }}
      > 
      {/* Selectors Row */}
      <Flex direction="row" gap="8" align="center" justify="center">

        {/* Activity Selector */}
        <Flex direction="column" gap="2"   style={{
    width: "100%",
  }}>
          <Text size="2">Activity</Text>
          <Select.Root
            value={selectedActivity}
            onValueChange={setSelectedActivity}
          >
            <Select.Trigger />

              <Select.Content >
                  {activities.map((a) => (
                    <Select.Item key={a.id} value={a.id}>
                      {a.name}
                    </Select.Item>
                  ))}
              </Select.Content>
          </Select.Root>
          </Flex>

       
        
        {/* Date Selector */}
        <Flex direction="column" gap="2"   style={{
    width: "150px",
  }}>
        <Text size="2">Date</Text>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
        </Flex>
  
      </Flex>
      </Card>
      {/* Roster */}
      {selectedActivity && selectedDate && (
        <Flex direction="column" gap="3">
          <Heading size="5">
            Roster for {activities.find((a) => a.id === selectedActivity)?.name}  
            on {format(new Date(selectedDate), "MMMM d, yyyy")}
          </Heading>

          <Flex direction="column" gap="3">
            {students.map((student) => (
              <Card key={student.id} variant="surface">
                <Flex direction="column" gap="3">
                  <Text>
                    <strong>{student.name}</strong> — Grade {student.grade}
                  </Text>

                  <Flex align="center" gap="2">
                    <Checkbox /> <Text>Attendance</Text>
                  </Flex>

                  <CommentWithStatus />
                </Flex>
              </Card>
            ))}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}
