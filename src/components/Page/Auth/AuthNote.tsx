import React from "react";
import { UI } from "@/components";
import { Lang } from "@/common/type";

const { Typography } = UI;

const { Paragraph } = Typography;

interface AuthNoteProps {
  lang: Lang;
}

const AuthNote: React.FC<AuthNoteProps> = ({ lang }) => {
  return (
    <div className="auth-note">
      <Paragraph rootClassName="note-text" align="center">{lang.auth.common.note}</Paragraph>
    </div>
  );
};

export default AuthNote;
