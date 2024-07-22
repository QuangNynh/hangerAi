export default function setPlanModal(state?: boolean) {
  window.dispatchEvent(
    new CustomEvent('plan-modal', {
      detail: {
        state,
      } satisfies { state?: boolean },
    })
  );
}
