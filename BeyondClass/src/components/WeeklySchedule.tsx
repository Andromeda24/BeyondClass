import React from "react";
import { Box, Flex, Text } from "@radix-ui/themes";
import type { SessionItem } from "../models/schedule";
import { useTranslation } from "react-i18next";

interface WeeklyScheduleProps {
  activities: SessionItem[];
}

export const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({ activities }) => {
  const { t } = useTranslation();

  // Group activities by weekday
  const WEEKDAYS = activities.map(a => a.weekday);
  const grouped = WEEKDAYS.map(day => ({
    day,
    items: activities.filter(a => a.weekday === day)
  }));

  return (
    <Box
      style={{
        width: "100%",
        margin: "5 auto",
        border: "1px solid var(--gray-6)",
        borderRadius: "8px",
        overflow: "hidden"
      }}
    >
      {/* Header */}
      <Flex
        justify="center"
        style={{
          backgroundColor: "var(--gray-3)",
          borderBottom: "1px solid var(--gray-6)"
        }}
      >
        <Text weight="bold" style={{ margin: "6px" }} size="2">
          {t("schedule.currentSchedule")}
        </Text>
      </Flex>

      {/* Days */}

      {grouped.length === 0 && (
              <Text size="1" color="gray">
                {t("schedule.noActivities")}
              </Text>
            )}
      {grouped.map(({ day, items }) => (
        <Box key={day}>
          <Flex
            direction="column"
            style={{
              padding: "5px",
              borderBottom: "1px solid var(--gray-6)"
            }}
          >
            <Text weight="bold" size="1" style={{ marginBottom: "6px" }}>
              {t(`weekdays.${day.toLowerCase()}`)}
            </Text>

            {items.length > 0 &&
              items.map(item => (
                <Flex
                  key={item.id}
                  direction="row"
                  justify="between"
                  style={{ marginBottom: "4px" }}
                >
                  <Text size="1">{item.displayname}</Text>
                  <Text size="1" color="gray">
                    {item.starttime} {t("schedule.to")} {item.endtime}
                  </Text>
                </Flex>
              ))}
          </Flex>
        </Box>
      ))}
    </Box>
  );
};
