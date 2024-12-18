import { RefObject, useEffect } from 'react';

/**
 * Automatically scrolls the container to
 * ensure the elementRef is always at the top of the container.
 *
 * Required styles:
 * ```css
 * .container-parent {
 *    position: relative | absolute;
 * }
 *
 * .container {
 *    position: relative;
 *    max-height: {number};
 *    overflow: auto;
 * }
 *
 * .element {
 *    position: relative;
 *    height: {number}
 * }
 * ```
 */
export const useAutoScroll = (
  /**
   * The element to keep at the top
   */
  elementRef?: RefObject<HTMLElement>,
  /**
   * The container element
   */
  containerRef?: RefObject<HTMLElement>,
  /**
   * A vertical offset amount to account for padding/margin
   */
  offset = 0,
) => {
  // When the focused option changes, update the menu scroll if necessary
  useEffect(() => {
    if (
      elementRef &&
      elementRef.current &&
      containerRef &&
      containerRef.current
    ) {
      const { offsetTop: elementTop } = elementRef.current;
      const { scrollTop: containerTop, offsetHeight: containerHeight } =
        containerRef.current;

      if (elementTop > containerHeight || elementTop < containerTop) {
        containerRef.current.scrollTo({
          top: elementTop - offset,
          behavior: 'smooth', // TODO: update this based on prefers-reduced-motion
        });
      }
    }
  }, [containerRef, elementRef, offset]);
};

/*
const menuRef = useRef<HTMLUListElement>(null);
  const itemRefs = useDynamicRefs<HTMLLIElement>({ prefix: 'item' });

  useAutoScroll(itemRefs(`${selected}`), menuRef);

  return (
    <div
      className={css`
        position: relative;
      `}
    >
      <ul
        ref={menuRef}
        data-testid={'menu'}
        className={css`
          position: relative;
          max-height: ${itemHeight * 4}px;
          overflow: auto;
        `}
      >
        {data.map(x => (
          <li
            key={x}
            ref={itemRefs(`${x}`)}
            data-testid={`item-${x}`}
            className={css`
              position: relative;
              height: ${itemHeight}px;
            `}
          >
            {x}
          </li>
        ))}
      </ul>
    </div>
  );
*/