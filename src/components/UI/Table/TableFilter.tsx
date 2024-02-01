import { FC, ReactNode } from "react";
import { UI } from "@/components";
import type { TableColor } from ".";
import type { Lang } from "@/common/type";
import type { ButtonProps } from "../Button";

const { Space, Button, Grid } = UI;

const { Row, Col } = Grid;

export interface TableFilterProps {
  lang?: Lang;
  color?: TableColor;
  filter?: ReactNode | ReactNode[];
  filterButtonTitle?: ReactNode | ReactNode[];
  cancelFilterButtonTitle?: ReactNode | ReactNode[];
  filterButtonProps?: ButtonProps;
  cancelFilterButtonProps?: ButtonProps;
  hasFilterButton?: boolean;
  hasCancelFilterButton?: boolean;
  onFilter?: () => void;
  onCancelFilter?: () => void;
}

const TableFilter: FC<TableFilterProps> = ({
  lang,
  color,
  filter,
  filterButtonTitle,
  cancelFilterButtonTitle,
  filterButtonProps,
  cancelFilterButtonProps,
  hasFilterButton = true,
  hasCancelFilterButton = true,
  onFilter,
  onCancelFilter,
}) => {
  const filterButtonDefaultProps: ButtonProps = {
    sizes: "sm",
    color,
    onClick: onFilter,
    ...filterButtonProps,
  };

  const cancelFilterButtonDefaultProps: ButtonProps = {
    sizes: "sm",
    ghost: true,
    onClick: onCancelFilter,
    ...cancelFilterButtonProps,
  };

  return (
    <Row rootClassName="table-filter">
      {filter}
      <Col>
        <Space align="middle">
          {hasFilterButton && (
            <Button {...filterButtonDefaultProps}>{filterButtonTitle ?? lang?.common.actions.filter}</Button>
          )}
          {hasCancelFilterButton && (
            <Button {...cancelFilterButtonDefaultProps}>
              {cancelFilterButtonTitle ?? lang?.common.actions.cancel}
            </Button>
          )}
        </Space>
      </Col>
    </Row>
  );
};

export default TableFilter;
