import { useEffect, useState } from 'react';
import axios from 'axios';

import Entry from './../components/Entry.jsx';
import { useParams } from 'react-router';
import { Outlet } from 'react-router';
import { useLocation } from 'react-router';
import FormInputComponent from '../components/FormInputComp.jsx';

export default function Submissions() {
  const location = useLocation();
  const { userDetails } = location.state || {};
  const [entries, setEntries] = useState([]);
  const [status, setStatus] = useState(undefined);
  const [year, setYear] = useState(undefined);
  const [section, setSection] = useState([]);
  const [types, setTypes] = useState([]);
  const [currSection, setCurrSection] = useState(undefined);
  const [currType, setCurrType] = useState(undefined);

  const statuses = [undefined, 'admin-approved', 'pending', 'rejected'];
  const years = ['2024'];

  useEffect(() => {
    const func = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:3000/api/section');
        if (res) {
          const sections = res.data.sections;
          const newsections = [{ _id: undefined, name: 'All' }, ...sections];
          setSection(newsections);
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
        const type = res.data.types;
        const newtypes = [{ _id: undefined, name: 'All' }, ...type];
        setTypes(newtypes);
      } catch (err) {
        console.log(err);
      }
    };
    console.log(currSection);
    if (currSection !== 'All' && currSection) func();
    else setTypes([]);
  }, [currSection]);

  const handleChangeSec = async (e) => {
    e.preventDefault();
    setCurrSection(e.target.value);
  };
  const handleChangeType = async (e) => {
    e.preventDefault();
    setCurrType(e.target.value);
  };
  const handleChangeStatus = async (e) => {
    e.preventDefault();
    setStatus(e.target.value);
  };

  const handleChangeYear = async (e) => {
    e.preventDefault();
    setYear(e.target.value);
  };

  const { id } = useParams();
  useEffect(() => {
    const params = {
      institute: userDetails.user.institute,
      status: status || undefined,
      section: currSection === 'All' ? undefined : currSection,
      type: currSection === 'All' || currType === 'All' ? undefined : currType,
      year: year,
      sort: '-createdAt',
    };
    const getEntries = async () => {
      if (userDetails.user.institute) {
        const res = await axios.get(`http://127.0.0.1:3000/api/entry`, {
          params,
        });
        console.log(res.data.entries);
        setEntries(res.data.entries);
      }
    };
    getEntries();
  }, [currSection, currType, status, year]);

  if (!entries) {
    return <div>Loading</div>;
  }

  return id ? (
    <Outlet />
  ) : (
    <div className="flex flex-col ">
      <div className="flex justify-center ">
        <h1 className=" text-xl md:text-3xl lg:text-4xl mt-5 mb-5 ">
          All Entries
        </h1>
      </div>
      <div>
        <div className="flex  flex-col m-5 md:flex-row ">
          <h1 className="mr-2 md:text-2xl">Section :</h1>
          <select
            className=" border-1 w-2/3 lg:w-1/2 text-xl "
            name="section"
            id="section"
            onChange={handleChangeSec}
          >
            {section.map((sec, ind) => {
              return (
                <option key={ind} value={sec._id} className="text-black">
                  {sec.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex  flex-col m-5 md:flex-row">
          <h1 className="mr-2 md:text-2xl">Type :</h1>
          <select
            className="border-1 w-2/3 lg:w-1/2 text-xl"
            name="type"
            id="type"
            onChange={handleChangeType}
          >
            {types.map((type, ind) => {
              return (
                <option key={ind} value={type._id} className="text-black">
                  {type.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex  flex-col m-5 md:flex-row">
          <h1 className="mr-2 md:text-2xl">Status :</h1>
          <select
            className="border-1 w-2/3 lg:w-1/2 text-xl"
            name="status"
            id="status"
            onChange={handleChangeStatus}
          >
            {statuses.map((status) => {
              return (
                <option key={status} value={status} className="text-black">
                  {status}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex  flex-col m-5 md:flex-row">
          <h1 className="mr-2 md:text-2xl">Year :</h1>
          <select
            className="border-1 w-2/3 lg:w-1/2 text-xl"
            name="year"
            id="year"
            onChange={handleChangeYear}
          >
            {years.map((Year) => {
              return (
                <option key={Year} value={Year} className="text-black">
                  {Year}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div>
        {entries.map((entry) => {
          return <Entry key={entry._id} entryDetails={entry} />;
        })}
      </div>
    </div>
  );
}
