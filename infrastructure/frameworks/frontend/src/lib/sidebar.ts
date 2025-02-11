import Sidebar from "@/components/ui/sidebar/Sidebar.vue";

export const manageSidebar = () => {
  const topHeader = document.querySelector<HTMLElement>("#top-header");

  if (!topHeader) {
    return;
  }

  let observer: MutationObserver | null = null;

  const updateHeaderClassAndWidth = () => {
    const sidebar = document.querySelector<HTMLElement>("#sidebar");

    if (!sidebar) {
      topHeader.style.width = "100%";
      topHeader.classList.remove("float-end");
      return;
    }

    const activeStateElement = sidebar.querySelector<HTMLElement>(
      '[data-state="expanded"], [data-state="collapsed"]'
    );

    if (!activeStateElement) {
      return;
    }

    const sidebarState = activeStateElement.getAttribute("data-state");
    if (sidebarState === "expanded") {
      topHeader.style.width = "calc(100% - 16rem)";
      topHeader.classList.add("float-end");
    } else if (sidebarState === "collapsed") {
      topHeader.style.width = "100%";
      topHeader.classList.remove("float-end");
    }
  };

  const initObserver = () => {
    const sidebar = document.querySelector<HTMLElement>("#sidebar");
    if (sidebar && !observer) {
      observer = new MutationObserver(() => updateHeaderClassAndWidth());
      observer.observe(sidebar, {
        attributes: true,
        subtree: true,
        attributeFilter: ["data-state"]
      });
    }
  };

  const cleanupObserver = () => {
    if (Sidebar) {
      topHeader.style.width = "100%";
      topHeader.classList.remove("float-end");
    }
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  };

  updateHeaderClassAndWidth();
  initObserver();

  return cleanupObserver;
};
