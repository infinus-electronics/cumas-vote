/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    console.log(params); // '/a/[b]/[...c]'
    return {
        id: params.id}
  }