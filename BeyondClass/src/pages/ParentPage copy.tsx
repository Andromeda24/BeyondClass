import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Select,
  Text,
} from "@radix-ui/themes";

type Activity = {
  id: string;
  title: string;
  description: string;
  level: number;
  imageUrl: string; // each activity has its own image
};

type ActivitiesProps = {
  students: string[];
  fetchActivities: (student: string, filter: string) => Promise<Activity[]>;
};

export const Activities: React.FC<ActivitiesProps> = ({
  students,
  fetchActivities,
}) => {
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

  return (
    <Flex direction="column" gap="6" p="4">
      {/* HEADER */}
      <Heading size="4" mb="3">
        Explore Activities
      </Heading>

      {/* SEARCH FORM */}
      <Card size="3">
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="4">
            {/* Student Select */}
            <Flex direction="column" gap="2">
              <Text size="2">Student</Text>
              <Select.Root
                value={selectedStudent}
                onValueChange={setSelectedStudent}
              >
                <Select.Trigger placeholder="Select a student" />
                <Select.Content>
                  {students.map((s) => (
                    <Select.Item key={s} value={s}>
                      {s}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </Flex>

            {/* Filter Input */}
            <Flex direction="column" gap="2">
              <Text size="2">Filter</Text>
              <Box>
                <input
                  type="text"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Type keywords to filter activities..."
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid var(--gray-6)",
                    fontSize: "14px",
                  }}
                />
              </Box>
            </Flex>

            <Button type="submit" disabled={loading}>
              {loading ? "Loading…" : "Search"}
            </Button>
          </Flex>
        </form>
      </Card>

      {/* RESULTS GRID */}
      <Card size="3">
        <Heading size="4" mb="3">
          Results
        </Heading>

        {activities.length === 0 && <Text>No activities yet</Text>}

        <Grid columns="3" gap="4">
          {activities.map((activity) => (
            <Card key={activity.id} size="3">
              <Flex direction="column" gap="3">
                {/* IMAGE (4:3, scaled to fit card) */}
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

                {/* TITLE */}
                <Heading size="3">{activity.title}</Heading>

                {/* DESCRIPTION */}
                <Text size="2" color="gray">
                  {activity.description}
                </Text>

                {/* LEVEL */}
                <Text size="2" weight="bold">
                  Level {activity.level}
                </Text>

                {/* ENROLL BUTTON */}
                <Button>Enroll</Button>
              </Flex>
            </Card>
          ))}
        </Grid>
      </Card>
    </Flex>
  );
};
