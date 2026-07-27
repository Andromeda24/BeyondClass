import { Flex, Box, Button, Card } from "@radix-ui/themes";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";

import type { User } from "firebase/auth";

export interface HeaderProps {
  user: User | null;
  logoutRedirect: () => void;
}

export default function Header({ user, logoutRedirect }: HeaderProps) {
  const { t } = useTranslation();

  return (
    <Card
      size="1"
      style={{
        width: "100%",
        borderRadius: 0,
        borderBottom: "1px solid var(--gray-6)",
      }}
    >
      <Flex
        align="center"
        justify="between"
        p="0"
        style={{ width: "100%" }}
      >
        {/* Left side: Language Selector */}
        <Box>
          <LanguageSelector />
        </Box>

        {/* Right side: Logout button */}
        <Box>
          {user && (
            <Button color="gray" variant="soft" onClick={logoutRedirect}>
              {t("logout")}
            </Button>
          )}
        </Box>
      </Flex>
    </Card>
  );
}
