import "@radix-ui/themes/styles.css";
import type {Activity, Student} from "../models/activity";
import { EnrollPopup } from "./EnrollPopup";
import { WeeklySchedule } from "./WeeklySchedule";

import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Select,
  Text,
  TextField
} from "@radix-ui/themes";

import { useTranslation } from "react-i18next";




export async function enrollService(activityId: string): Promise<{ success: boolean }> {
  console.log("Enroll service called with activityId:", activityId);

  // Simulate a network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Fake response
  return { success: true };
}

export default function ActivityExplorer ( { students,   fetchActivities })
 {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const [selectedStudent, setSelectedStudent] = useState(students[0]?.id ?? "");
  const [filter, setFilter] = useState("");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  
  const handleStudentChange = (value: string) => {
    setSelectedStudent(value);
   // setActivities([]); // clear activities when student changes
  }; 

  function getCurrentStudent(
    students: Student[],
    selectedStudentId: string
  ): Student {
    const student = students.find(s => s.id === selectedStudentId);
  
    if (!student) {
      throw new Error(`Selected student '${selectedStudentId}' not found.`);
    }
  
    return student;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const level = getCurrentStudent(students,selectedStudent).level
      setCurrentLanguage(i18n.language)
      const result = await fetchActivities(level, filter,i18n.language);
      setActivities(result);
    } finally {
      setLoading(false);
    }
  };


  
  return (
    <Flex direction="column" gap="5" px="5" py="0" style={{ width: "100%" }}>

      {/* HEADER */}
      <Heading size="6" style={{ color: "var(--gray-12)" }}>
        {t("activities.header")}
      </Heading>
      {currentLanguage !== i18n.language && (
          <Text size="2">
            {t("activities.wrongLanguage")}
          </Text>
      )}
      {/* SEARCH FORM */}
      <Card
        size="1"
        style={{
          backgroundColor: "var(--gray-1)",
          border: "1px solid var(--gray-6)",
          width: "100%"
        }}
      >
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="4">
            {/* Student Select */}
            <Flex direction="column" gap="1">
              <Text size="2">{t("activities.studentLabel")}</Text>

              <Select.Root
                value={selectedStudent}
                onValueChange={handleStudentChange}
                required
              >
                <Select.Trigger/>
                <Select.Content>
                  {students.map((s: Student) => (
                    <Select.Item key={s.id} value={s.id}>
                      {s.displayName}  ({t("activities.level")} {s.level})
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </Flex>

            {/* Filter Input */}
            <Flex direction="column" gap="1">
              <Text size="2">{t("activities.filterLabel")}</Text>

              <Box>
                <TextField.Root
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder={t("activities.filterPlaceholder")}
                />
              </Box>
            </Flex>

            <Button type="submit" disabled={loading}>
              {loading ? t("activities.loading") : t("activities.search")}
            </Button>
          </Flex>
        </form>
      </Card>

      {/* RESULTS GRID */}
      <Flex wrap="wrap" gap="5" px="0" py="0" justify="center" style={{ width: "100%" }}>
        {activities.map((activity) => (
          <Card
            key={activity.id}
            size="1"
            style={{
              width: "350px",
              flexShrink: 0,
            }}
          >


            <Flex direction="column" gap="1" p="0" align="center" style={{ height: "100%" }}>
              <Heading size="3" style={{ margin: 5 }}>
                {activity.name} 
              </Heading>
              <Text size="2">
                {activity.weekday} {activity.time}
              </Text>
              {/* IMAGE */}
              <Box
                style={{
                  width: "50%",
                  aspectRatio: "4 / 3",
                  overflow: "hidden",
                  borderRadius: "8px",
                }}
              >
              <img
                src={activity.imageUrl && activity.imageUrl.trim() !== "" 
                      ? activity.imageUrl 
                      : "../src/assets/defaultActivity.png"}
                alt={activity.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              </Box>
              <Box
            style={{
              flex: 1,
              overflowY: "auto",
              width: "100%",
            }}
          >
            <Flex direction="column" gap="1" p="0" align="center" style={{ height: "100%" }}>
                  <Text size="2" color="gray">
                    {activity.description}
                  </Text>
            </Flex>
          </Box>
          <Text size="1" weight="bold">
                    {t("activities.cost")}: ${Number(activity.cost).toFixed(0)}, {t("activities.optionals")}:{" "}
                    {activity.txtoptionalcosts}
                  </Text>
      

                  <EnrollPopup activity={activity} student= {getCurrentStudent(students,selectedStudent)} onConfirm={enrollService} t={t} />
            </Flex>
          </Card>
        ))}
      </Flex>
      <WeeklySchedule activities={activities} />
    </Flex>
  );
};
