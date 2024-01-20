import { FC, useState } from "react";
import { Space, Button } from "@/components/UI";
import { TextArea } from "@/components/Control";
import { useLang } from "@/hooks";
import CommentAuthor from "./CommentAuthor";

interface CommentControlProps {
  hasAuthor?: boolean;
  isRoot?: boolean;
  defaultValue?: string;
  onChangeInput?: (text: string) => void;
  onSave?: () => void;
  onCancel?: () => void;
}

const CommentControl: FC<CommentControlProps> = ({
  isRoot = true,
  hasAuthor = true,
  defaultValue = "",
  onChangeInput,
  onSave,
  onCancel,
}) => {
  const { lang } = useLang();

  const [content, setContent] = useState<string>(defaultValue);

  const handleChange = (text: string) => {
    setContent(text);
    onChangeInput?.(text);
  };
  return (
    <div className="comment-control">
      {hasAuthor && <CommentAuthor />}

      <TextArea
        rootClassName="control-input"
        color="green"
        rows={3}
        value={content}
        onChangeInput={handleChange}
      />

      <Space justify="end">
        {!isRoot && (
          <Button color="green" ghost onClick={onCancel}>
            {lang.common.actions.cancel}
          </Button>
        )}
        <Button disabled={!content} color="green" onClick={onSave}>
          {lang.common.actions.save}
        </Button>
      </Space>
    </div>
  );
};

export default CommentControl;
