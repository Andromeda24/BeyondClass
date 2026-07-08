import React, { useState } from "react";
import { Dialog, Flex, Box, Button, Text, Heading } from "@radix-ui/themes";
import type {Activity, Student, EnrollActivity} from "../models/activity";
import { CostTable } from "./CostTable";

interface EnrollPopupProps {
  activity: Activity;
  student:Student;
  onConfirm: (activityId: string) => void;
  t: (key: string, options?: Record<string, any>) => string;
}

export const EnrollPopup: React.FC<EnrollPopupProps> = ({ activity, student, onConfirm, t }) => {
    const [optionalCosts, setOptionalCost] = useState(0);

  return (
    <Dialog.Root>
      {/* Trigger button */}
      <Dialog.Trigger>
        <Button color="green">{t("activities.enroll")}</Button>
      </Dialog.Trigger>

      {/* Popup content */}
      <Dialog.Content style={{ maxWidth: "80%" }}>
        <Flex direction="column" gap="4">
        <Text size="7" weight="bold">{t("activities.enrollConfirmTitle",{ activityName: activity.name, studentName: student.displayName })} </Text>
          <Text size="2" color="gray">
              {activity.weekday} {activity.time}
          </Text>
  
            <Text size="2" color="gray">
              {activity.description}
            </Text>

            <CostTable
            items={activity.optionals}
            onTotalChange={setOptionalCost}
            />
            <Text size="3" weight="bold">
            {Number(activity.cost) > 0 &&
                t("activities.acceptcost", {
                registrationCost: Number(activity.cost).toFixed(0)
                })
            }

            {optionalCosts > 0 &&
                " " + t("activities.acceptoptionals", {
                optionalCost: optionalCosts
                })
            }
            </Text>

          {/* Confirmation buttons */}
          <Flex gap="2" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                {t("common.cancel")}
              </Button>
            </Dialog.Close>

            <Dialog.Close>
              <Button
                color="green"
                onClick={() => onConfirm(activity.id)}
              >
                {t("common.confirm")}
              </Button>
            </Dialog.Close>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
