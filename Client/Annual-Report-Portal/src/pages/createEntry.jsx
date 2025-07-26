import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import FormInputComponent from '../components/FormInputComp.jsx';

const CreateEntry = () => {
  const titleRef = useRef();
  const descRef = useRef();
  const yearRef = useRef();
  const fileRef = useRef();
  const [section, setSection] = useState([]);
  const [types, setTypes] = useState([]);
  const [currSection, setCurrSection] = useState();
  const [currType, setCurrType] = useState();
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    const getUserDetails = async () => {
      const user = await axios.get('http://localhost:3000/api/me', {
        withCredentials: true,
      });
      setUserDetails(user.data);
    };
    getUserDetails();
  }, []);

  useEffect(() => {
    const func = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:3000/api/section');
        if (res) {
          setSection(res.data.sections);
          setCurrSection(res.data.sections[0]._id);
        }
      } catch (Err) {
        console.log(Err);
      }
    };
    func();
  }, []);

  useEffect(() => {
    const func = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:3000/api/section/${currSection}/types`
        );
        setTypes(res.data.types);
      } catch (err) {
        console.log(err);
      }
    };
    if (currSection) func();
  }, [currSection]);

  const handleChangeSec = async (e) => {
    e.preventDefault();
    setCurrSection(e.target.value);
  };
  const handleChangeType = async (e) => {
    e.preventDefault();
    setCurrType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userDetails.user.institute);
    const formData = new FormData();
    formData.append('title', titleRef.current.value);
    formData.append('description', descRef.current.value);
    formData.append('section', currSection);
    formData.append('type', currType);
    formData.append('year', yearRef.current.value);
    formData.append('file', fileRef.current.files[0]);
    formData.append('institute', userDetails.user.institute);
    console.log(fileRef.current.files[0], 'jj');

    try {
      const res = await axios.post('/api/entry', formData, {
        withCredentials: true,
      });
      console.log('success: ', res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" flex flex-col">
      <div className="flex justify-center">
        <h1 className=" text-xl md:text-3xl lg:text-4xl mt-5 mb-5 ">
          Create Entry
        </h1>
      </div>
      <div className="m-5">
        <form className="flex flex-col" encType="multipart/form-data">
          <FormInputComponent name="Title" type="text" ref={titleRef} />
          <div className="flex  flex-col mb-10 text-xl md:flex-row">
            <h1 className="mr-2 md:text-2xl">Description :</h1>
            <textarea
              className="flex-grow border-1 "
              name="Description"
              id="description"
              ref={descRef}
            ></textarea>
          </div>
          <div className="flex  flex-col mb-10 text-xl md:flex-row">
            <h1 className="mr-2 md:text-2xl">Section :</h1>
            <select
              className="flex-grow border-1 "
              name="section"
              id="section"
              onChange={handleChangeSec}
            >
              {section.map((sec) => {
                return (
                  <option key={sec._id} value={sec._id} className="text-black">
                    {sec.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex  flex-col mb-10 text-xl md:flex-row">
            <h1 className="mr-2 md:text-2xl">Type :</h1>
            <select
              className="flex-grow border-1 "
              name="type"
              id="type"
              onChange={handleChangeType}
            >
              {types.map((type) => {
                return (
                  <option
                    key={type._id}
                    value={type._id}
                    className="text-black"
                  >
                    {type.name}
                  </option>
                );
              })}
            </select>
          </div>
          <FormInputComponent name="Year" type="text" ref={yearRef} />
          <FormInputComponent
            name="File"
            type="file"
            ref={fileRef}
            style="bg-[#B13BFF] text-white w-30"
          />
          <div className="flex justify-center">
            <button
              className="bg-[#FFCC00] w-30 text-2xl text-[#000000]"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEntry;
