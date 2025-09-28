export const testApi = async () => {
  const url = "https://jsonplaceholder.typicode.com/todos";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status}, ${response.statusText}`
      );
    }

    const jsondata = await response.json();
    return jsondata;
  } catch (error) {
    console.error(error);
  }
};
