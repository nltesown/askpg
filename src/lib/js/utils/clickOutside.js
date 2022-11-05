/**
 * clickOutside
 * https://svelte.dev/repl/0ace7a508bd843b798ae599940a91783?version=3.16.7
 * Usage :
 * import {clickOutside} from '$lib/clickOutside.js';
 * <div use:clickOutside on:click_outside={handleClickOutside}></div>
 */
export function clickOutside(node) {
  const handleClick = (event) => {
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(new CustomEvent("click_outside", node));
    }
  };

  document.addEventListener("click", handleClick, true);

  return {
    destroy() {
      document.removeEventListener("click", handleClick, true);
    }
  };
}
