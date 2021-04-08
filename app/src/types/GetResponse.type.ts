interface GetResponse<T> {
  data: {
    results: T[];
  };
}

export default GetResponse;
