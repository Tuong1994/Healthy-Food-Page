import { FC, useEffect, useState } from "react";
import { Button, Typography, Loading } from "@/components/UI";
import type { Comment, CommentFormData } from "@/services/comment/type";
import type { ApiQuery } from "@/services/type";
import { useAsync, useLang, useMounted } from "@/hooks";
import { createComment, getComments, removeComments, updateComment } from "@/services/comment/api";
import CommentControl from "./CommentControl";
import CommentList from "./CommentList";
import useAuthStore from "@/store/AuthStore";
import useCommentStore from "@/store/CommentStore";
import useProductStore from "@/store/ProductStore";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import utils from "@/utils";
import helper from "@/helper";

const { Paragraph } = Typography;

const { Spinner } = Loading;

export type ActionType = "reply" | "edit" | "remove";

export type ActiveComment = {
  id: string;
  type: ActionType | null;
};

interface CommentProps {}

const Comment: FC<CommentProps> = () => {
  const { lang } = useLang();

  const messageAPi = useMessage();

  const isMounted = useMounted();

  const auth = useAuthStore((state) => state.auth);

  const product = useProductStore((state) => state.product);

  const [comments, setComments] = useCommentStore((state) => [state.comments, state.setComments]);

  const { loading: listLoading, call: onGet } = useAsync(getComments);

  const { loading: createLoading, call: onCreate } = useAsync(createComment);

  const { loading: updateLoading, call: onUpdate } = useAsync(updateComment);

  const { loading: removeLoading, call: onRemove } = useAsync(removeComments);

  const [activeComment, setActiveComment] = useState<ActiveComment>({
    id: "",
    type: null,
  });

  const [comment, setComment] = useState<CommentFormData>({
    id: "",
    content: "",
    parentId: null,
    productId: product.id ?? "",
    userId: auth.info.id ?? "",
  });

  const [limit, setLimit] = useState<number>(15);

  const { totalItems, items: fullComments } = comments;

  const rootComments = fullComments.filter((comment) => !comment.parentId);

  const hasSeeMore = totalItems !== fullComments.length;

  const listScrollableClassName = fullComments.length > 10 ? "comment-list-scrollable" : "";

  const onReFetch = async () => {
    const apiQuery: ApiQuery = { limit, productId: product.id };
    const response = await onGet(apiQuery);
    if (!response.success) return messageAPi.error(lang.common.message.error.api);
    setComments(response.data);
  };

  const handleGetMore = () => setLimit((prev) => prev + 20);

  const handleChangeInput = (text: string) => setComment((prev) => ({ ...prev, content: text }));

  const handleCreate = async (parentId?: string | null) => {
    const commentData: CommentFormData = { ...comment, parentId: parentId ?? null };
    const response = await onCreate(commentData);
    if (!response.success) {
      if (helper.isAbort(response)) return;
      return messageAPi.error(lang.common.message.error.api);
    }
    onReFetch();
    setActiveComment({ id: "", type: null });
    messageAPi.success(lang.common.message.success.addComment);
  };

  const handleUpdate = async () => {
    const apiQuery: ApiQuery = { commentId: comment.id };
    const response = await onUpdate(apiQuery, comment);
    if (!response.success) {
      if (helper.isAbort(response)) return;
      return messageAPi.error(lang.common.message.error.api);
    }
    onReFetch();
    setActiveComment({ id: "", type: null });
    messageAPi.success(lang.common.message.success.updateComment);
  };

  const handleRemove = async (commentId: string) => {
    const apiQuery: ApiQuery = { ids: commentId };
    const response = await onRemove(apiQuery);
    if (!response.success) {
      if (helper.isAbort(response)) return;
      return messageAPi.error(lang.common.message.error.api);
    }
    onReFetch();
    messageAPi.success(lang.common.message.success.removeComment);
  };

  const renderControl = () => {
    if (!auth.isAuth)
      return (
        <Paragraph align="center" variant="secondary" italic>
          {lang.pageComponent.comment.note}
        </Paragraph>
      );

    return (
      <CommentControl
        saveDisabled={createLoading}
        saveButtonProps={{ loading: createLoading }}
        onChangeInput={handleChangeInput}
        onSave={() => handleCreate(null)}
      />
    );
  };

  useEffect(() => {
    onReFetch();
  }, [limit]);

  if (!isMounted) return null;

  return (
    <div className="comment">
      {renderControl()}
      <div className={utils.formatClassName("comment-list", listScrollableClassName)}>
        <CommentList
          rootComments={rootComments}
          fullComments={fullComments}
          activeComment={activeComment}
          createLoading={createLoading}
          updateLoading={updateLoading}
          removeLoading={removeLoading}
          handleCreate={handleCreate}
          handleUpdate={handleUpdate}
          handleRemove={handleRemove}
          setComment={setComment}
          setActiveComment={setActiveComment}
        />
        {hasSeeMore && (
          <Button disabled={listLoading} text onClick={handleGetMore}>
            {listLoading ? <Spinner /> : lang.pageComponent.comment.more}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Comment;
