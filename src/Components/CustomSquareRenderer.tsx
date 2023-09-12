import { forwardRef } from 'react';
import { CustomSquareProps } from 'react-chessboard/dist/chessboard/types';
import { MoveClassification, MoveClassificationIcons } from '../Libs/Constants';
import { ReviewedMove } from '../Hooks/StockfishEngine';

export const CustomSquareRenderer = (currentMove: ReviewedMove) =>
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
          <div className="absolute right-0 top-0 h-[20px] w-[20px] opacity-95 z-50 ">
            <img src={icon} width={22} />
          </div>
        )}
      </div>
    );
  });
