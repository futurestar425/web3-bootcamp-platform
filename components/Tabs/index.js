import React, { useState } from 'react'
const Tabs = (course) => {
  const getCourse = course?.course;
  if(!getCourse?.sections) return null;

  // list all the section as tabs
  const [activeTab, setActiveTab] = useState(
    Object.keys(getCourse?.sections)[0]
  );

  const toggle = (tab) => {
    if(activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        {Object.keys(getCourse?.sections).sort().map((section) => {
          return (
            <a href={`#${section}`} key={section} onClick={() => toggle(section)} className={`item px-4 font-bold py-2 hover:no-underline rounded shadow-lg text-black-100 dark:text-white-100 ${activeTab === section ? 'bg-gray-200   dark:bg-black-100 dark:text-primary-100' : 'bg-white-100 dark:bg-black-200'}`}
            >
              <div className={`item flex-grow px-4 font-bold py-2 rounded shadow-lg ${activeTab === section ? 'bg-gray-200   dark:bg-black-100 dark:text-primary-100' : 'bg-white-100 dark:bg-black-200'
                }`}>
                <p className="m-0 p-0">
                  {section?.replace('Section_', 'Sessão ')}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};
export default Tabs;
