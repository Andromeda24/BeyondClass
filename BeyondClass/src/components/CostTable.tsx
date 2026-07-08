import React, { useState, useEffect } from "react";
import type { CostItem } from "../models/activity";
import { Box, Flex, Text } from "@radix-ui/themes";

interface CostTableProps {
  items: CostItem[];
  onTotalChange: (total: number) => void;   // parent receives total
}

export const CostTable: React.FC<CostTableProps> = ({ items, onTotalChange }) => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  // Initialize all checkboxes to false on first load
  useEffect(() => {
    const initialState: Record<string, boolean> = {};
    items.forEach(item => {
      initialState[item.id] = false;
    });
    setChecked(initialState);
  }, [items]);

  // Compute total whenever checked changes
  useEffect(() => {
    const total = items
      .filter(item => checked[item.id])
      .reduce((sum, item) => sum + item.value, 0);

    onTotalChange(total);
  }, [checked, items, onTotalChange]);

  // If empty → render nothing
  if (!items || items.length === 0) {
    return null;
  }

  const toggle = (id: string) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Box
    style={{
      width: "50%",
      minWidth: "300px",
      border: "1px solid var(--gray-6)",
      borderRadius: "8px",
      overflow: "hidden",
    }}
  >
    {/* Header */}
    <Flex
      direction="row"
      align="center"
      style={{
        backgroundColor: "var(--gray-3)",
        padding: "8px",
        borderBottom: "1px solid var(--gray-6)",
      }}
    >
      <Box style={{ width: "40px" }}></Box>
      <Text weight="bold" style={{ flex: 1 }} size="2">
        Concept
      </Text>
      <Text weight="bold" style={{ width: "80px", textAlign: "right" }} size="2">
        Value
      </Text>
    </Flex>

    {/* Rows */}
    {items.map(item => (
      <Flex
        key={item.id}
        direction="row"
        align="center"
        style={{
          padding: "8px",
          borderBottom: "1px solid var(--gray-6)",
        }}
      >
        <Box style={{ width: "40px" }}>
          <input
            type="checkbox"
            checked={checked[item.id] || false}
            onChange={() => toggle(item.id)}
          />
        </Box>

        <Text size="2" style={{ flex: 1 }}>{item.concept}</Text>

        <Text size="2" style={{ width: "80px", textAlign: "right" }}>
          ${item.value.toFixed(0)}
        </Text>
      </Flex>
    ))}

    {/* Total Row */}
    <Flex
      direction="row"
      align="center"
      style={{
        padding: "8px",
        backgroundColor: "var(--gray-2)",
      }}
    >
      <Box style={{ width: "40px" }}></Box>

      <Text size="2" weight="bold" style={{ flex: 1 }}>
        Total
      </Text>

      <Text size="2" weight="bold" style={{ width: "80px", textAlign: "right" }}>
        $
        {items
          .filter(item => checked[item.id])
          .reduce((sum, item) => sum + item.value, 0)
          .toFixed(0)}
      </Text>
    </Flex>
  </Box>
);
};
