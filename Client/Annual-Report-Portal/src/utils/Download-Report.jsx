import axios from 'axios';

export const downloadReport = async (userDetails) => {
  // The params object is correct
  const params = {
    institute: userDetails.user.institute,
    status: 'admin-approved',
    year: '2024',
    sort: 'section,type,-createdAt',
  };

  try {
    // Correctly pass params and responseType inside one config object
    const response = await axios.get(
      `http://127.0.0.1:3000/api/report/download`,
      {
        params: params,
        responseType: 'blob',
      }
    );

    // No need to create a new Blob. response.data is already the blob.
    const blob = response.data;

    // Create a link to trigger the download
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'Annual_Report_2024.pdf';
    document.body.appendChild(link); // Append to body to ensure it works in all browsers
    link.click();
    document.body.removeChild(link); // Clean up by removing the link

    // Optional: Revoke the object URL to free up memory
    window.URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error('Download failed:', error);
    // You might want to show an error message to the user here
  }
};
