import { FC } from "react";
import { Typography } from "@/components/UI";
import type { Lang } from "@/common/type";

const { Paragraph } = Typography;

interface FormLayoutNoteProps {
  lang: Lang;
}

const FormLayoutNote: FC<FormLayoutNoteProps> = ({ lang }) => {
  return (
    <div className="form-layout-note">
      <Paragraph rootClassName="note-text" align="center">
        {lang.pageComponent.formLayout.note}
      </Paragraph>
    </div>
  );
};

export default FormLayoutNote;
