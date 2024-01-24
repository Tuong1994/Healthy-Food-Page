import { FC, useState } from "react";
import { Space, Button } from "@/components/UI";
import { TextArea } from "@/components/Control";
import { useLang } from "@/hooks";
import type { ButtonProps } from "@/components/UI/Button";
import CommentAuthor from "./CommentAuthor";

interface CommentControlProps {
  hasAuthor?: boolean;
  isRoot?: boolean;
  defaultValue?: string;
  saveButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  onSave?: () => void;
  onCancel?: () => void;
  onChangeInput?: (text: string) => void;
}

const CommentControl: FC<CommentControlProps> = ({
  isRoot = true,
  hasAuthor = true,
  defaultValue = "",
  saveButtonProps,
  cancelButtonProps,
  onChangeInput,
  onSave,
  onCancel,
}) => {
  const { lang } = useLang();

  const [content, setContent] = useState<string>(defaultValue);

  const saveButtonDefaultProps: ButtonProps = {
    disabled: !content,
    color: "green",
    onClick: onSave,
    ...saveButtonProps,
  };

  const cancelButtonDefaultProps: ButtonProps = {
    color: "green",
    ghost: true,
    onClick: onCancel,
    ...cancelButtonProps,
  };

  const handleChange = (text: string) => {
    setContent(text);
    onChangeInput?.(text);
  };
  return (
    <div className="comment-control">
      {hasAuthor && <CommentAuthor isRoot={true} />}

      <TextArea
        rootClassName="control-input"
        color="green"
        rows={3}
        value={content}
        onChangeInput={handleChange}
      />

      <Space justify="end">
        {!isRoot && <Button {...cancelButtonDefaultProps}>{lang.common.actions.cancel}</Button>}
        <Button {...saveButtonDefaultProps}>{lang.common.actions.save}</Button>
      </Space>
    </div>
  );
};

export default CommentControl;
