import { useTranslations } from "next-intl";
import ClientWorkspace from "./client-workspace";
import { NoAuthWorkspaceTranslations } from "../../../components/no-auth";

export default function Workspace() {
  const t = useTranslations("workspace")
  const noAuth:NoAuthWorkspaceTranslations = {
    noAuth: t("no-auth"),
    toAuth: t("to-auth")
  }

  return (
    <ClientWorkspace noAuth={noAuth}></ClientWorkspace>
  )
}