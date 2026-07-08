import { useEffect, useState } from "react";
import { Theme, Box, Flex, Heading, Button, Text } from "@radix-ui/themes";
import Header from "../components/Header";
import LoginButtons from "../components/LoginButtons";
import { subscribeToAuth } from "../auth/auth";
import type { User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { logout } from "../auth/auth";

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const logoutRedirect = async () => {
    await logout();     // Firebase signOut
    navigate("/");      // Redirect to HomePage
  };

  const { t } = useTranslation();

  useEffect(() => {
    return subscribeToAuth(setUser);
  }, []);

  
  return (
    <Theme appearance="light" accentColor="green" grayColor="slate">
      <Flex direction="column" align="center" p="4" style={{ width: "100%" }}>
        {/* HEADER */}
        <Header user={user} logoutRedirect={logoutRedirect} />

        {/* MAIN CONTENT */}
        <Flex direction="column" align="center" gap="4" mt="6">
          <Box>
            <img src="/src/assets/BClogo.svg" alt="logo" width="120" />
          </Box>

          <Heading size="6">Beyond Class</Heading>
          <Text size="4" color="gray">{t("appSlogan")}</Text>

          {/* LOGIN BUTTONS */}
          {!user && (
            <Box mt="4">
              <LoginButtons />
            </Box>
          )}

          {/* ROLE BUTTONS */}
          {user && (
            <Flex gap="3" mt="5">
              <Button onClick={() => navigate("/parent")}>
                {t("parents")}
              </Button>

              <Button onClick={() => navigate("/teacher")}>
                {t("teachers")}
              </Button>

              <Button onClick={() => navigate("/admin")}>
                {t("staff")}
              </Button>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Theme>
  );
}
