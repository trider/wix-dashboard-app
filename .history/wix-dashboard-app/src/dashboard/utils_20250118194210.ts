export function getAppInstance() {
 return new URLSearchParams(window.location.search).get("instance")!;
}

export async function fetchWithWixInstance(
 relativePath: string,
 method: string,
 body?: any,
) {
 const res = await fetch(
   `${import.meta.env.BASE_API_URL}/${relativePath}`,
   {
     method,
     headers: {
       Authorization: getAppInstance(),
       ...(body && { "Content-Type": "application/json" }),
     },
     body: body && JSON.stringify(body),
   },
 );

 const json = await res.json();
 return json;
}
