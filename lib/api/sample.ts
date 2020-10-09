import useRequest from "lib/hooks/useRequest";


const SampleAPI = {
  all: (page, size) => {
    try {
      const { data } = useRequest({
        url: `/api/v1/sample?page=${page}&size=${size}`,
      });
      // console.log(']-----] SasmpleAPI::all.data [-----[', data);
      return { data: data };
    } catch (error) {
      return error.response;
    }
  },
};

export default SampleAPI;
