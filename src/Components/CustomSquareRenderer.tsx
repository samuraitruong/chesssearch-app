import { forwardRef } from 'react';
import { CustomSquareProps } from 'react-chessboard/dist/chessboard/types';
import {
  MoveClassification,
  MoveClassificationIcons,
} from '../Shared/Constants';
import { ReviewedMove } from '../Shared/Model';

export const CustomSquareRenderer = (currentMove?: ReviewedMove) =>
  forwardRef<HTMLDivElement, CustomSquareProps>((props, ref) => {
    const { children, square, style } = props;
    const icon =
      MoveClassificationIcons[
        currentMove?.playedMove?.classification as MoveClassification
      ];

    return (
      <div ref={ref} style={{ ...style }} className="relative">
        {children}
        {icon && square === currentMove?.to && (
          <div
            className="absolute h-[35px] w-[35px] z-30"
            style={{ top: -10, right: -10 }}
          >
            <img src={icon} width={35} />
          </div>
        )}
      </div>
    );
  });
