import api from "./axios";

/*
========================
UPLOAD DOCUMENT
========================
*/

export const uploadDocument =
  async (
    chatId,
    documentData
  ) => {

    try {

      const response =
        await api.post(
          `/user/documet/${chatId}`,
          documentData
        );

      return response.data;

    } catch (error) {

      throw (
        error.response?.data ||
        error
      );
    }
};

/*
========================
GET DOCUMENTS
========================
*/

export const getDocuments =
  async (
    chatId,
    cursor = 0,
    limit = 20
  ) => {

    try {

      const response =
        await api.get(
          `/user/documets/${chatId}`,
          {
            params: {
              cursor,
              limit,
            },
          }
        );

      return response.data;

    } catch (error) {

      throw (
        error.response?.data ||
        error
      );
    }
};