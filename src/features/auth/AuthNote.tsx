import { FC } from "react";
import { Typography } from "@/components/UI";
import type { Lang } from "@/common/type";

const { Paragraph } = Typography;

interface AuthNoteProps {
  lang: Lang;
}

const AuthNote: FC<AuthNoteProps> = ({ lang }) => {
  return (
    <div className="auth-note">
      <Paragraph rootClassName="note-text" align="center">
        {lang.auth.common.note}
      </Paragraph>
    </div>
  );
};

export default AuthNote;
