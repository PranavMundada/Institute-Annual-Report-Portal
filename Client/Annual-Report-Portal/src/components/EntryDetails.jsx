import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

const EntryDetails = () => {
  const [entryDetails, setEntryDetails] = useState();
  const { id } = useParams();

  useEffect(() => {
    const func = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:3000/api/entry/${id}`);
        if (res) {
          setEntryDetails(res.data.entry);
        }
      } catch (Err) {
        console.log(Err);
      }
    };
    if (id) func();
  }, []);

  const updateStatus = async (status) => {
    if (status == 'approve') {
      const res = await axios.patch(`http://127.0.0.1:3000/api/entry/${id}`, {
        status: 'admin-approved',
      });
      if (res) {
        setEntryDetails({ ...entryDetails, status: 'admin-approved' });
      }
    } else {
      const res = await axios.patch(`http://127.0.0.1:3000/api/entry/${id}`, {
        status: 'rejected',
      });
      if (res) {
        setEntryDetails({ ...entryDetails, status: 'rejected' });
      }
    }
  };

  if (!entryDetails) {
    return <div className="p-10 text-white">Loading...</div>;
  }

  return (
    <div className=" flex flex-col h-full">
      <div className="flex justify-center">
        <h1 className=" text-xl md:text-3xl lg:text-4xl m-5 ">
          <strong>{entryDetails.title}</strong>
        </h1>
      </div>
      <div className="flex flex-col  text-xl md:text-2xl lg:text-3xl m-5 flex-grow  ">
        <div className="m-5">
          <strong>Section : </strong>
          {entryDetails.section?.name}
        </div>
        <div className="m-5">
          <strong>Type : </strong>
          {entryDetails.type?.name}
        </div>
        <div className="m-5">
          <strong>Year : </strong>
          {entryDetails.year}
        </div>
        <div className="m-5">
          <strong>Description : </strong>
          {entryDetails.description}
        </div>
        <div className="m-5">
          <strong>Images : </strong>
          {entryDetails.images.map((img, ind) => {
            const parts = img.split('/upload/');
            const newImg = parts[0] + '/upload/w_400/' + parts[1];
            return <img key={ind} src={newImg} alt="just a image" />;
          })}
        </div>
        <div className="m-5">
          <strong>Uploaded by : </strong>
          {entryDetails.uploadedBy?.name}
        </div>
        <div className="m-5">
          <strong>Status : </strong>
          {entryDetails.status}
        </div>
        <div className="flex justify-evenly">
          <button onClick={() => updateStatus('approve')}>Approve</button>
          <button onClick={() => updateStatus('reject')}>Reject</button>
        </div>
      </div>
    </div>
  );
};

export default EntryDetails;
