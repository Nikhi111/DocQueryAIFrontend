export const uploadToCloudinary =
  async (file) => {

    try {

      /*
      ========================
      FORM DATA
      ========================
      */

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      formData.append(
        "upload_preset",
        "docqueryai_pdf_upload"
      );

      /*
      ========================
      CLOUDINARY REQUEST
      ========================
      */

      const response =
        await fetch(
          "https://api.cloudinary.com/v1_1/dgpxcabqj/raw/upload",
          {
            method: "POST",
            body: formData,
          }
        );

      /*
      ========================
      RESPONSE
      ========================
      */

      const data =
        await response.json();

      return data.secure_url;

    } catch (error) {

      console.log(error);

      throw error;
    }
};