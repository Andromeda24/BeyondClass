import "@radix-ui/themes/styles.css";
import type {Activity} from "../models/activity";

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


type Student = {
  id: string;
  displayName: string;
  fullName: string;
  level: number;
  parentId: string;
};



export default function ActivityExplorer ( { students,   fetchActivities })
 {

  const [selectedStudent, setSelectedStudent] = useState(students[0]?.id ?? "");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [filter, setFilter] = useState("");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);

  function getStudentLevel(
    students: Student[],
    selectedStudentId: string
  ): number {
    const student = students.find(s => s.id === selectedStudentId);
  
    if (!student) {
      throw new Error(`Selected student '${selectedStudentId}' not found.`);
    }
  
    return student.level;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const level = getStudentLevel(students,selectedStudent)

      const result = await fetchActivities(level, filter,"de-DE");
      setActivities(result);
    } finally {
      setLoading(false);
    }
  };

  const { t } = useTranslation();
  
  return (
    <Flex direction="column" gap="5" px="5" py="0" style={{ width: "100%" }}>

      {/* HEADER */}
      <Heading size="6" style={{ color: "var(--gray-12)" }}>
        {t("activities.header")}
      </Heading>

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
            <Text size="2">{selectedStudent}</Text>
            <Text size="2">{filter}</Text>
            {/* Student Select */}
            <Flex direction="column" gap="1">
              <Text size="2">{t("activities.studentLabel")}</Text>

              <Select.Root
                value={selectedStudent}
                onValueChange={setSelectedStudent}
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
            <Flex direction="column" gap="1" p="0" align="center">
              <Heading size="3" style={{ margin: 5 }}>
                {activity.name}
              </Heading>

              {/* IMAGE */}
              <Box
                style={{
                  width: "100%",
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
              <Text size="2" color="gray">
                {activity.description}
              </Text>

              <Text size="2" weight="bold">
                {t("activities.level")} {activity.levels}
              </Text>
              <Text size="2" weight="bold">
                {activity.weekday} {activity.time}
              </Text>

              <Button color="green">{t("activities.enroll")}</Button>
            </Flex>
          </Card>
        ))}
      </Flex>
    </Flex>
  );
};
