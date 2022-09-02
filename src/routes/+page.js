
/** @type {import('./$types').PageLoad} */
export function load({params}) {
  return {
    items: [...JSON.parse(localStorage?.getItem('logs') || "[]")]
  };
}

export const ssr = false;
export const csr = true;
