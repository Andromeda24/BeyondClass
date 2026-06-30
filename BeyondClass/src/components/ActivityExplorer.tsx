import "@radix-ui/themes/styles.css";

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


type Activity = {
  id: string;
  title: string;
  description: string;
  level: number;
  imageUrl: string;
};

type Student = {
  id: string;
  displayName: string;
  fullName: string;
  level: number;
  parentId: string;
};


interface SearchProps { 
    students: Student[],
    fetchActivities: (studentId: string, filter: string) => Promise<Activity[]>
 }
  

export default function ActivityExplorer ( { students,   fetchActivities })
 {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [filter, setFilter] = useState("");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await fetchActivities(selectedStudent, filter);
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

            {/* Student Select */}
            <Flex direction="column" gap="1">
              <Text size="2">{t("activities.studentLabel")}</Text>

              <Select.Root
                value={selectedStudent}
                onValueChange={setSelectedStudent}
              >
                <Select.Trigger placeholder={t("activities.studentPlaceholder")} />
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
      <Flex wrap="wrap" gap="4" justify="center">
        {activities.map((activity) => (
          <Card
            key={activity.id}
            size="3"
            style={{
              width: "300px",
              flexShrink: 0,
            }}
          >
            <Flex direction="column" gap="0">

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
                  src={activity.imageUrl}
                  alt={activity.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>

              <Heading size="3">{activity.title}</Heading>

              <Text size="2" color="gray">
                {activity.description}
              </Text>

              <Text size="2" weight="bold">
                {t("activities.level")} {activity.level}
              </Text>

              <Button color="green">{t("activities.enroll")}</Button>
            </Flex>
          </Card>
        ))}
      </Flex>
    </Flex>
  );
};
