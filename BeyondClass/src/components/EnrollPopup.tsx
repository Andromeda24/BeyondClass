import React, { useState } from "react";
import { Dialog, Flex, Button, Text, Spinner } from "@radix-ui/themes";
import type { Activity, Student } from "../models/activity";
import type { EnrollActivityOutput } from "../models/enrollActivityOutput";
import { CostTable } from "./CostTable";
import { useTranslation } from "react-i18next";

interface EnrollPopupProps {
  activity: Activity;
  student: Student;
  onConfirm: (activity: Activity, student: Student) => Promise<EnrollActivityOutput>;
}

export const EnrollPopup: React.FC<EnrollPopupProps> = ({ activity, student, onConfirm }) => {
  const { i18n, t } = useTranslation();

  const [loading, setLoading] = useState<boolean>(false);
  const [optionalCosts, setOptionalCost] = useState<number>(0);

  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

  const handleSubmit = async (): Promise<void> => {
    if (loading) return;

    setLoading(true);
    setMessage("");
    setMessageType(null);

    try {
      const result: EnrollActivityOutput = await onConfirm(activity, student);

      if (result.ok) {
        setMessage(result.okmsg);
        setMessageType("success");

        // Auto-close dialog after showing success message
        setTimeout(() => {
          const closeButton = document.querySelector("[data-dialog-close]") as HTMLElement | null;
          closeButton?.click();
        }, 1200);
      } else {
        setMessage(result.errormsg);
        setMessageType("error");
      }
    } catch (err: unknown) {
      // Handle server errors, thrown exceptions, network failures, etc.
      console.error("Enrollment failed:", err);

      let fallbackMessage = t("common.serverError");

      if (err instanceof Error) {
        fallbackMessage = err.message || fallbackMessage;
      }

      setMessage(fallbackMessage);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root>
      {/* Trigger button */}
      <Dialog.Trigger>
        <Button color="green">{t("activities.enroll")}</Button>
      </Dialog.Trigger>

      {/* Popup content */}
      <Dialog.Content style={{ maxWidth: "80%" }}>
        <Flex direction="column" gap="4">
          <Text size="7" weight="bold">
            {t("activities.enrollConfirmTitle", {
              activityName: activity.name,
              studentName: student.displayName,
            })}
          </Text>

          <Text size="2" color="gray">
            {activity.weekday} {activity.time}
          </Text>

          <Text size="2" color="gray">
            {activity.description}
          </Text>

          <CostTable items={activity.optionals} onTotalChange={setOptionalCost} />

          <Text size="3" weight="bold">
            {Number(activity.cost) > 0 &&
              t("activities.acceptcost", {
                registrationCost: Number(activity.cost).toFixed(0),
              })}

            {optionalCosts > 0 &&
              " " +
                t("activities.acceptoptionals", {
                  optionalCost: optionalCosts,
                })}
          </Text>

          {/* Success / Error message */}
          {message && (
            <Text
              size="3"
              color={messageType === "success" ? "green" : "red"}
              weight="bold"
            >
              {message}
            </Text>
          )}

          {/* Confirmation buttons */}
          <Flex gap="2" justify="end">
            <Dialog.Close data-dialog-close>
              <Button variant="soft" color="gray">
                {t("common.cancel")}
              </Button>
            </Dialog.Close>

            <Button color="green" onClick={handleSubmit} disabled={loading}>
              {loading ? (
                <Flex align="center" gap="2">
                  <Spinner size="3" />
                  {t("common.loading")}
                </Flex>
              ) : (
                t("common.confirm")
              )}
            </Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
