import { useState } from "react";
import { Flex, TextArea } from "@radix-ui/themes";
import { CheckCircledIcon, CrossCircledIcon, CircleIcon } from "@radix-ui/react-icons";

export function CommentWithStatus() {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);

  const getIcon = () => {
    if (!touched && !focused && value === "") {
      return <CircleIcon color="gray" />;
    }
    if (focused && value !== "") {
      return <CrossCircledIcon color="red" />;
    }
    if (!focused && value !== "") {
      return <CheckCircledIcon color="green" />;
    }
    return <CircleIcon color="gray" />;
  };

  return (
    <Flex direction="row" gap="3" align="center" width="100%">
      {getIcon()}

      <Flex flexGrow="1">
        <TextArea
          placeholder="Comments…"
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            setTouched(true);
          }}
          onChange={(e) => setValue(e.target.value)}
          style={{ width: "100%" }}
        />
      </Flex>
    </Flex>
  );
}
