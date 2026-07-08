import React from "react";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import type { Activity } from "../models/activity";


interface WeeklyScheduleProps {
  activities: Activity[];
}

const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

export const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({ activities }) => {
  // Group activities by weekday
  const grouped = WEEKDAYS.map(day => ({
    day,
    items: activities.filter(a => a.weekday === day)
  }));

  return (
    <Box
      style={{
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
        border: "1px solid var(--gray-6)",
        borderRadius: "8px",
        overflow: "hidden"
      }}
    >
      {/* Header */}
      <Flex
        style={{
          backgroundColor: "var(--gray-3)",
          padding: "12px",
          borderBottom: "1px solid var(--gray-6)"
        }}
      >
        <Heading size="4">Weekly Schedule</Heading>
      </Flex>

      {/* Days */}
      {grouped.map(({ day, items }) => (
        <Box key={day}>
          <Flex
            direction="column"
            style={{
              padding: "10px",
              borderBottom: "1px solid var(--gray-6)"
            }}
          >
            <Text weight="bold" size="3" style={{ marginBottom: "6px" }}>
              {day}
            </Text>

            {items.length === 0 ? (
              <Text size="2" color="gray">
                No activities
              </Text>
            ) : (
              items.map(item => (
                <Flex
                  key={item.id}
                  direction="row"
                  justify="between"
                  style={{ marginBottom: "4px" }}
                >
                  <Text size="2">{item.name}</Text>
                  <Text size="2" color="gray">
                    {item.time}
                  </Text>
                </Flex>
              ))
            )}
          </Flex>
        </Box>
      ))}
    </Box>
  );
};
